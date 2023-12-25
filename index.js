// Retrieve tasks from local storage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  const newTask = taskInput.value.trim();
  if (newTask !== '') {
    tasks.unshift({ task: newTask, completed: false }); // Add new task to the beginning of the array
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';

    renderTasks();
  }
}


// Function to render the tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.task;

    // Add class when task is clicked
    li.onclick = () => {
      li.classList.toggle('completed');
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add completed class if task is already marked as completed
    if (task.completed) {
      li.classList.add('completed');
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

// Function to edit a task
function editTask(index) {
  const newTask = prompt('Enter the new task:');
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index].task = newTask.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Initial rendering of tasks
renderTasks();
