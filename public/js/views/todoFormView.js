import { todosPanel } from './base'

export const renderTodoForm = username => {
  const todoFormHTML = `<div class="todo-form">
    <form method="post" action="/todos/todo" name="addTodo">
      <input
        class="addTodo-input"
        type="text"
        name="todo"
        placeholder="What would you like to do, ${username}?"
        autocomplete="off"
        spellcheck="false"
        required
      />
      <button class="btn addTodo" type="submit">
        <i class="fas fa-plus"></i>
      </button>
    </form>
  </div>`
  todosPanel.insertAdjacentHTML('beforeend', todoFormHTML)
}
