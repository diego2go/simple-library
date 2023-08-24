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

function Book() {
    // the constructor...
}

function addToLibrary(book) {
    myLibrary.push(book);
    // do stuff here...
}

function displayBooks() {
    myLibrary.forEach((book) => console.log(book))
}