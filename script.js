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
    this.toggleReadStatus = function() {
        if (this.read == 'Read') this.read = 'Not read'
        else this.read = 'Read'
    }
}

function addToLibrary(bookTitle, author, pages, readStatus) {
    // take params, create a book then store it in the array
    book = new Book(bookTitle, author, pages, readStatus);
    myLibrary.push(book);
}

const cardContainer = document.querySelector('.card-container')
function displayBooks() {
    // call filterBooksToDisplay, return array...
    let libraryToDisplay = filterBooksToDisplay();
   
    libraryToDisplay.forEach((book) => {
       
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
        readStatus.textContent = 'Status: '
        const readLabel = document.createElement('span');
        readLabel.className = 'readLabel';
        readLabel.textContent = book.read;

        // append toggle switch to each new book
        const labelSwitch = document.createElement('label');
        const checkBox = document.createElement('input');
        const toggleSpan = document.createElement('span');

        toggleSpan.className = 'slider round';
        checkBox.type = 'checkbox';
        labelSwitch.className = 'switch';
        labelSwitch.append(checkBox, toggleSpan);
        // append label to read li...
        readStatus.append(readLabel, labelSwitch);
        //add remove btn to each new book
        const removeBtn = document.createElement('button');
        removeBtn.className = 'button remove-book';
        removeBtn.textContent = 'Remove';
        
        // set up UUID to book card
        bookContainer.setAttribute('data-id', book.id);
        
        bookDetails.append(bookAuthor, pages, readStatus);
        bookContainer.append(bookTitle,bookDetails, removeBtn);
        cardContainer.append(bookContainer);
    });
}

// get books already shown, and return array of books to display
function filterBooksToDisplay() {
    //get ids shown
    const shownBooks = document.querySelectorAll('[data-id]');
   
    if (shownBooks.length > 0) {
        
        let toDisplay = [];
        // may still use when removing books...
        // let displayedID = [];
        // shownBooks.forEach((book) => {
        //     displayedID.push(book.dataset.id);
        // });
        //simple version, just push the last one saved. TBD if it works when removing books...
        toDisplay.push(myLibrary[myLibrary.length - 1]);

        return toDisplay;

    // otherwise return myLibrary
    }else {
        return myLibrary
    }
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
        // display books
        displayBooks();
        // reset form
        form.reset();
    } else {
        form.reportValidity()
    }
    }
    )

cardContainer.addEventListener('click', (e) => {
    //listen for clicks on .remove-book buttons only.
    if (e.target.classList.contains('remove-book')) {
        //get parent to remove:
        let parentRemove = e.target.parentNode;
        removeBook(parentRemove);
    };
    // listen for readStatus slider
    if (e.target.classList.contains('slider')) {
        //get book ID to change status
        let toggleBookID = e.target.closest('.card').dataset.id;
        // get library index of that ID
        let i = myLibrary.findIndex(book => book.id === toggleBookID);
        // toggle status
        myLibrary[i].toggleReadStatus();
        // change displayed status
        let readStatus = e.target.parentNode.previousElementSibling;
        readStatus.innerText = myLibrary[i].read;
    }
})

function removeBook (item) {
    let idOnDisplay = item.dataset.id;
    myLibrary.forEach((book) => {
        if (book.id == idOnDisplay) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            item.remove();
        };
    });
}


// TO DO 
// 6. Add a button on each book’s display to change its read status. (idea, a toggle)
//  To facilitate this you will want to create Book prototype function that 
//  toggles a book instance’s read status.
// Set up toggle to change read status
// on click event, trigger that book.toggleReadStatus()
// Then update the displayed book read status.