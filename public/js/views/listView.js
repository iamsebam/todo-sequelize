import { todosPanel } from './base'
const renderListViewHTML = () => {
  `<div class="todo-list">
    <ul></ul>
  </div>`
}
export const renderListView = () => {
  todosPanel.insertAdjacentHTML('beforeend', renderListViewHTML())
}