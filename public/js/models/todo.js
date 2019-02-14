import axios from 'axios'
export default class Todo {
  constructor(id, body, isCompleted) {
    this.id = id
    this.body = body
    this.isCompleted = isCompleted
  }
  static async getAll(){
    const res = await axios.get('/todos/all-todos')
    if(res) {
      return JSON.parse(res).todos
    }
  }
  async toggleCompleted(){
    const res = await axios.patch(`/todos/todo/${this.id}`, {
      isCompleted: true
    })
    return res
  }
  async edit(body){
    const res = await axios.patch(`/todos/todo/${this.id}`, {
      body
    })
    return res 
  }
  async delete(){
    const res = await axios.delete(`/todos/todo/${this.id}`)
    return res
  }
}