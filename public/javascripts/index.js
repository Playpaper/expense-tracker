
const expensePanel = document.querySelector('#expense-panel')
const modalBody = document.querySelector('#modal-body')
const deleteCheck = document.querySelector('#delete-check')

// delete check model
expensePanel.addEventListener('click', (e) => {
  console.log(e.target)
  if(e.target.dataset.id){
    const id = e.target.dataset.id
    deleteCheck.action = `/expense/${id}?_method=DELETE`
    modalBody.textContent = e.target.dataset.name
  }
})

const selectCategory = document.querySelector('#select-category')

selectCategory.addEventListener('input', (e) => {
  const category = e.target.value
  window.location.href = `/search?category=${category}`
})
