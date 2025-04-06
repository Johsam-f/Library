function Book(id, title, author, pages, status) {

  //FROM ODIN TO REMEMBER
  //Note that, as constructors are just regular functions,
  //they could be called without using new by mistake, 
  //which would cause hard-to-track errors. To prevent 
  // that, you can use the new.target meta-property like this:

  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

   this.id = id;
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.status = status;
  
}

const myLibrary = [
    {
      id: 1243465,
      title: "I hate JS",
      author: "Johsam",
      pages: 1200000,
      status: "read"
    },
    {
      id: 7890123,
      title: "bola moyo",
      author: "unknown", 
      pages: 3500,
      status: "unread"
    }
  ];

function generate_unique_id(){
  const existing_ids = myLibrary.map(book => book.id);
  let new_id;
  
  do {
    // Generate random 7-digit number (1000000 to 9999999)
    new_id = Math.floor(1000000 + Math.random() * 9000000);
  } while (existing_ids.includes(new_id));
  
  return new_id;
}

document.getElementById('add-book').addEventListener('submit', function(event) {
  // Prevent the form from submitting
  event.preventDefault();
  
  addBookToLibrary();
});

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const author = document.getElementById("author");
  const title = document.getElementById("title");
  const pages = document.getElementById("pages");
  const is_status_box_checked = document.getElementById("read-status");

  const read_status = is_status_box_checked.checked ? "read" : "unread";
  const unique_id = generate_unique_id();

  const new_book = new Book(unique_id, title.value, author.value, pages.value, read_status);
  
  myLibrary.push(new_book);
  put_books_on_shelf();
  popup_menu();

  author.value = "";
  title.value = "";
  pages.value = "";

}

function cancel_add_book(){
  popup_menu();

  const author = document.getElementById("author");
  const title = document.getElementById("title");
  const pages = document.getElementById("pages");
  author.value = "";
  title.value = "";
  pages.value = "";
}


  function create_book(book) {
    return `
      <div class="grid-item" id="${book.id}">
        <p><span class="blue">ID:</span> <span class="id">${book.id}</span></p>
        <p><span class="blue">Title:</span> <span class="title">${book.title}</span></p>
        <p><span class="blue">Author:</span> <span class="author">${book.author}</span></p>
        <p><span class="blue">No of Pages:</span> <span class="page-number">${book.pages}</span></p>
        <p><span class="blue">Status:</span> <span class="status">${book.status}</span></p>
        <div class="btn-container flex">
          <button class="btn edit-book-btn" onclick="change_status(${book.id})">Change status</button>
          <button class="btn remove-book-btn" onclick="delete_book(${book.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  function put_books_on_shelf() {
    const container = document.getElementById('books-container');
    
    container.innerHTML = '';
    
    // adding books
    myLibrary.forEach((book) => {
      container.insertAdjacentHTML('beforeend', create_book(book));
    });
  }

  document.addEventListener('DOMContentLoaded', put_books_on_shelf);

  // the button functions

  //add book button
  function popup_menu(){
    let hide_status = document.getElementById("add-book");
    const rotate_btn = document.querySelector(".add-btn");

    if(hide_status.classList == "hidden"){
      hide_status.classList.remove('hidden');
      rotate_btn.style.transform = "rotate(-315deg)";
    }else{
      hide_status.classList.add('hidden');
      rotate_btn.style.transform = "rotate(360deg)";
    }
  }

  //change status button and the delete button

  function change_status(target_bookId){

    const book = myLibrary.find((current_book) => current_book.id === target_bookId);
    
    if(book){
      book.status = book.status.toLowerCase() === "read"? "unread" : "read";
    }

    put_books_on_shelf();
  }

  function delete_book(target_bookId) {

    const bookIndex = myLibrary.findIndex((current_book) => current_book.id === target_bookId);
    
    if (bookIndex !== -1) {

      myLibrary.splice(bookIndex, 1);
      put_books_on_shelf();
    }
  }