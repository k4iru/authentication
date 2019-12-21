const form = document.querySelector('form');
form.addEventListener('submit', handleRegister);

function userNameExists() {
  const el = document.getElementById('taken-name');
  el.classList.remove('hidden');
}

function emailExists() {
  const el = document.getElementById('email-taken');
  el.classList.remove('hidden');
}

function passwordsDontMatch() {
  const el = document.getElementById('passwords-dont-match');
  el.classList.remove('hidden');
}

function resetHidden() {
  const el = document.getElementById('taken-name');
  if (!el.classList.contains('hidden')) {
    el.classList.add('hidden');
  }

  const el2 = document.getElementById('email-taken');
  if (!el2.classList.contains('hidden')) {
    el2.classList.add('hidden');
  }

  const el3 = document.getElementById('passwords-dont-match');
  if (!el3.classList.contains('hidden')) {
    el3.classList.add('hidden');
  }
}

async function handleRegister(event) {
  // stop paging from refreshing
  event.preventDefault();

  resetHidden();
  const obj = form.elements;

  // TODO add validation
  if (obj.password.value !== obj.passwordConfirm.value) {
    passwordsDontMatch();
    return;
  }
  console.log(obj.username.value);
  const response = await fetch('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: obj.username.value,
      password: obj.password.value,
      email: obj.email.value,
      firstName: obj.firstName.value,
      lastName: obj.lastName.value,
    }),
  });

  // redirects if successfully created
  if (response.redirected) {
    window.location.href = response.url;
  }

  if (response.status === 500) {
    const { error } = await response.json();
    console.log(error);
    console.log('server error');

    // code for username taken
    if (error === 1) userNameExists();
    // code for email taken
    else if (error === 2) emailExists();
  }
}
