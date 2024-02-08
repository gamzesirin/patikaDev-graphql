const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const { events, users, participants, locations } = require('./data.js')

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
	}

	type Event {
		id: ID!
		title: String!
		desc: String!
		date: String!
		from: String!
		to: String!
		location_id: Int
		user_id: ID!
		user: User!
		participants: [Participant!]!
		location: Location!
	}

	type Location {
		id: ID!
		name: String!
		desc: String!
		lat: Float!
		lng: Float!
	}

	type Participant {
		id: ID!
		user_id: ID!
		event_id: ID!
	}

	type Query {
		users: [User!]!
		user(id: ID!): User!

		events: [Event!]!
		event(id: ID!): Event

		locations: [Location!]!
		location(id: ID!): Location!

		participants: [Participant!]!
		participant(id: ID!): Participant
	}
	type Mutation {
		addUser(username: String!, email: String!): User!
		createUser(username: String!, email: String!): User!
		updateUser(id: ID!, username: String!, email: String!): User!
		deleteUser(id: ID!): User!
		deleteAllUsers: [User!]!
		addEvent(id: ID!, title: String!, desc: String!, date: String!, from: String!, to: String!): Event!
		createEvent(id: ID!, title: String!, desc: String!, date: String!, from: String!, to: String!): Event!
		updateEvent(id: ID!, title: String!, desc: String!, date: String!, from: String!, to: String!): Event!
		deleteEvent(id: ID!): Event!
		deleteAllEvents: [Event!]!
		addLocation(id: ID!, name: String!, desc: String!, lat: Float!, lng: Float!): Location!
		createLocation(id: ID!, name: String!, desc: String!, lat: Float!, lng: Float!): Location!
		updateLocation(id: ID!, name: String!, desc: String!, lat: Float!, lng: Float!): Location!
		deleteLocation(id: ID!): Location!
		deleteAllLocations: [Location!]!
		addParticipant(id: ID!, user_id: ID!, event_id: ID!): Participant!
		createParticipant(id: ID!, user_id: ID!, event_id: ID!): Participant!
		updateParticipant(id: ID!, user_id: ID!, event_id: ID!): Participant!
		deleteParticipant(id: ID!): Participant!
		deleteAllParticipants: [Participant!]!
	}
`

const resolvers = {
	Query: {
		users: () => users,
		user: (parent, args) => users.find((user) => user.id === parseInt(args.id)),

		events: () => events,
		event: (parent, args) => events.find((event) => event.id === parseInt(args.id)),

		locations: () => locations,
		location: (parent, args) => locations.find((location) => location.id === parseInt(args.id)),

		participants: () => participants,
		participant: (parent, args) => participants.find((participant) => participant.id === parseInt(args.id))
	},

	Event: {
		user: (parent) => users.find((user) => user.id === parent.user_id),
		participants: (parent) => participants.filter((participant) => participant.event_id === parseInt(parent.id)),
		location: (parent) => locations.find((location) => location.id === parseInt(parent.location_id))
	},
	Mutation: {
		addUser: (parent, args) => {
			const user = {
				id: args.id,
				username: args.username,
				email: args.email
			}
			users.push(user)
			return user
		},
		createUser: (parent, args) => {
			const user = {
				id: args.id,
				username: args.username,
				email: args.email
			}
			users.push(user)
			return user
		},
		updateUser: (parent, args) => {
			const user = users.find((user) => user.id === parseInt(args.id))
			user.username = args.username
			user.email = args.email
			return user
		},
		deleteUser: (parent, args) => {
			const user = users.find((user) => user.id === parseInt(args.id))
			users.splice(users.indexOf(user), 1)
			return user
		},
		deleteAllUsers: () => {
			users.splice(0, users.length)
			return users
		},

		addEvent: (parent, args) => {
			const event = {
				id: args.id,
				title: args.title,
				desc: args.desc,
				date: args.date,
				from: args.from,
				to: args.to,
				user_id: args.user_id,
				location_id: args.location_id
			}
			events.push(event)
			return event
		},
		createEvent: (parent, args) => {
			const event = {
				id: args.id,
				title: args.title,
				desc: args.desc,
				date: args.date,
				from: args.from,
				to: args.to,
				user_id: args.user_id,
				location_id: args.location_id
			}
			events.push(event)
			return event
		},
		updateEvent: (parent, args) => {
			const event = events.find((event) => event.id === parseInt(args.id))
			event.title = args.title
			event.desc = args.desc
			event.date = args.date
			event.from = args.from
			event.to = args.to
			event.user_id = args.user_id
			event.location_id = args.location_id
			return event
		},
		deleteEvent: (parent, args) => {
			const event = events.find((event) => event.id === parseInt(args.id))
			events.splice(events.indexOf(event), 1)
			return event
		},
		deleteAllEvents: () => {
			events.splice(0, events.length)
			return events
		},

		addLocation: (parent, args) => {
			const location = {
				id: args.id,
				name: args.name,
				desc: args.desc,
				lat: args.lat,
				lng: args.lng
			}
			locations.push(location)
			return location
		},
		createLocation: (parent, args) => {
			const location = {
				id: args.id,
				name: args.name,
				desc: args.desc,
				lat: args.lat,
				lng: args.lng
			}
			locations.push(location)
			return location
		},
		updateLocation: (parent, args) => {
			const location = locations.find((location) => location.id === parseInt(args.id))
			location.name = args.name
			location.desc = args.desc
			location.lat = args.lat
			location.lng = args.lng
			return location
		},
		deleteLocation: (parent, args) => {
			const location = locations.find((location) => location.id === parseInt(args.id))
			locations.splice(locations.indexOf(location), 1)
			return location
		},
		deleteAllLocations: () => {
			locations.splice(0, locations.length)
			return locations
		},
		addParticipant: (parent, args) => {
			const participant = {
				id: args.id,
				user_id: args.user_id,
				event_id: args.event_id
			}
			participants.push(participant)
			return participant
		},
		createParticipant: (parent, args) => {
			const participant = {
				id: args.id,
				user_id: args.user_id,
				event_id: args.event_id
			}
			participants.push(participant)
			return participant
		},
		updateParticipant: (parent, args) => {
			const participant = participants.find((participant) => participant.id === parseInt(args.id))
			participant.user_id = args.user_id
			participant.event_id = args.event_id
			return participant
		},
		deleteParticipant: (parent, args) => {
			const participant = participants.find((participant) => participant.id === parseInt(args.id))
			participants.splice(participants.indexOf(participant), 1)
			return participant
		},
		deleteAllParticipants: () => {
			participants.splice(0, participants.length)
			return participants
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
})

server.listen().then(({ url }) => {
	console.log(`Apollo server is up`)
})
