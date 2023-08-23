const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');

// Load todos from localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || [];


const saveTodosToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const generateTemplate = todo => {
  const html = `
    <li>
      <span>${todo}</span>
      <span class="icons">
        <i class="far fa-save save hide"></i>
        <i class="far fa-edit edit"></i>
        <i class="far fa-trash-alt delete"></i>
        <input type="checkbox" class="complete">
      </span>
    </li>
  `;
  

  list.innerHTML += html;
};

const filterTodos = term => {
  Array.from(list.children).forEach(todo => {
    const todoText = todo.querySelector('span').textContent.toLowerCase();
    if (!todoText.includes(term)) {
      todo.classList.add('filtered');
    } else {
      todo.classList.remove('filtered');
    }
  });
};

// Displaying todos from localStorage
todos.forEach(todo => {
  generateTemplate(todo);
});

// add todos event
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    todos.push(todo);
    saveTodosToLocalStorage();
    addForm.reset();
  }
});


list.addEventListener('click', e => {
  let target = e.target
  let listItem = target.parentElement.parentElement
  let targetClassList = target.classList
  let iconSpan = target.parentElement


  if (targetClassList.contains('delete')) {
    const todoText = listItem.querySelector('span').textContent;
    const todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    saveTodosToLocalStorage();

    listItem.remove();
  } else if (targetClassList.contains("edit")) {
    listItem.children[0].setAttribute("contenteditable", true)
    targetClassList.add("hide")
    iconSpan.children[0].classList.remove("hide")
  } else if (targetClassList.contains("save")) {
    listItem.children[0].setAttribute("contenteditable", false)
    const todo = listItem.children[0].textContent;
    const todoIndex = todos.indexOf(todo);

    if (todo.length) {
      todos.splice(todoIndex, 1, todo);
      listItem.remove()
      saveTodosToLocalStorage();
      generateTemplate(todo);
      saveTodosToLocalStorage();
    }
    targetClassList.add("hide")
    iconSpan.children[1].classList.remove("hide")
  } else if (targetClassList.contains("complete")) {
    if (target.checked) {
      listItem.children[0].classList.add("completed")
      target.setAttribute("checked", true)
    } else {
      target.setAttribute("checked", false)
      listItem.children[0].classList.remove("completed")

    }
  }
});

// filter todos event
search.addEventListener('keyup', () => {
  const searchTerm = search.value.trim().toLowerCase();
  filterTodos(searchTerm);
});

let data = {
  name: "peter",
  greet: {
    name: "John",
    sayHi: function(){
      console.log(data.name)
    }
  }
}


data.greet.sayHi()
// let result = data.greet.sayHi()