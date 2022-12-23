'use strict';

const ELEMENT = {
		FORM_HIGH: document.querySelector('.todo__addtask'),
		INPUT_HIGH: document.querySelector('.todo__add'),
		BUTTON_HIGH: document.querySelector('.todo__plus'),
		LIST_HIGH: document.querySelector('.todo__list'),
};

let listHigh = new Set();
let arrayListHigh = JSON.parse(localStorage.getItem('listHigh'));

ELEMENT.FORM_HIGH.onsubmit = function (event) {
		event.preventDefault();
};

ELEMENT.BUTTON_HIGH.addEventListener('click', addHighTask);

function addHighTask() {
		listHigh.add(ELEMENT.INPUT_HIGH.value);
		arrayListHigh = [...listHigh];
		localStorage.setItem('listHigh', JSON.stringify(arrayListHigh));
		render();
}

function render() {
		if (arrayListHigh === null) return;
		listHigh = new Set([...arrayListHigh]);

		ELEMENT.LIST_HIGH.innerHTML = '';
		ELEMENT.INPUT_HIGH.value = '';


		for (let task of arrayListHigh) {

				const ELEMENT = {
						TODO_LIST: document.querySelector('.todo__list'),
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

				ELEMENT.LABEL.textContent = task;
				ELEMENT.PLUS.addEventListener('click', () => {
						deleteTask(task);
				});

				ELEMENT.TODO_LIST.prepend(ELEMENT.TODO_TASK);
				ELEMENT.TODO_TASK.prepend(ELEMENT.INPUT);
				ELEMENT.TODO_TASK.append(ELEMENT.LABEL);
				ELEMENT.TODO_TASK.append(ELEMENT.PLUS);
		}
}

function deleteTask(task) {
		listHigh.delete(task);
		arrayListHigh = [...listHigh];
		localStorage.setItem('listHigh', JSON.stringify(arrayListHigh));
		render();
}

render();