const users = [
	{ id: '1', fullname: 'Gamze şirin' },
	{ id: '2', fullname: 'Adam eder' }
]

const posts = [
	{ id: '1', title: 'Gamzenin gönderisi', user_id: '1' },
	{ id: '2', title: 'Gamzenin gönderisi', user_id: '1' },
	{ id: '3', title: 'Adamın gönderisi', user_id: '2' }
]

const comments = [
	{ id: '1', text: 'lorem ıpsum , bu yorum gamzenin yorumudur', post_id: '1', user_id: '1' },
	{ id: '2', text: 'bacon ıpsum , bu yorum adamın yorumudur', post_id: '1', user_id: '2' },
	{ id: '3', text: 'tatto ipsum , bu yorum adamın yorumudur', post_id: '2', user_id: '2' }
]

module.exports = {
	users,
	posts,
	comments
}
