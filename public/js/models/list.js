import Todo from './todo'

export default class List {
  constructor() {
    this.items = []
  }
  addItem(item) {
    this.items.push(item)
  }
  deleteItem(item) {
    console.log(item)
    const index = this.items.indexOf(item)
    console.log(this.items)
    console.log(index)
    this.items.splice(index, 1)
  }
  async loadItems() {
    const todos = await Todo.getAll()
    todos.forEach(item => {
      const todo = new Todo(item.id, item.body, item.isCompleted)
      this.addItem(todo)
    })
  }
}
