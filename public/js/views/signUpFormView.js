const body = document.querySelector('body')

export const renderSignUpForm = () => {
  const signUpFormHTML = `<div class="main">
    <form method="post" name="signup" action="/user/signup">
      <input class="login-input" type="text" name="username" placeholder="Username" autocomplete="off" required>
      <input class="login-input" type="password" name="password" placeholder="Password" required>
      <input class="login-input" type="password" name="password2" placeholder="Confirm password" required>
      <button type="submit" class="btn" id="signup" name="signup">Sign Up</button>
    </form>
  </div>`
  body.insertAdjacentElement('beforeend', signUpFormHTML)
}

export const removeSignUpForm = () => {

}