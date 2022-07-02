

// make selection of things we need
// this selection is for our form
const form = document.querySelector("#new-todo-form");
// this selection is for our input
const todoInput = document.querySelector("#todo-input");
// this selection is for the list that we appnd our note into it
const list = document.querySelector("#list");
// this is the template tha we created that is not going to show on the html page
const template = document.querySelector("#list-item-template");
// this is key for our local storge prefix we give it the name that we can remmber
const local_storge_prefix = "to_do_list";
//
const todo_storge_key = `${local_storge_prefix}-todo`;
// this were we save our our to do
let todo = loadTodo();
todo.forEach(renderTodo);



// compleat todo
// this is for our chechbox to see if its compleat or not
list.addEventListener("change", (e) => {
  // in we are look to that if the target matches with our dataset or not if not we return
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  //in here we looking for the closest list item
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todos = todo.find((t) => t.id === todoId);
  todos.compleat = e.target.checked;
  savetodo();
});

// delet todo
// this event listner is for our delete btn
list.addEventListener("click", (e) => {
  // in we are look to that if the target matches with our dataset or not if not we return
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todo = todo.filter((todo) => todo.id !== todoId);
  savetodo();
});

// add todo
// in here user add some thing and add it ti the list
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   this is for input value
  const todoName = todoInput.value;
  //   if input value is equal to empty string we return we give alert
  if (todoName === "" || '') {
    alert("add sometthing to the list");
  }
  //   if input value is equal to empty string we return
  if (todoName === "" || '') return;
  //   in here we creat object for our diffrent thing to store inside
  const newtodo = {
    name: todoName,
    compleat: false,
    id: new Date().valueOf().toString(),
  };
  //   we push our objact detail to array that we made before
  todo.push(newtodo);
  renderTodo(newtodo);
  savetodo();
  //   we are reseting the input that we made after every sumbit
  todoInput.value = "";
});
// this function help us add our note to the page
function renderTodo(todo) {
  // we are cloning what we have in our template page
  const templateClone = template.content.cloneNode(true);
  // we are selecting li 
  const listItem = templateClone.querySelector(".list-item");
  // we are adding a unique id to our li
  listItem.dataset.todoId = todo.id;
  // we are selecting the span inside of our li
  const textElement = templateClone.querySelector("[data-list-item-text]");
  // seting li innertext to input value
  textElement.innerText = todo.name;
  // we are selecting checkbox
  const box = templateClone.querySelector("[data-list-item-checkbox]");
  box.checked = todo.compleat;
  // we are adding the list to template clone
  list.appendChild(templateClone);
}

// load todo
// we load thing from local storge to doom
function loadTodo() {
  const todostring = localStorage.getItem(todo_storge_key);
  return JSON.parse(todostring) || [];
}
// save todo
// we save our thing to local storge
function savetodo() {
  // we are converting over array of note to sting
  localStorage.setItem(todo_storge_key, JSON.stringify(todo));
}

// t
// let number = 0;
// const count = document.querySelector("#count");
// const add = document.querySelector("#addbtn");
// add.addEventListener("click", function () {
//   if (todoInput.value == "") return;
//   number++;
//   count.innerText = number + " thing left to do";
// });
// const remove =document.querySelector('#hello')

// remove.addEventListener('click',function(){
//  number--
//  count.innerText = number + " thing left to do";
//  todo
// })