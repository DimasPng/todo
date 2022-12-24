'use strict';

window.addEventListener('DOMContentLoaded', render);

const ELEMENT = {
		FORM: document.querySelector('.todo__addtask'),
		FORM_HIGH: document.querySelector('#form_high'),
		FORM_LOW: document.querySelector('#form_low'),
		INPUT_HIGH: document.querySelector('#input_high'),
		INPUT_LOW: document.querySelector('#input_low'),
		LIST_HIGH: document.querySelector('#list__high'),
		LIST_LOW: document.querySelector('#list__low'),
		BUTTON_HIGH: document.querySelector('#button__high'),
		BUTTON_LOW: document.querySelector('#button_low'),
};

const PRIORITY = {
		HIGH: 'high',
		LOW: 'low',
};

const STATUS = {
		TO_DO: 'to_do',
		DONE: 'done',
};

let localStorageData = JSON.parse(localStorage.getItem('listOfCities'));
let listOfCities = localStorageData ? localStorageData : [];

ELEMENT.FORM.onsubmit = function (event) {
		event.preventDefault();
};

ELEMENT.FORM_HIGH.addEventListener('submit', (event) => {
		addHighTask(PRIORITY.HIGH, event);
		clearToDoList();
		render();
});
ELEMENT.FORM_LOW.addEventListener('submit', (event) => {
		addHighTask(PRIORITY.LOW, event);
		clearToDoList();
		render();
});

function addHighTask(priority, event) {
		console.log(event.target.value); //Как получить значение input.value?
		if (ELEMENT.INPUT_HIGH.value === '' && ELEMENT.INPUT_LOW.value === '') {
				alert('Добавьте задачу. Поле не должно быть пустым');
				return;
		} else {
				listOfCities.push({
						name: ELEMENT.INPUT_HIGH.value ? ELEMENT.INPUT_HIGH.value : ELEMENT.INPUT_LOW.value,
						status: STATUS.TO_DO,
						priority,
				});
				localStorage.setItem('listOfCities', JSON.stringify(listOfCities));
		}
}

function clearToDoList() {
		ELEMENT.LIST_HIGH.innerHTML = '';
		ELEMENT.LIST_LOW.innerHTML = '';
		ELEMENT.INPUT_HIGH.value = '';
		ELEMENT.INPUT_LOW.value = '';
}

function render() {

		if (listOfCities.length === 0) return;

		for (let task of listOfCities) {
				const ELEMENT = {
						LIST_HIGH: document.querySelector('#list__high'),
						LIST_LOW: document.querySelector('#list__low'),
						TODO_TASK: document.createElement('div'),
						INPUT: document.createElement('input'),
						LABEL: document.createElement('label'),
						PLUS: document.createElement('div'),
				};

				ELEMENT.TODO_TASK.setAttribute('class', 'todo__task');
				ELEMENT.INPUT.setAttribute('class', 'todo__checkbox');
				ELEMENT.INPUT.setAttribute('type', 'checkbox');
				ELEMENT.LABEL.setAttribute('class', 'todo__label');
				ELEMENT.PLUS.setAttribute('class', 'todo__plus todo__plus_rotate -delet" id="#todo_plus');

				ELEMENT.LABEL.textContent = task.name;

				ELEMENT.PLUS.addEventListener('click', () => {
						deleteTask(task);
						clearToDoList();
						render();
				});

				if (task.priority === PRIORITY.HIGH) {
						ELEMENT.LIST_HIGH.prepend(ELEMENT.TODO_TASK);
				} else {
						ELEMENT.LIST_LOW.prepend(ELEMENT.TODO_TASK);
				}
				ELEMENT.TODO_TASK.prepend(ELEMENT.INPUT, ELEMENT.LABEL, ELEMENT.PLUS);
		}
}

function deleteTask(task) {
		const index = listOfCities.findIndex(item => item.name === task.name);
		listOfCities.splice(index, 1);
		localStorage.setItem('listOfCities', JSON.stringify(listOfCities));
}