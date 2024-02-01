const authors = [
	{
		name: 'Kate Chopin',
		id: '1',
		books: ['1']
	}
]

const books = [
	{
		title: 'The Awakening',
		id: '1',
		author: authors[0].id, // Use author's ID here
		score: 4.5
	},
	{
		title: 'Harry Potter',
		id: '2',
		authors: authors[0],
		score: 7.5
	}
]

module.exports = {
	authors,
	books
}
