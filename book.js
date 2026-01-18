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
    myLibrary.forEach(book => console.log(book.info()));
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

displayBooks();