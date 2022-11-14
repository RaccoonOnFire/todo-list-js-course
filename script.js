let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let toolsContainer

let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
  prepareDOMElements()
  prepareDOMEvents()
}

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input")
  errorInfo = document.querySelector(".error-info")
  addBtn = document.querySelector(".btn-add")
  ulList = document.querySelector(".todolist ul")

  popup = document.querySelector(".popup")
  popupInfo = document.querySelector(".popup-info")
  popupInput = document.querySelector(".popup-input")
  popupAddBtn = document.querySelector(".accept")
  popupCloseBtn = document.querySelector(".cancel")
}

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTask)
  ulList.addEventListener("click", checkClick)
  popupCloseBtn.addEventListener("click", closePopup)
  popupAddBtn.addEventListener("click", changeTodoText)
  todoInput.addEventListener("keyup", enterKeyCheck)
}

const addNewTask = () => {
  if (todoInput.value != "") {
    newTodo = document.createElement("li")
    newTodo.textContent = todoInput.value
    ulList.append(newTodo)

    createToolsArea()

    todoInput.value = ""
    errorInfo.textContent = ""
  } else {
    errorInfo.textContent = "Wpisz treść zadania!"
  }
}

const createToolsArea = () => {
  const toolsContainer = document.createElement("div")
  toolsContainer.classList.add("tools")
  newTodo.append(toolsContainer)

  const toolsComplete = document.createElement("button")
  toolsComplete.classList.add("complete")
  toolsComplete.innerHTML = "<i>✔️</i>"

  const toolsEdit = document.createElement("button")
  toolsEdit.classList.add("edit")
  toolsEdit.innerHTML = "<i>EDIT</i>"

  const toolsDelete = document.createElement("button")
  toolsDelete.classList.add("delete")
  toolsDelete.innerHTML = "<i>❌</i>"

  toolsContainer.append(toolsComplete, toolsEdit, toolsDelete)
}

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed")
  } else if (e.target.matches(".edit")) {
    editTodo(e)
  } else if (e.target.matches(".delete")) {
    deleteTodo(e)
  }
}

const editTodo = (e) => {
  todoToEdit = e.target.closest("li")

  popupInput.value = todoToEdit.firstChild.textContent
  popup.style.display = "flex"
}

const closePopup = () => {
  popup.style.display = "none"
  popupInfo.textContent = ""
}

const changeTodoText = () => {
  if (popupInput.value != "") {
    console.log(popupInput.value)
    todoToEdit.firstChild.textContent = popupInput.value
    popupInfo.textContent = ""
    popup.style.display = "none"
  } else {
    popupInfo.textContent = "Podaj nazwę!"
  }
}

const deleteTodo = (e) => {
  e.target.closest("li").remove()

  const allTodos = document.querySelectorAll("li")
  if (allTodos.length == 0) {
    errorInfo.textContent = "Brak zadań na liście."
  }
}

const enterKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTask()
  }
}

document.addEventListener("DOMContentLoaded", main)
