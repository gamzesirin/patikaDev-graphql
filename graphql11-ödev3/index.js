const { ApolloServer, gql } = require('apollo-server')

// Örnek veriler
const continents = [
	{ id: '1', name: 'Asia' },
	{ id: '2', name: 'Europe' },
	{ id: '3', name: 'Africa' },
	{ id: '4', name: 'North America' },
	{ id: '5', name: 'South America' },
	{ id: '6', name: 'Australia' },
	{ id: '7', name: 'Antarctica' }
]

const languages = [
	{ id: '1', name: 'English', native: 'English' },
	{ id: '2', name: 'Spanish', native: 'Español' },
	{ id: '3', name: 'Turkish', native: 'Türkçe' },
	{ id: '4', name: 'French', native: 'Français' },
	{ id: '5', name: 'German', native: 'Deutsch' },
	{ id: '6', name: 'Japanese', native: '日本語' },
	{ id: '7', name: 'Russian', native: 'Русский' },
	{ id: '8', name: 'Chinese', native: '中文' },
	{ id: '9', name: 'Arabic', native: 'العربية' },
	{ id: '10', name: 'Italian', native: 'Italiano' }
]

const countries = [
	{ code: 'TR', name: 'Turkey', emoji: '🇹🇷', continentId: '1', languageIds: ['1'] },
	{ code: 'FR', name: 'France', emoji: '🇫🇷', continentId: '2', languageIds: ['2'] },
	{ code: 'DE', name: 'Germany', emoji: '🇩🇪', continentId: '2', languageIds: ['5'] },
	{ code: 'JP', name: 'Japan', emoji: '🇯🇵', continentId: '1', languageIds: ['6'] },
	{ code: 'RU', name: 'Russia', emoji: '🇷🇺', continentId: '2', languageIds: ['7'] },
	{ code: 'CN', name: 'China', emoji: '🇨🇳', continentId: '1', languageIds: ['8'] },
	{ code: 'SA', name: 'Saudi Arabia', emoji: '🇸🇦', continentId: '3', languageIds: ['9'] },
	{ code: 'IT', name: 'Italy', emoji: '🇮🇹', continentId: '2', languageIds: ['10'] }
]

const typeDefs = gql`
	type Continent {
		id: ID!
		name: String!
	}

	type Language {
		id: ID!
		name: String!
		native: String!
	}

	type Country {
		code: String!
		name: String!
		emoji: String!
		continent: Continent!
		languages: [Language!]!
	}

	type Query {
		continents: [Continent!]!
		continent(id: ID!): Continent
		languages: [Language!]!
		language(id: ID!): Language
		countries: [Country!]!
		country(code: String!): Country
	}
`

const resolvers = {
	Query: {
		continents: () => continents,
		continent: (parent, args) => continents.find((continent) => continent.id === args.id),
		languages: () => languages,
		language: (parent, args) => languages.find((language) => language.id === args.id),
		countries: () => countries,
		country: (parent, args) => countries.find((country) => country.code === args.code)
	},
	Country: {
		continent: (parent) => continents.find((continent) => continent.id === parent.continentId),
		languages: (parent) => languages.filter((language) => parent.languageIds.includes(language.id))
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
