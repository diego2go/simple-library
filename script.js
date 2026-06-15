const myLibrary = [
    {
        title: 'Harry Potter',
        author: 'J.K Rowling',
        pages: 567,
        read: true
    },
    {
        title: 'Start with Why',
        author: 'Simon Sinek',
        pages: 400,
        read: false
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        pages: 580,
        read: false
    }
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

        bookDetails.append(bookAuthor, pages, readStatus);
        bookContainer.append(bookTitle,bookDetails);
        cardContainer.append(bookContainer);
    });
}
