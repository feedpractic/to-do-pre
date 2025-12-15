let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    } else {
        return items;
    }
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");
    textElement.textContent = item;

    editButton.addEventListener('click', function () {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function () {
        textElement.setAttribute('contenteditable', 'false');
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    textElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            textElement.blur();
        }
    });

    deleteButton.addEventListener('click', function () {
        clone.remove();
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    duplicateButton.addEventListener('click', function () {
        const currentTaskText = textElement.textContent;
        const newTaskElement = createItem(currentTaskText);
        listElement.prepend(newTaskElement);
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });
    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach(element => {
        const taskText = element.textContent;
        tasks.push(taskText);
    });
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();

items.forEach(item => {
    const taskElement = createItem(item);
    listElement.append(taskElement);
});

formElement.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = inputElement.value.trim();
    if (taskText !== '') {
        const newTaskElement = createItem(taskText);
        listElement.prepend(newTaskElement);
        items = getTasksFromDOM();
        saveTasks(items);
        formElement.reset();
    }
});
