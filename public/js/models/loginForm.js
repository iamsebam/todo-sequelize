import axios from 'axios'
export default class LoginForm {
  static async send(username, password) {
    try {
      const res = await axios.post('/user/login', {
        username,
        password
      })
    } catch (err) {
      console.log(err)
    }
  }
}