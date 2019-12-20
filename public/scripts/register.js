const form = document.querySelector('form');
form.addEventListener('submit', handleRegister);

async function handleRegister(event) {
  // stop paging from refreshing
  event.preventDefault();
  const obj = form.elements;

  // TODO add validation
  if (obj.password.value !== obj.passwordConfirm.value) {
    console.log('passwords dont match');
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

  if (response.status === 500) {
    // bad response
    console.log('server error');
  }
}
