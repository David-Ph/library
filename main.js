//                  DOM
// ////////////////////////
const newTitle = document.querySelector('#new-title');
const newAuthor = document.querySelector('#new-author');
const newPages = document.querySelector('#new-pages');
const booksBlock = document.querySelector('.list-books');
const addBtn = document.querySelector('#add-book-btn');

//                  CONSTRUCTORS
// ///////////////////////////////
class Book{
    constructor(title, author, pages, hasRead = false){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }
    toggleRead(){
        this.hasRead = (false) ? true : false;
    }
}
//                  VAR
// /////////////////////
let myLibrary = [
    {title: 'Mushoku Tensei', author: 'Maganote', pages: '295', hasRead: false},
    {title: 'Harry Potter', author: 'J.K Rowling', pages: '295', hasRead: false},
    {title: 'One Piece', author: 'Eiichiro Oda', pages: '295', hasRead: false},
];


//                  EVENT LISTENERS
// /////////////////////////////////
addBtn.addEventListener('click', addBookToLibrary);


//                  FUNCTION
// /////////////////////////////////
function addBookToLibrary(){
    let newBookTitle = newTitle.value;
    let newBookAuthor = newAuthor.value;
    let newBookPages = newPages.value;
    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages);

    myLibrary.push(newBook);
    showNewBook(newBook);
    resetInput()
    
}

function showNewBook(newBook){
    let bookHTML = `
        <article class="book is-flex">
            <p class="book-title w40">${newBook.title}</p>
            <p class="book-author w40">${newBook.author}</p>
            <p class="book-pages w5">${newBook.pages}</p>
            <p class="book-status buttons are-small w15 is-flex is-justify-content-space-between">
                <button class="button is-danger">Not Read</button>
                <button class="delete button is-danger"></button>
            </p>
        </article>
    `;
    booksBlock.insertAdjacentHTML('beforeend', bookHTML);
}

function showAllBook(){
    booksBlock.innerHTML = '';
    myLibrary.forEach((book) =>{
        let newBookTitle = book.title;
        let newBookAuthor = book.author;
        let newBookPages = book.pages;
        let bookHTML = `
            <article class="book is-flex">
                <p class="book-title w40">${newBookTitle}</p>
                <p class="book-author w40">${newBookAuthor}</p>
                <p class="book-pages w5">${newBookPages}</p>
                <p class="book-status buttons are-small w15 is-flex is-justify-content-space-between">
                    <button class="button is-danger">Not Read</button>
                    <button class="delete button is-danger"></button>
                </p>
            </article>
        `;
        booksBlock.insertAdjacentHTML('beforeend', bookHTML);
    })
}

function resetInput(){
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
}

//              EXECUTION
// //////////////////////
showAllBook();