//Shao Jiale Solon 223190715


//cart page JS
if (document.body.classList.contains('cart-link')) {
    // Check login status on page entry
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

function checkout() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  document.getElementById('totalPrice').innerHTML = `Total Amount: $${total}`;
  console.log('Total Amount:$' + total);
}

function clearCart() {
  localStorage.removeItem('cartItems');
  location.reload();
}

// Functions to Remove Courses
function removeItemFromCart(item) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(i => i.name!== item.name);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  location.reload();
}

function logout() {
  localStorage.removeItem('loggedInUsername');
  window.location.href = 'courses.html';
}
}


//courses page JS
function addToCart(itemName, price, quantity) {
  // Store product information to local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ name: itemName, price: price, quantity: quantity });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


//projects page JS
if (document.body.classList.contains('pro-page')) {
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
}

//register page JS
if (document.body.classList.contains('register-links')) {
  document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
  
    if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone)) {
      alert("Please enter the number in the format: 123-456-7890");
      return;
    }
  
    if (!email.includes('@')) {
      alert("Must enter an email address that includes an @!");
      return;
    }
  
    alert("RegistrationSuccessful!");
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course").selectedIndex = 0;
    document.getElementById("comments").value = "";
    for (let i = 1; i <= 8; i++) {
      document.getElementById(`resourcePack${i}`).checked = false;
    }
  });
}

//sign in page JS
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


//sign up page JS
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