// Book constructor 
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // create an element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href = "#" class = "delete">X</a></td>
  `
  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){

  // Create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);

  // timeout after 3s
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);

}

// delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event Listeners for submit
document.getElementById('book-form').addEventListener('submit', function(e){
  
  // get form values
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value;

  // instatiating a book
  const book = new Book (title, author, isbn);

  // instatiate UI

  const ui = new UI();

  // validate
  if (title === '' || author === '' || isbn === ''){
    
    // Error alert 
    ui.showAlert('Please fill in all fields', 'error');

  } else {

    // UI add book to list
    ui.addBookToList(book);
    
    // success show
    ui.showAlert('Book added successfully', 'success')

    // clear fields
    ui.clearFields();

  }

  e.preventDefault();

})

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new UI();
  ui.deleteBook(e.target);

  // show message
  ui.showAlert('Book deleted', 'success');

  e.preventDefault();

})