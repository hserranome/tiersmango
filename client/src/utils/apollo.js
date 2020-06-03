import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL } from './api'

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${API_URL}/graphql`
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache
})

export default apolloClient
