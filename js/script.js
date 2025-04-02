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

// function Book() {
//   // the constructor...
// }

// function addBookToLibrary() {
//   // take params, create a book then store it in the array
// }


  function create_book(book) {
    return `
      <div class="grid-item" id="${book.id}">
        <p><span class="blue">ID:</span> <span class="id">${book.id}</span></p>
        <p><span class="blue">Title:</span> <span class="title">${book.title}</span></p>
        <p><span class="blue">Author:</span> <span class="author">${book.author}</span></p>
        <p><span class="blue">No of Pages:</span> <span class="page-number">${book.pages}</span></p>
        <p><span class="blue">Status:</span> <span class="status">${book.status}</span></p>
        <div class="btn-container flex">
          <button class="btn edit-book-btn">Edit</button>
          <button class="btn remove-book-btn">
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
    
    // Add event listeners after rendering
    // setupEventListeners();
  }

  document.addEventListener('DOMContentLoaded', put_books_on_shelf);