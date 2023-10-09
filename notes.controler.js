const fs = require('fs/promises');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	};
	notes.push(note);
	await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
	const parsedNotes = JSON.parse(notes);
	return Array.isArray(parsedNotes) ? parsedNotes : [];
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function editNote(updatedNote) {
	const notes = await getNotes();
	const indexToUpdate = notes.findIndex((note) => note.id === updatedNote.id);
	console.log('indexToUpdate', indexToUpdate);
	if (indexToUpdate !== -1) {
		notes[indexToUpdate] = { ...notes[indexToUpdate], ...updatedNote };
		await saveNotes(notes);
	}
}

async function removeNote(id) {
	const notes = await getNotes();
	const updateNotes = notes.filter((note) => note.id !== id);
	await saveNotes(updateNotes);
}

async function printNotes() {
	const notes = await getNotes();
	notes.forEach((note) => {
		console.log('id:', note.id, 'title:', note.title);
	});
}

module.exports = {
	addNote,
	printNotes,
	removeNote,
	getNotes,
	editNote,
};
