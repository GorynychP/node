const express = require('express');
const {
	addNote,
	getNotes,
	removeNote,
	editNote,
} = require('./notes.controler');
const port = 3000;
const path = require('path');
// const basePath = path.join(__dirname, 'pages');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.delete('/:id', async (req, res) => {
	try {
		await removeNote(req.params.id);
		res.render('index', {
			title: 'Express Appp',
			notes: await getNotes(),
			created: false,
		});
		// res.redirect('/');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title);
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: true,
		});
		// res.redirect('/');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

app.put('/:id', async (req, res) => {
	await editNote(req.body);
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.listen(port, () => {
	console.log(`Server has been started on port:${port}`);
});
