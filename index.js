const defaultItems = [
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

let currentTasks;

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    } else {
        return defaultItems;
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
        const currentTasksFromDOM = getTasksFromDOM();
        saveTasks(currentTasksFromDOM);
    });

    deleteButton.addEventListener('click', function () {
        clone.remove();
        const currentTasksFromDOM = getTasksFromDOM();
        saveTasks(currentTasksFromDOM);
    });

    duplicateButton.addEventListener('click', function () {
        const currentTaskText = textElement.textContent;
        const newTaskElement = createItem(currentTaskText);
        listElement.prepend(newTaskElement);
        const currentTasksFromDOM = getTasksFromDOM();
        saveTasks(currentTasksFromDOM);
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

currentTasks = loadTasks();

currentTasks.forEach(item => {
    const taskElement = createItem(item);
    listElement.append(taskElement);
});

formElement.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = inputElement.value.trim();
    if (taskText !== '') {
        const newTaskElement = createItem(taskText);
        listElement.prepend(newTaskElement);
        currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
        formElement.reset();
    }
});