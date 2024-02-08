const { ApolloServer, gql } = require("apollo-server");
const { users, events, participants, locations } = require("./Data");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Event {
    id: ID!
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
    user: User!
    location: Location!
    participant: [Participant!]!
  }
  type Participant {
    id: ID
    user_id: ID
    event_id: ID
  }
  type Location {
    id: ID
    name: String
    desc: String
    lat: Float
    lng: Float
  }
  type Query {
    users: [User]!
    user(id: ID!): User!
    events: [Event]!
    event(id: ID!): Event!
    participants: [Participant]!
    participant(id: ID!): Participant!
    locations: [Location]!
    location(id: ID!): Location!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
    events: () => events,
    event: (parent, args) => events.find((event) => event.id === args.id),
    participants: () => participants,
    participant: (parents, args) =>
      participants.find((participant) => participant.id === args.id),
    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id === args.id),
  },
  Event: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    location: (parent) =>
      locations.find((location) => location.id === parent.location_id),
    participant: (parent) =>
      participants.filter((participant) => participant.user_id === parent.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});