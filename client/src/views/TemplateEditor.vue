<template>
	<layout v-if="!success">
		<!-- Template form -->
		<Form
			layout="horizontal"
			:form="form"
			:label-col="{ span: 5 }"
			:wrapper-col="{ span: 12 }"
			class="form-wrapper"
			@submit="handleSubmit"
		>
			<!-- Name -->
			<FormItem label="Template name">
				<Input
					v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input a name' }] }
					]"
					placeholder="Name of the template"
				/>
			</FormItem>
			<!-- Category -->
			<FormItem label="Category">
				<Select
					v-decorator="[
						'category',
						{ rules: [{ required: true, message: 'Please select a category' }] }
					]"
					placeholder="Select a category"
				>
					<Option
						v-for="category in categories"
						:key="`category-${category.value}-${category.id}`"
						:value="category.id"
					>
						{{ category.name }}
					</Option>
				</Select>
			</FormItem>
			<!-- Description -->
			<FormItem label="Description">
				<TextArea
					v-decorator="['description']"
					:auto-size="{ minRows: 2, maxRows: 6 }"
				/>
			</FormItem>
			<!-- Avatar -->
			<FormItem
				key="cover"
				label="Cover image"
				extra="This is the image that will show in listings."
			>
				<Upload
					v-decorator="[
						'cover',
						{
							valuePropName: 'fileList',
							rules: [
								{
									required: true,
									message: 'A cover image is required.'
								},
								{ validator: validateCoverImageErrors }
							],
							getValueFromEvent: normFile
						}
					]"
					name="avatar"
					list-type="picture-card"
					:custom-request="customCoverUploadRequest"
					:remove="handleCoverRemove"
					:show-upload-list="{ showPreviewIcon: false, showRemoveIcon: true }"
				>
					<!-- Upload button -->
					<div
						v-if="
							!form.getFieldValue('cover') ||
								form.getFieldValue('cover').length < 1
						"
					>
						<Icon type="plus" />
						<div class="ant-upload-text">
							Upload
						</div>
					</div>
				</Upload>
			</FormItem>
			<!-- Tier -->
			<FormItem
				v-for="(tier, index) in defaultTiers"
				:key="`defaultTier-${index}`"
				:label="`Tier ${index + 1}`"
			>
				<Input
					v-decorator="[
						`tier[${index}]`,
						{
							initialValue: tier,
							rules: [{ required: true, message: 'Please input a tier name' }]
						}
					]"
					:placeholder="tier"
				/>
			</FormItem>
			<!-- Extra tier -->
			<FormItem
				v-for="(tierKey, index) in form.getFieldValue('tiersKeys')"
				:key="`extraTier-${tierKey}`"
				:label="`Extra tier: ${index + 1}`"
			>
				<Input
					v-decorator="[
						`extraTiers[${tierKey}]`,
						{
							validateTrigger: ['change', 'blur'],
							rules: [
								{
									required: true,
									whitespace: true,
									message: 'Please input the tier name or delete this field.'
								}
							]
						}
					]"
					placeholder="Tier name"
					style="width: 60%; margin-right: 8px"
				/>
				<Icon
					class="dynamic-delete-button"
					type="minus-circle-o"
					@click="() => removeTier(tierKey)"
				/>
			</FormItem>
			<!-- Add extra tier -->
			<FormItem :wrapper-col="{ span: 12, offset: 5 }">
				<Button type="dashed" style="width: 60%" @click="addTier">
					<Icon type="plus" /> Add tier
				</Button>
			</FormItem>
			<!-- Images -->
			<FormItem
				key="images"
				label="Images"
				extra="PNG/JPG images of up to 2Mb of size each. Will be converted to 100x100 resolution after upload."
			>
				<Upload
					v-decorator="[
						'itemImages',
						{
							valuePropName: 'fileList',
							rules: [
								{ required: true, message: 'Need at least two valid images.' },
								{ validator: validateItemImagesErrors }
							],
							getValueFromEvent: normFile
						}
					]"
					list-type="picture-card"
					:multiple="true"
					:show-upload-list="{ showPreviewIcon: false, showRemoveIcon: true }"
					:custom-request="customItemsUploadRequest"
					:remove="handleItemsRemove"
				>
					<!-- Upload button -->
					<div
						v-if="
							!form.getFieldValue('itemImages') ||
								form.getFieldValue('itemImages').length < 200
						"
					>
						<Icon type="plus" />
						<div class="ant-upload-text">
							Upload
						</div>
					</div>
				</Upload>
			</FormItem>
			<!-- Submit -->
			<FormItem :wrapper-col="{ span: 12, offset: 5 }">
				<Button
					type="primary"
					html-type="submit"
					:loading="submitting"
					:disabled="submitted"
				>
					{{ submitting ? 'Loading...' : submitted ? 'Success :)' : 'Submit' }}
				</Button>
				<Alert
					v-if="showUnknownError"
					message="Error"
					description="There has been an unknown error. Please try again later."
					type="error"
					show-icon
					class="unknown-error"
					closable
					@close="showUnknownError = false"
				/>
			</FormItem>
		</Form>
	</layout>
	<!-- Success message -->
	<Result
		v-else
		status="success"
		title="Successfully created template!"
		:sub-title="`Template ${templateInfo.name || ''} was created`"
	>
		<template #extra>
			<router-link :to="`tierlist/${templateInfo.id}/${templateInfo.name}`">
				<Button key="console" type="primary">
					Go to template
				</Button>
			</router-link>
			<router-link to="/">
				<Button key="buy">
					Go home
				</Button>
			</router-link>
		</template>
	</Result>
</template>

<script>
	/* eslint-disable no-unreachable */
	import {
		Form,
		Input,
		Upload,
		Icon,
		Button,
		Alert,
		Select,
		Result
	} from 'ant-design-vue'
	import FormItem from 'ant-design-vue/lib/form/FormItem'
	import gql from 'graphql-tag'
	import { api } from '@/utils/api'
	import Layout from '@/components/Layout'
	import { getBase64 } from '../utils'

	let id = 0

	export default {
		components: {
			Form,
			FormItem,
			Input,
			Upload,
			Icon,
			Button,
			Alert,
			Select,
			Result,
			TextArea: Input.TextArea,
			Option: Select.Option,
			Layout
		},
		data() {
			return {
				formLayout: 'horizontal',
				defaultTiers: ['S', 'A', 'B', 'C', 'D'],
				categories: [],
				submitting: false,
				submitted: false, // useless??
				success: false,
				showUnknownError: false,
				templateInfo: {
					id: '',
					name: ''
				}
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, { name: 'template-form' })
			this.form.getFieldDecorator('tiersKeys', {
				initialValue: [],
				preserve: true
			})
		},
		methods: {
			// Extra tiers
			addTier() {
				const { form } = this
				const tiersKeys = form.getFieldValue('tiersKeys')

				const nextTiersKeys = tiersKeys.concat((id += 1))
				// can use data-binding to set
				// important! notify form to detect changes
				form.setFieldsValue({
					tiersKeys: nextTiersKeys
				})
			},
			removeTier(tierKey) {
				const { form } = this
				const tiersKeys = form.getFieldValue('tiersKeys')

				// can use data-binding to set
				form.setFieldsValue({
					tiersKeys: tiersKeys.filter(thisKey => thisKey !== tierKey)
				})
			},
			// Images
			normFile(e) {
				if (Array.isArray(e)) return e
				return e && e.fileList
			},
			// Cover image
			validateCoverImageErrors(rule, values, callback) {
				const errors = []
				const imageWithError = values.find(({ status }) => status === 'error')
				if (imageWithError)
					errors.push(
						new Error(
							`There is an error with an image: ${imageWithError.response}`
						)
					)
				callback(errors)
			},
			async customCoverUploadRequest(req) {
				const { form } = this
				const { file } = req

				// Validate size and format
				let errorMessage
				const isJpgOrPng =
					file.type === 'image/jpeg' || file.type === 'image/png'
				if (!isJpgOrPng) {
					errorMessage = 'You can only upload JPG/JPEG or PNG files!'
				}
				const isLargerThan = file.size / 1024 / 1024 < 2 // Mb
				if (!isLargerThan) {
					errorMessage = 'Image must smaller than 2Mb'
				}

				// Add file to fileList
				const url = await getBase64(file)
				form.setFieldsValue({
					cover: [
						{
							uid: file.uid,
							name: file.name,
							url,
							response: errorMessage || undefined,
							status: errorMessage ? 'error' : 'done',
							file
						}
					]
				})
			},
			handleCoverRemove() {
				const { form } = this
				form.setFieldsValue({
					cover: []
				})
			},
			// Item images
			validateItemImagesErrors(rule, values, callback) {
				// const reg = /^[1-9][0-9]*$/;
				const errors = []
				if (values.length < 2) {
					errors.push(new Error('A minimum of two images is required.'))
				}
				const imageWithError = values.find(({ status }) => status === 'error')
				if (imageWithError)
					errors.push(
						new Error(
							`There is an error with an image: ${imageWithError.response}`
						)
					)
				callback(errors)
			},
			async customItemsUploadRequest(req) {
				const { form } = this
				const { file } = req

				// Validate size and format
				let errorMessage
				const isJpgOrPng =
					file.type === 'image/jpeg' || file.type === 'image/png'
				if (!isJpgOrPng) {
					errorMessage = 'You can only upload JPG/JPEG or PNG files'
				}
				const isLargerThan = file.size / 1024 / 1024 < 2 // Mb
				if (!isLargerThan) {
					errorMessage = 'Image must smaller than 2Mb'
				}

				// Add file to fileList
				const url = await getBase64(file)
				const thisFile = {
					uid: file.uid,
					name: file.name,
					url,
					response: errorMessage || undefined,
					status: errorMessage ? 'error' : 'done',
					file
				}
				const actualItemImages = form
					.getFieldValue('itemImages')
					.filter(({ status }) => status !== 'uploading')
				const newItemImages = [...actualItemImages, thisFile]
				form.setFieldsValue({
					itemImages: newItemImages
				})
			},
			handleItemsRemove(file) {
				const { form } = this
				const itemImages = form.getFieldValue('itemImages')

				const index = itemImages.indexOf(file)
				const newItemImages = itemImages.slice()
				newItemImages.splice(index, 1)
				form.setFieldsValue({
					itemImages: newItemImages
				})
			},
			// Submit
			handleSubmit(e) {
				const { form } = this
				e.preventDefault()
				form.validateFields(async (err, values) => {
					this.showUnknownError = false
					this.submitting = true
					// const user = firebase.auth().currentUser
					// if (!user) {
					// this.submitting = false
					// console.error('no hay user loggeado xddd')
					// return
					// }
					if (err) {
						this.submitting = false
						console.error(err)
						return
					}

					try {
						const formData = new FormData()
						// Get and format tiers
						const { tiersKeys, extraTiers } = values
						const initialTiersFormatted = this.defaultTiers.map(
							(value, index) => ({ name: values.tier[index] })
						)
						const extraTiersFormatted = tiersKeys.map(key => ({
							name: extraTiers[key]
						}))
						const tiers = [...initialTiersFormatted, ...extraTiersFormatted]

						// Create initial tierList
						const tierList = {
							// Add user ***************************
							name: values.name,
							description: values.description,
							category: values.category,
							tiers
						}

						// For slug
						// const { objectId } = data
						// const shortObjId = objectId.split('-')[0] // Get first 8 characters

						// Upload images to doc folder and save result to array
						//   const storageRef = firebase.storage().ref()
						const { itemImages } = values
						await Promise.all(
							itemImages.map(({ file }) => {
								// Gotta put uuid to these images
								// Or maybe a folder for each template? That would be better organized and easier to bugfix
								// Need to avoid doing any of this identification in client code
								const blob = new Blob([file], { type: file.type })
								return formData.append(`files.items`, blob, file.name)
							})
						)
						const { cover } = values
						const coverFile = cover[0].file
						const blob = new Blob([coverFile], { type: coverFile.type })
						formData.append(`files.cover`, blob, coverFile.name)

						formData.append('data', JSON.stringify({ ...tierList }))

						const response = await api({
							method: 'post',
							url: '/templates',
							data: formData,
							headers: { 'Content-Type': 'multipart/form-data' }
						})

						this.submitting = false
						this.submitted = true
						this.success = true
						this.templateInfo.id = response.data.id
						this.templateInfo.name = tierList.name
						// Show success message and redirect?
					} catch (error) {
						console.error(error)
						this.showUnknownError = true
						this.submitting = false
					}
				})
			}
		},
		apollo: {
			categories: {
				query: gql`
					query {
						categories {
							id
							name
							value
						}
					}
				`,
				update: data => data.categories
			}
		}
	}
</script>
<style>
	.form-wrapper {
		padding: 20px;
		margin-top: 80px !important;
		max-width: 940px;
	}
	.unknown-error {
		margin-top: 20px !important;
	}
</style>
