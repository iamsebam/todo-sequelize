import axios from 'axios'
import * as Todo from './todo'
export default class TodoForm {
  static async create(todo) {
    try {
      const {id, body, isCompleted} = await axios.post('/todos/todo', {
        todo
      }).data
      return new Todo(id, body, isCompleted)
    } catch (err) {
      console.log(err)
    }
  }
}