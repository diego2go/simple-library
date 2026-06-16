const myLibrary = [
];

function Book(title, author, pages, read) {
    // the constructor...
    // safeguard
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        readState = ''
        if (this.read) {
            readState = 'already read'
        }else{
            readState = 'not read yet'
        }
        bookInfo = `${this.title}, by ${this.author}, ${this.pages} pages, ${readState}`
        return bookInfo
    }
    this.id = crypto.randomUUID()
}

function addToLibrary(bookTitle, author, pages, readStatus) {
    // take params, create a book then store it in the array
    book = new Book(bookTitle, author, pages, readStatus);
    myLibrary.push(book);
}

const cardContainer = document.querySelector('.card-container')
function displayBooks() {
    myLibrary.forEach((book) => {
        //add a way to avoid reloading books already on display...
        const bookContainer = document.createElement('div');
        bookContainer.className = 'card';
        
        const bookTitle = document.createElement('h2');
        bookTitle.className = 'bookTitle';
        bookTitle.textContent = book.title;

        const bookDetails = document.createElement('ul');
        bookDetails.className = 'bookDetails';

        const bookAuthor = document.createElement('li');
        bookAuthor.className = 'author';
        bookAuthor.textContent = 'Author: ' + book.author;
       
        const pages = document.createElement('li');
        pages.className = 'pages';
        pages.textContent = 'Pages: ' + book.pages; 
  
        const readStatus = document.createElement('li');
        readStatus.className = 'readStatus';
        readStatus.textContent = 'Read status: ' + book.read;
        
        // set up UUID to book card
        bookContainer.setAttribute('data-id', book.id);
        
        bookDetails.append(bookAuthor, pages, readStatus);
        bookContainer.append(bookTitle,bookDetails);
        cardContainer.append(bookContainer);
    });
}

// set up event listener on submit and get data
const saveBtn = document.querySelector('#save-button')
const form = document.querySelector('.form-inputs')
saveBtn.addEventListener('click', (event) => {
    // prevent submit to server
    event.preventDefault();
    // Check form data is valid before saving
    if (form.checkValidity()) {
        // get form data
        const formData = new FormData(form);
        // get entries
        const obj = Object.fromEntries(formData);
        // add to array
        addToLibrary(obj.title, obj.author, obj.pages, obj.read);
        console.log("Sucessfully added new book? Check array>", myLibrary);
        // display books
        displayBooks();
        // reset form
        form.reset();
    } else {
        form.reportValidity()
    }
    
}
    )

    // TO DO 
// 5. Use UUID to prevent displayBooks from showing up duplicated books.
//  Add a button on each book’s display to remove the book from the library.
//  You will need to associate your DOM elements with the actual book objects in some way.
//  One easy solution is giving them a data-attribute that corresponds to the 
//  unique id of the respective book object. 
// 6. Add a button on each book’s display to change its read status. (idea, a toggle)
//  To facilitate this you will want to create Book prototype function that 
//  toggles a book instance’s read status.