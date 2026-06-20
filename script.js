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
    // Get list of books already shown.
    const shownBooks = document.querySelectorAll('[data-id]');
    
    if (shownBooks.length > 0) {
        // set temporal array to select books to not display again;
        const alreadyDisplayed = [];
        // get books IDs already displayed and push to array
        shownBooks.forEach((book) => {
            // console.log('This ID is already on display:', book.dataset.id)
            alreadyDisplayed.push(book.dataset.id);
            // console.log('Pushed into alreadyDisplayed', alreadyDisplayed );
        });
       // skip IDs alreadyDisplayed from myLibrary, copy the rest to toDisplay
       let toDisplay = [];

        myLibrary.forEach((bookSaved) => {
	        for (index of alreadyDisplayed) {
		        if (index !== bookSaved.id) {
				    // console.log(`This index ${index} is not equal to ${bookSaved.id}. So, 
                    // this index must get into toDisplay array`);
                    toDisplay.push(bookSaved);
                    // console.log(`toDisplay contents: ${toDisplay}`)
			    }else {
				    // console.log(`This index ${index} is  equal to ${bookSaved.id}. Skip this one. 
                    // Dont append to array toDisplay`);
                    return
			    }
	        }
        });
        // display books from toDisplay
        toDisplay.forEach((book) => {
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
            
            //add remove btn to each new book
            const removeBtn = document.createElement('button');
            removeBtn.className = 'button remove-book';
            removeBtn.textContent = 'Remove';

            // set up UUID to book card
            bookContainer.setAttribute('data-id', book.id);
            
            bookDetails.append(bookAuthor, pages, readStatus, removeBtn);
            bookContainer.append(bookTitle,bookDetails);
            cardContainer.append(bookContainer);
        })

       // append those toDisplay into DOM
    } else {
        // console.log('shownBooks was empty, 1st book saved')
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
        //add remove btn to each new book
        const removeBtn = document.createElement('button');
        removeBtn.className = 'button remove-book';
        removeBtn.textContent = 'Remove';

        // set up UUID to book card
        bookContainer.setAttribute('data-id', book.id);
        
        bookDetails.append(bookAuthor, pages, readStatus, removeBtn);
        bookContainer.append(bookTitle,bookDetails);
        cardContainer.append(bookContainer);
    });
    } 
    // may setup functions to append and to create elements separately...
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

// TO DO 
// 5. Add a button on each book’s display to remove the book from the library.
//  You will need to associate your DOM elements with the actual book objects in some way.
//  One easy solution is giving them a data-attribute that corresponds to the 
//  unique id of the respective book object. 
// 6. Add a button on each book’s display to change its read status. (idea, a toggle)
//  To facilitate this you will want to create Book prototype function that 
//  toggles a book instance’s read status.