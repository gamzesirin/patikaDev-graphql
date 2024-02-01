const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const typeDefs = gql`
	type Query {
		user: User!
		post: Post!
	}

	type User {
		id: ID!
		fullName: String!
		posts: [Post!]!
	}

	type Post {
		id: ID!
		title: String!
	}
`
const resolvers = {
	Query: {
		user: () => {
			return {
				id: 1,
				fullName: 'John Doe',
				posts: [
					{
						id: 1,
						title: 'Lorem ipsum dolor sit amet'
					},
					{
						id: 2,
						title: 'Lorem ipsum dolor sit amet 2'
					}
				]
			}
		},
		post: () => {
			return {
				id: 1,
				title: 'post 1'
			}
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] })

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
