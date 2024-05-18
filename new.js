document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearAllButton = document.getElementById('clearAllButton');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText, completed = false) => {
        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        const editInput = document.createElement('input');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        taskSpan.textContent = taskText;
        editInput.value = taskText;
        editInput.classList.add('edit-input');
        editInput.style.display = 'none';

        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        deleteButton.textContent = 'Delete';

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editInput);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        if (completed) {
            taskItem.classList.add('completed');
        }

        taskSpan.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {
                taskSpan.style.display = 'none';
                editInput.style.display = 'inline-block';
                editButton.textContent = 'Save';
            } else {
                taskSpan.textContent = editInput.value;
                taskSpan.style.display = 'inline-block';
                editInput.style.display = 'none';
                editButton.textContent = 'Edit';
                saveTasks();
            }
        });

        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
        saveTasks();
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = '';
        }
    });

    clearAllButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        saveTasks();
    });

    loadTasks();
});
