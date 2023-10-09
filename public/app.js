const inputState = {};

document.addEventListener('click', async (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		await remove(id)
			.then(() => {
				event.target.closest('li').remove();
				window.location.href = '/';
			})
			.catch((error) => {
				console.error('Error deleting note:', error);
			});
	}

	if (event.target.dataset.type === 'save') {
		const id = event.target.dataset.id;
		const newTitle = inputState[id];
		if (newTitle !== null && newTitle !== '') {
			await save(id, newTitle);
		}
		window.location.href = '/';
	}
	// if (event.target.dataset.type === 'edit') {
	// 	const id = event.target.dataset.id;
	// 	const newTitle = prompt('Введите новое название');
	// 	if (newTitle !== null && newTitle !== '') {
	// 		await save(id, newTitle);
	// 	}
	// 	window.location.href = '/';
	// }
});

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' });
}
async function save(id, title) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
			title,
		}),
	});
}

function toggleButtonsEdit(id) {
	const allButtonsEdit = document.querySelectorAll('.buttons-edit');
	allButtonsEdit.forEach(function (buttonEdit) {
		buttonEdit.style.display = 'none';
	});

	const allInputEdit = document.querySelectorAll('.edit-control');
	allInputEdit.forEach(function (inputEdit) {
		inputEdit.style.display = 'none';
	});

	const allButtons = document.querySelectorAll('.buttons');
	allButtons.forEach(function (button) {
		button.style.display = 'block';
	});

	const allTitles = document.querySelectorAll('.title');
	allTitles.forEach(function (button) {
		button.style.display = 'block';
	});

	const buttons = document.getElementById('buttons-' + id);
	buttons.style.display = 'none';

	const buttonsEdit = document.getElementById('buttons-edit-' + id);
	buttonsEdit.style.display = 'block';

	const inputsEdit = document.getElementById('edit-control-' + id);
	inputsEdit.style.display = 'block';

	const title = document.getElementById('title-' + id);
	title.style.display = 'none';
}

function buttonСancel(id) {
	const allTitles = document.querySelectorAll('.title');
	allTitles.forEach(function (button) {
		button.style.display = 'block';
	});
	const buttons = document.getElementById('buttons-' + id);
	buttons.style.display = 'block';
	const buttonsEdit = document.getElementById('buttons-edit-' + id);
	buttonsEdit.style.display = 'none';
	const inputsEdit = document.getElementById('edit-control-' + id);
	inputsEdit.style.display = 'none';
}

function handleInputChange(event, id) {
	const value = event.target.value;
	inputState[id] = value;
}
