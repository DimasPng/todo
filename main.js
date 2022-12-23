'use strict';

const ELEMENT = {
		FORM_HIGH: document.querySelector('.todo__addtask'),
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

let listHigh = new Set();
let arrayListHigh = JSON.parse(localStorage.getItem('listHigh'));

ELEMENT.FORM_HIGH.onsubmit = function (event) {
		event.preventDefault();
};

ELEMENT.BUTTON_HIGH.addEventListener('click', () => {
		addHighTask(PRIORITY.HIGH);
});
ELEMENT.BUTTON_LOW.addEventListener('click', () => {
		addHighTask(PRIORITY.LOW);
});

function addHighTask(priority) {
		if (ELEMENT.INPUT_HIGH.value === '' && ELEMENT.INPUT_LOW.value === '') {
				alert('Добавьте задачу. Поле не должно быть пустым');
				return;
		} else {
				listHigh.add({
						name: ELEMENT.INPUT_HIGH.value ? ELEMENT.INPUT_HIGH.value : ELEMENT.INPUT_LOW.value,
						status: STATUS.TO_DO,
						priority,
				});
				console.log(listHigh);
				arrayListHigh = [...listHigh];
				localStorage.setItem('listHigh', JSON.stringify(arrayListHigh));
				render();
		}
}

function render() {
		if (arrayListHigh === null) return;
		listHigh = new Set([...arrayListHigh]);

		ELEMENT.LIST_HIGH.innerHTML = '';
		ELEMENT.LIST_LOW.innerHTML = '';
		ELEMENT.INPUT_HIGH.value = '';
		ELEMENT.INPUT_LOW.value = '';


		for (let task of arrayListHigh) {
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
		listHigh.delete(task);
		arrayListHigh = [...listHigh];
		localStorage.setItem('listHigh', JSON.stringify(arrayListHigh));
		render();
}

render();