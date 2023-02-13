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
  tasks.forEach((value) => {
    template += createTaskTemplate(value.id, value.text);
  });
  renderTaskTemplate(template);
}

addTaskTemplateInTasks();

const formTask = document.querySelector('.create-task-block');
const fieldOfTask = formTask.querySelector('.create-task-block__input');

const createErrorMessageBlock = (text) => {
  const errorMessageBlock = document.createElement('span');
  errorMessageBlock.className = 'error-message-block';
  errorMessageBlock.textContent = text;

  formTask.append(errorMessageBlock);
};

const checkValueOfFieldOnValidation = (value) => {
  const result = tasks.find((task) => task.text === value);
  if (!value) {
    createErrorMessageBlock('Название задачи не должно быть пустым');
    return false;
  } else if (result) {
    createErrorMessageBlock('Задача с таким названием уже существует');
    return false;
  }

  return true;
};

formTask.addEventListener('submit', (e) => {
  e.preventDefault();

  const errorMessageBlockFromDom = document.querySelector(
    '.error-message-block'
  );
  errorMessageBlockFromDom?.remove();

  const valueInField = fieldOfTask.value.trim();
  if (!checkValueOfFieldOnValidation(valueInField)) {
    return;
  }

  tasks.push({
    id: String(Date.now()),
    completed: false,
    text: valueInField,
  });

  addTaskTemplateInTasks();
});

function createModalOverlay() {
  const modalOverlay = `
  <div class="modal-overlay modal-overlay_hidden">
    <div class="delete-modal">
      <h3 class="delete-modal__question">
        Вы действительно хотите удалить эту задачу?
      </h3>
      <div class="delete-modal__buttons">
        <button class="delete-modal__button delete-modal__cancel-button">
          Отмена
        </button>
        <button class="delete-modal__button delete-modal__confirm-button">
          Удалить
        </button>
      </div>
    </div>
  </div>
  `;
  tasksList.insertAdjacentHTML('afterend', modalOverlay);
}

createModalOverlay();

const modalOverlay = document.querySelector('.modal-overlay');
let dataObj = {};

modalOverlay.addEventListener('click', (e) => {
  const { target } = e;
  const cancelBtn = target.closest('.delete-modal__cancel-button');
  const confirmBtn = target.closest('.delete-modal__confirm-button');
  if (cancelBtn) {
    modalOverlay.classList.add('modal-overlay_hidden');
  }
  if (confirmBtn) {
    modalOverlay.classList.add('modal-overlay_hidden');
    deleteTask(dataObj.task, dataObj.taskId);
  }
});

function deleteTask(task, taskId) {
  const taskIndex = tasks.findIndex((item) => item.id === taskId);
  tasks.splice(taskIndex, 1);
  task.remove();
}

tasksList.addEventListener('click', (e) => {
  const { target } = e;
  const isDeleteBtn = target.closest('.delete-button');
  if (isDeleteBtn) {
    const task = target.closest('.task-item');
    const taskId = task.dataset.taskId;
    dataObj = { task, taskId };
    modalOverlay.classList.remove('modal-overlay_hidden');
  }
});

const changeTheme = (bodyBackground, taskFontColor, buttonBorder) => {
  document.body.style.background = bodyBackground;
  document.querySelectorAll('.task-item').forEach((task) => {
    task.style.color = taskFontColor;
  });
  document.querySelectorAll('button').forEach((btn) => {
    btn.style.border = buttonBorder;
  });
};

let isDarkTheme = false;

document.addEventListener('keydown', (e) => {
  const { code } = e;
  if (code === 'Tab') {
    e.preventDefault();

    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
      changeTheme('#24292E', '#ffffff', '1px solid #ffffff');
    } else {
      changeTheme('initial', 'initial', 'none');
    }
  }
});
