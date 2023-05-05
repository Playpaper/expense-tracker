const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  if (!e.target.checkValidity()) {
    e.stopPropagation()
    e.preventDefault()
  }
  e.target.classList.add('was-validated')
})
