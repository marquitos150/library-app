const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.uuid = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return `${this.uuid}: ${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'read' : 'not read yet'}`;
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function displayBooks() {
    //myLibrary.forEach(book => console.log(book.info()));
    bookList.innerHTML = '';
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <div class="book-card-header">
                <div class="book-card-title">
                    <h1>Title:</h1>
                    <div class="card-title">${book.title}</div>
                </div>
                <button id="trash-icon-button">
                    <div class="trash-icon"></div>
                </button>
            </div>
            <div class="book-card-content">
                <div class="book-card-details">
                    <div class="book-card-author">
                        <h1>Author:</h1>
                        <div class="card-author">${book.author}</div>
                    </div>
                    <div class="book-card-pages">
                        <h1>Pages:</h1>
                        <div class="card-pages">${book.pages}</div>
                    </div>
                </div>
                <div id="book-completion-status">
                    <button id="hasRead"></button>
                    <div id="completion-status">${book.isRead ? 'Read' : 'Not Read'}</div>
                </div>
            </div>
            `;

        bookList.appendChild(bookCard);
    })
}
/*
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

displayBooks();
*/
const bookList = document.querySelector('.book-list');
const addBtn = document.getElementById('add-book-button');
const popup = document.getElementById('popup-form');

// Add New Book Button Event Listener
addBtn.addEventListener('click', () => {
    //addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
    //displayBooks();
    popup.showModal();
});