document.querySelectorAll('.redirect').forEach(btn => {
  btn.addEventListener('click', () => {
    redirect(`/${btn.name}`)
  })
})

function redirect(url) {
  window.location.href = url
}