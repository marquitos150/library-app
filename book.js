const myLibrary = [];
let currentFilter = 'all';

function Book(title, author, pages, hasRead) {
    this.uuid = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function() {
    this.hasRead = !this.hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function displayBooks() {
    // Display filter buttons if there is at least one book in the library
    if (myLibrary.length > 0) {
        filterBtns.style.display = 'flex';
    } else {
        filterBtns.style.display = 'none';
    }

    bookList.innerHTML = '';
    myLibrary.forEach(book => {
        // Display books based on current filter
        if (currentFilter === 'completed' && !book.hasRead) return;
        if (currentFilter === 'incomplete' && book.hasRead) return;
        
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book.uuid;

        bookCard.innerHTML = `
            <div class="book-card-header">
                <div class="book-card-title">
                    <h1>Title:</h1>
                    <div class="card-title"></div>
                </div>
                <button class="trash-icon-btn">
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
                <div class="book-completion-status">
                    <div class="completion-status"></div>
                </div>
            </div>
            `;
        
        bookCard.querySelector('.card-title').textContent = book.title;
        bookCard.querySelector('.card-author').textContent = book.author;
        bookCard.querySelector('.card-pages').textContent = book.pages;

        // Handle completion status of book
        const bookCompletionStatus = bookCard.querySelector('.book-completion-status');
        const hasReadBtn = document.createElement('button');
        const completionStatus = bookCard.querySelector('.completion-status');
        if (book.hasRead) {
            hasReadBtn.classList.add('hasRead');
            const checkMark = document.createElement('div');
            checkMark.classList.add('check-mark');
            hasReadBtn.appendChild(checkMark);
        } else {
            hasReadBtn.classList.remove('hasRead');
        }

        completionStatus.textContent = book.hasRead ? 'Completed' : 'Incomplete';
        bookCompletionStatus.insertBefore(hasReadBtn, completionStatus);

        bookList.appendChild(bookCard);
    })
}
// Main DOM Elements
const bookList = document.querySelector('.book-list');
const addBtn = document.getElementById('add-book-btn');
const filterBtns = document.querySelector('.filter-btns');

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

// Listens for any clicks made on the book list
bookList.addEventListener('click', (e) => {
    let target = e.target;
    target.blur();

    // Trash Book Event
    if (target.classList.contains('trash-icon-btn') || target.classList.contains('trash-icon')) {
        const bookId = target.closest('.book-card').dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.uuid === bookId);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        }
    }

    // Toggle Has Read Event
    if (target.classList.contains('check-mark') || 
        (target.tagName === 'BUTTON' && target.parentElement.classList.contains('book-completion-status'))) {
        const bookId = target.closest('.book-card').dataset.id;
        const book = myLibrary.find(book => book.uuid === bookId);
        if (book) {
            book.toggleReadStatus();
            displayBooks();
        }
    }
});

// Listens for filter button clicks
filterBtns.addEventListener('click', (e) => {
    let target = e.target;
    target.blur();

    // Change button active status
    if (target.classList.contains('filter-btn') && !target.classList.contains('active')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        currentFilter = target.id;
        displayBooks();
    }
});