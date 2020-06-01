module.exports = {
	getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = error => reject(error)
		})
	},
	fileNameAndExt(str) {
		const file = str.split('/').pop()
		return [
			file.substr(0, file.lastIndexOf('.')),
			file.substr(file.lastIndexOf('.') + 1, file.length)
		]
	}
}
