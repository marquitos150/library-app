const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.uuid = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
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
                    <div class="card-title"></div>
                </div>
                <button id="trash-icon-button">
                    <div class="trash-icon"></div>
                </button>
            </div>
            <div class="book-card-content">
                <div class="book-card-details">
                    <div class="book-card-author">
                        <h1>Author:</h1>
                        <div class="card-author"></div>
                    </div>
                    <div class="book-card-pages">
                        <h1>Pages:</h1>
                        <div class="card-pages"></div>
                    </div>
                </div>
                <div id="book-completion-status">
                    <button id="hasRead"></button>
                    <div id="completion-status"></div>
                </div>
            </div>
            `;
        
        bookCard.querySelector('.card-title').textContent = book.title;
        bookCard.querySelector('.card-author').textContent = book.author;
        bookCard.querySelector('.card-pages').textContent = book.pages;
        bookCard.querySelector('#completion-status').textContent = book.hasRead ? 'Completed' : 'Incomplete';

        bookList.appendChild(bookCard);
    })
}
// Main DOM Elements
const bookList = document.querySelector('.book-list');
const addBtn = document.getElementById('add-book-btn');

// Dialog DOM Elements
const popup = document.getElementById('popup-form');
const form = document.querySelector('form');
const closeBtn = document.getElementById('close-btn');

// Close Popup Event Listener
closeBtn.addEventListener('click', () => {
    popup.close();
});

// Add New Book Button Event Listener
addBtn.addEventListener('click', () => {
    popup.showModal();
});

// Submit Button Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('has-read').checked;

    addBookToLibrary(title, author, pages, hasRead);
    displayBooks();
    popup.close();
});