const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage if available
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
};

// Add a task to the list
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value = '';
  }
});

// Create a task element
function createTaskElement(taskText, isCompleted) {
  const li = document.createElement('li');
  const textNode = document.createTextNode(taskText);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Delete';
  
  if (isCompleted) {
    li.classList.add('completed');
  }

  removeButton.addEventListener('click', () => {
    li.remove();
    removeTaskFromStorage(taskText);
  });

  li.appendChild(textNode);
  li.appendChild(removeButton);

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTaskStatus(taskText, !isCompleted);
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task status in localStorage
function updateTaskStatus(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => 
    task.text === taskText ? { ...task, completed: isCompleted } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
