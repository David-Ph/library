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
        if(this.hasRead === true){
            this.hasRead = false;
        }else{
            this.hasRead = true;
        }
    }
}
//                  VAR
// /////////////////////
let myLibrary = [

];
let tempBooks = [
    {title: 'Mushoku Tensei', author: 'Maganote', pages: '295', hasRead: false},
    {title: 'Harry Potter', author: 'J.K Rowling', pages: '295', hasRead: false},
    {title: 'One Piece', author: 'Eiichiro Oda', pages: '295', hasRead: false},
];

tempBooks.forEach((book) =>{
    let newBookTitle = book.title;
    let newBookAuthor = book.author;
    let newBookPages = book.pages;
    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, true);
    myLibrary.push(newBook);
})

//                  EVENT LISTENERS
// /////////////////////////////////
addBtn.addEventListener('click', addBookToLibrary);
booksBlock.addEventListener('click', toggleReadStatus);
booksBlock.addEventListener('click', deleteBook);


//                  FUNCTION
// /////////////////////////////////
function addBookToLibrary(){
    let newBookTitle = newTitle.value;
    let newBookAuthor = newAuthor.value;
    let newBookPages = newPages.value;
    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages);

    if(checkForDuplicate(newBook)){
        return;
    }

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
                <button class="button is-danger toggle-read-btn">Not Read</button>
                <button class="delete button is-danger"></button>
            </p>
        </article>
    `;
    booksBlock.insertAdjacentHTML('beforeend', bookHTML);
}

function showAllBook(){
    booksBlock.innerHTML = '';
    myLibrary.forEach((book) =>{
        book.toggleRead();
        let newBookTitle = book.title;
        let newBookAuthor = book.author;
        let newBookPages = book.pages;
        let bookHTML = `
            <article class="book is-flex">
                <p class="book-title w40">${newBookTitle}</p>
                <p class="book-author w40">${newBookAuthor}</p>
                <p class="book-pages w5">${newBookPages}</p>
                <p class="book-status buttons are-small w15 is-flex is-justify-content-space-between">
                    <button class="button is-danger toggle-read-btn">Not Read</button>
                    <button class="delete button is-danger"></button>
                </p>
            </article>
        `;
        booksBlock.insertAdjacentHTML('beforeend', bookHTML);
    })
}

function toggleReadStatus(e){
    if(e.target.classList.contains('toggle-read-btn')){
        let titleToToggle = e.target.parentNode.parentNode.querySelector('.book-title').innerHTML;
        let authorToToggle = e.target.parentNode.parentNode.querySelector('.book-author').innerHTML;
        let bookInLibrary = findBookByTitleAndAuthor(titleToToggle, authorToToggle);
        if(bookInLibrary[0].hasRead){
            bookInLibrary[0].toggleRead();
            e.target.innerHTML = 'Not Read';
            e.target.classList.remove('is-success');
            e.target.classList.add('is-danger');
        }else{
            bookInLibrary[0].toggleRead();
            e.target.innerHTML = 'Read';
            e.target.classList.remove('is-danger');
            e.target.classList.add('is-success');
        }
    }
}

function deleteBook(e){
    if(e.target.classList.contains('delete')){
        let titleToDelete = e.target.parentNode.parentNode.querySelector('.book-title').innerHTML;
        let authorToDelete = e.target.parentNode.parentNode.querySelector('.book-author').innerHTML;
        let bookToDelete = e.target.parentNode.parentNode;
        // let bookInLibrary = findBookByTitleAndAuthor(titleToDelete, authorToDelete);
        myLibrary = myLibrary.filter(book => book.title != titleToDelete && book.author != authorToDelete);
        booksBlock.removeChild(bookToDelete);
    }
}

function findBookByTitleAndAuthor(title, author){
    let findBook = myLibrary.filter(book => book.title === title && book.author === author);
    return findBook;
}

function resetInput(){
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
}

function checkForDuplicate(newBook){
    let duplicates = findBookByTitleAndAuthor(newBook.title, newBook.author);
    if(duplicates.length){
        alert('There is already a book with the same title and author!');
        return true;
    }
}

//              EXECUTION
// //////////////////////
showAllBook();