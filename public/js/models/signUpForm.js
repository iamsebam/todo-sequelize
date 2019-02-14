import axios from 'axios'
export default class SignUpForm {
  static async send(username, password, password2) {
    try {
      const res = await axios.post('/user/signup', {
        username,
        password,
        password2
      })
    } catch (err) {
      console.log(err)
    }
  }
}