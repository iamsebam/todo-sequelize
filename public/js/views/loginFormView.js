const body = document.querySelector('body') 

const loginPanelHTML = 
  `<div class="main">
    <form method="post" name="login" action="/user/login">
      <input class="login-input" type="text" name="username" placeholder="Username" required>
      <input class="login-input" type="password" name="password" placeholder="Password" required>
      <button type="submit" class="btn login" name="login">Login</button>
    </form>
    <p class="info">Don't have an account?</p>
    <a class="btn signup" href="/user/signup">Sign Up</a>
  </div>`

export const renderLoginFormView = () => {
  body.insertAdjacentHTML('beforeend', loginPanelHTML)
}
