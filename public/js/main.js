document.querySelectorAll('.redirect').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = `/user/${btn.name}`
  })
})