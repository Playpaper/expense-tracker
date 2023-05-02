const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  if (!e.target.checkValidty) {
    e.stopPropagation()
    e.preventDefault()
  }
  e.target.classList.add('was-validated')
  console.log('submit')

})
