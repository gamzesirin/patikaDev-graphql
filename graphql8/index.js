const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { users, posts, comments } = require('./data')
const typeDefs = gql`
	type User {
		id: ID!
		fullname: String!
		posts: [Post!]!
		comments: [Comment!]!
	}
	type Post {
		id: ID!
		title: String!
		user_id: ID!
		user: User!
		comments: [Comment!]!
	}
	type Comment {
		id: ID!
		text: String!
		post_id: ID!
		user_id: ID!
		user: User!
		post: Post!
	}
	type Query {
		users: [User!]!
		user(id: ID!): User!
		posts: [Post!]!
		post(id: ID!): Post!
		comments: [Comment!]!
		comment(id: ID!): Comment!
	}
	type Mutation {
		createUser(fullname: String!): Boolean!
		createPost(title: String!, user_id: ID!): Post!
		createComment(text: String!, post_id: ID!, user_id: ID!): Comment!
		updateUser(id: ID!, fullname: String!): Boolean!
		updatePost(id: ID!, title: String!): Post!
		updateComment(id: ID!, text: String!): Comment!
		deleteUser(id: ID!): Boolean!
		deletePost(id: ID!): Boolean!
		deleteComment(id: ID!): Boolean!
		deleteAllUsers: Boolean!
		deleteAllPosts: Boolean!
		deleteAllComments: Boolean!
	}
`
const resolvers = {
	Query: {
		users: () => users,
		user: (parent, args) => {
			return users.find((user) => user.id === args.id)
		},
		posts: () => posts,
		post: (parent, args) => {
			return posts.find((post) => post.id === args.id)
		},
		comments: () => comments,
		comment: (parent, args) => {
			return comments.find((comment) => comment.id === args.id)
		}
	},
	User: {
		posts: (parent) => {
			return posts.filter((post) => post.user_id === parent.id)
		},
		comments: (parent) => {
			return comments.filter((comment) => comment.user_id === parent.id)
		}
	},
	Post: {
		user: (parent) => {
			return users.find((user) => user.id === parent.user_id)
		},
		comments: (parent) => {
			return comments.filter((comment) => comment.post_id === parent.id)
		}
	},
	Comment: {
		user: (parent) => {
			return users.find((user) => user.id === parent.user_id)
		},
		post: (parent) => {
			return posts.find((post) => post.id === parent.post_id)
		}
	},
	Mutation: {
		createUser: (parent, args) => {
			const user = {
				id: users.length + 1,
				fullname: args.fullname
			}
			users.push(user)
			return true
		},
		createPost: (parent, args) => {
			const post = {
				id: posts.length + 1,
				title: args.title,
				user_id: args.user_id
			}
			posts.push(post)
			return post
		},
		createComment: (parent, args) => {
			const comment = {
				id: comments.length + 1,
				text: args.text,
				post_id: args.post_id,
				user_id: args.user_id
			}
			comments.push(comment)
			return comment
		},
		updateUser: (parent, args) => {
			const user = users.find((user) => user.id === args.id)
			user.fullname = args.fullname
			return true
		},
		updatePost: (parent, args) => {
			const post = posts.find((post) => post.id === args.id)
			post.title = args.title
			return post
		},
		updateComment: (parent, args) => {
			const comment = comments.find((comment) => comment.id === args.id)
			comment.text = args.text
			return comment
		},
		deleteUser: (parent, args) => {
			const userIndex = users.findIndex((user) => user.id === args.id)
			if (userIndex === -1) {
				return false
			}
			users.splice(userIndex, 1)
			return true
		},
		deletePost: (parent, args) => {
			const postIndex = posts.findIndex((post) => post.id === args.id)
			if (postIndex === -1) {
				return false
			}
			posts.splice(postIndex, 1)
			return true
		},
		deleteComment: (parent, args) => {
			const commentIndex = comments.findIndex((comment) => comment.id === args.id)
			if (commentIndex === -1) {
				return false
			}
			comments.splice(commentIndex, 1)
			return true
		},
		deleteAllUsers: () => {
			users.splice(0, users.length)
			return true
		},
		deleteAllPosts: () => {
			posts.splice(0, posts.length)
			return true
		},
		deleteAllComments: () => {
			comments.splice(0, comments.length)
			return true
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] })

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
