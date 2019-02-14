const todoList = document.querySelector('ul')

const renderTodoHTML = (todo) => {
  return `<li data-todo_id="${todo.id}">${todo.body}<span class="todo-panel"><i class="fas fa-check ${!todo.isCompleted ? 'invisible' : 'success'}"></i><i class="fas fa-edit invisible"></i><i class="fas fa-trash-alt invisible"></i></span></li>`
}

