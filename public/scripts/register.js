const form = document.querySelector('form');
form.addEventListener('submit', handleRegister);

async function handleRegister(event) {
  // stop paging from refreshing
  console.log(form.elements.username.value);
  event.preventDefault();
  console.log('test');
}
