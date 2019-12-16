const form = document.querySelector('form');
form.addEventListener('submit', handleLogin);

async function login() {
  // TODO
  console.log('test');
}

async function logout() {
  // TODO
}

async function register() {
  // TODO
}

async function handleLogin(event) {
  // prevent page refresh
  event.preventDefault();
  console.log(form.elements.password.value);
  console.log(form.elements.username.value);
}

