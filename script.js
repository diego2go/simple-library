const myLibrary = [
    {
        title: 'Harry Potter',
        author: 'J.K Rowling'
    },
    {
        title: 'Why',
        author: 'Simon Sinek'
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear'
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
}

function addToLibrary(bookTitle, author, pages, readStatus) {
    // take params, create a book then store it in the array
    book = new Book(bookTitle, author, pages, readStatus);
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach((book) => console.log(book))
}