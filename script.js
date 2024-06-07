// 合并后的 JavaScript 代码

// 处理登录
function login() {
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;

  if (!loginUsername ||!loginPassword) {
    alert('Username and password cannot be empty!');
    return;
  }

  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

  const foundUser = registeredUsers.find(user => user.username === loginUsername && user.password === loginPassword);

  if (foundUser) {
    alert('Sign in Successful');

    // Save login information
    localStorage.setItem('loggedInUsername', loginUsername);
    localStorage.setItem('loggedInPassword', loginPassword);

    window.location.href = 'cart.html';
  } else {
    alert('Account password mismatch!');
  }
}

// 处理注册
function createUser() {
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  if (!newUsername ||!newPassword) {
    alert('Username and password cannot be empty!');
    return;
  }

  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

  registeredUsers.push({ username: newUsername, password: newPassword });

  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  alert('Sign up Successful');

  window.location.href ='sign in.html';
}

// 处理添加到购物车
function addToCart(itemName, price, quantity) {
  // Store product information to local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ name: itemName, price: price, quantity: quantity });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// 处理购物车结算
function checkout() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  document.getElementById('totalPrice').innerHTML = `Total Amount: $${total}`;
  console.log('Total Amount:$' + total);
}

// 处理购物车清空
function clearCart() {
  localStorage.removeItem('cartItems');
  location.reload();
}

// 处理移除购物车商品
function removeItemFromCart(item) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(i => i.name!== item.name);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  location.reload();
}

// 处理页面加载时的登录状态检查
window.onload = function () {
  const loggedInUsername = localStorage.getItem('loggedInUsername');
  if (!loggedInUsername) {
    window.location.href ='sign in.html';
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let cartList = document.getElementById('cartItems');
  cartItems.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

    // Add Remove Button
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeItemFromCart(item);
    });
    li.appendChild(removeButton);
    cartList.appendChild(li);
  });
};

// 处理待办事项的添加和保存
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === '') {
      alert('Please enter a task!');
      return;
  }
  todoInput.value = '';
  addTask(newTask);
});

function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  listItem.appendChild(editButton);

  checkBox.addEventListener('change', function() {
      if (this.checked) {
          taskText.style.textDecoration = 'line-through';
      } else {
          taskText.style.textDecoration = 'none';
      }
  });

  deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);

      // Delete the corresponding task from local storage
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = savedTasks.filter(taskObj => taskObj.text!== taskText.textContent);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  });

  editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');

      if (isEditing) {

          taskText.textContent = this.previousSibling.value;
          listItem.classList.remove('editing');
          editButton.textContent = 'Edit';
      } else {

          const input = document.createElement('input');
          input.type = 'text';
          input.value = taskText.textContent;
          listItem.insertBefore(input, taskText);
          listItem.removeChild(taskText);
          listItem.classList.add('editing');
          editButton.textContent = 'Save';
      }
  });

  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTask(task.text);
  });
});