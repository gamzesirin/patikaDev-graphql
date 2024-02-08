const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { books, authors } = require('./data')
const typeDefs = gql`
	type Book {
		title: String
		id: ID
		author: Author
		score: Float
	}

	type Author {
		name: String
		id: ID
		books: [Book]
	}

	type Query {
		books: [Book] # Return an array of books
		book(id: ID): Book # Return a single book
		authors: [Author] # Return an array of authors
		author: Author # Return a single author
	}
`

const resolvers = {
	Query: {
		books: () => books,
		book: (parent, args) => {
			// Find the book based on the ID
			return books.find((book) => book.id === args.id)
		},
		authors: () => authors
	},
	Book: {
		author: (parent) => {
			// Find the author based on the author's ID
			return authors.find((author) => author.id === parent.author)
		}
	},

	Author: {
		books: (parent) => {
			// Find the books of this author
			return books.filter((book) => book.author === parent.id)
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
