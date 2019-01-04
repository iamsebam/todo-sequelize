document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector('ul')
  let id, data, value

  if (todoList) {
    todoList.addEventListener('click', (e) => {
      if (e.target.matches('li')) { // Todo list item
        let activeListItem = document.querySelector('.li-active')
        let editInput = document.querySelector('.editTodo-input')
        if (!(e.target === activeListItem)) {
          if (activeListItem) {
            toggleListItemView(activeListItem)
          }
        }
        if (!editInput) {
          toggleListItemView(e.target)
        }
      } else if (e.target.matches('.fa-trash-alt')) { // Delete button
        id = e.target.parentElement.parentElement.dataset.todo_id
        const req = new XMLHttpRequest()
        req.open('DELETE', '/todos/delete/' + id, true)
        req.onload = () => {
          if (req.status >= 200 && req.status < 400) {
            window.location.reload()
          } else {
            console.log(err)
          }
        }
        req.onerror = () => {
          console.log(err)
        }
        req.send()
      } else if (e.target.matches('.fa-edit')) { // Edit button
        let li = e.target.parentElement.parentElement
        let input = `<input type="text" class="editTodo-input" name="todo" autocomplete="off" spellcheck="false" autofocus/><span class="todo-panel"><i class="far fa-save"></i><i class="fas fa-times"></i></span>`
        value = li.textContent
        li.textContent = ''
        li.insertAdjacentHTML('afterbegin', input)
        document.querySelector('.editTodo-input').value = value
      } else if (e.target.matches('.fa-check')) { // Check button
        let li = e.target.parentElement.parentElement
        id = li.dataset.todo_id
        e.target.classList.contains('success') ? value = false : value = true
        data = JSON.stringify({ isCompleted: value })
        if (!li.classList.contains('li-active') && e.target.classList.contains('success')) {
          e.target.classList.add('invisible')
        }
        e.target.classList.toggle('success')
        updateTodo(id, data)
      } else if (e.target.matches('.fa-save')) { // Save button
        id = e.target.parentElement.parentElement.dataset.todo_id
        value = document.querySelector('.editTodo-input').value
        if (value === '') {
          value = e.target.parentElement.parentElement.firstChild.value
        }
        data = JSON.stringify({ todo: value })
        updateTodo(id, data)
      } else if (e.target.matches('.fa-times')) { // Cancel button
        let todoContent = e.target.parentElement.parentElement.firstChild.value
        let li = e.target.parentElement.parentElement
        let panel = '<span class="todo-panel"><i class="fas fa-check"></i><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></span>'
        li.removeChild(li.firstChild)
        li.textContent = todoContent
        li.insertAdjacentHTML('beforeend', panel)
      }
    })
  }
  document.addEventListener('click', e => {
    let activeListItem = document.querySelector('.li-active')
    let msgBox = document.querySelectorAll('.msg')
    if (!e.target.matches('.li-active')) {
      if (activeListItem) {
        toggleListItemView(activeListItem)
      }
    }
    if (e.target.matches('.msg')) {
      msgBox[msgBox.length - 1].remove()
    }
  })
  document.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      if(e.target.matches('.editTodo-input')) {
        id = e.target.parentElement.dataset.todo_id
        value = e.target.value
        data = JSON.stringify({todo: value})
        updateTodo(id, data)
      }
    }
  })
})

function toggleListItemView (e) {
  if (!e.firstChild.classList) {
    e.classList.toggle('li-active')
    e.lastChild.childNodes.forEach(el => {
      if (!el.classList.contains('success')) {
        el.classList.toggle('invisible')
      }
    })
  }
}
function updateTodo (id, data) {
  const req = new XMLHttpRequest()
  req.open('PATCH', '/todos/update/' + id, true)
  req.setRequestHeader('Content-type','application/json; charset=utf-8')
  req.onload = () => {
    if(req.status >= 200 && req.status < 400) {
      window.location.reload()
    } else {
      console.log(err)
    }
  }
  req.onerror = () => {
    console.log(err)
  }
  req.send(data)    
}