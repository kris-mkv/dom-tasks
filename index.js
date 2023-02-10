const tasks = [
  {
    id: '1138465078061',
    completed: false,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    id: '1138465078062',
    completed: false,
    text: 'Выполнить тест после урока',
  },
  {
    id: '1138465078063',
    completed: false,
    text: 'Выполнить ДЗ после урока',
  },
];

const createTaskTemplate = (id, text) => {
  return `
  <div class="task-item" data-task-id=${id}>
    <div class="task-item__main-container">
      <div class="task-item__main-content">
        <form class="checkbox-form">
          <input class="checkbox-form__checkbox" type="checkbox" id="task-${id}" />
          <label for="task-${id}"></label>
        </form>
        <span class="task-item__text">${text}</span>
      </div>
      <button
        class="task-item__delete-button default-button delete-button"
        data-delete-task-id="5"
      >
        Удалить
      </button>
    </div>
  </div>
  `;
};

const tasksList = document.getElementsByClassName('tasks-list')[0];

const renderTaskTemplate = (template) => (tasksList.innerHTML = template);

function addTaskTemplateInTasks() {
  let template = '';
  Object.values(tasks).forEach((value) => {
    template += createTaskTemplate(value.id, value.text);
  });
  renderTaskTemplate(template);
}

addTaskTemplateInTasks();
