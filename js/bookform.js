class Book {
  constructor() {
      this.books = [];
  }

  addBook(bookName, publishDate, price, authorName, authorEmail) {
      const book = {
          authorName,
          authorEmail,
          name: bookName,
          publishDate,
          price,
      };
      this.books.push(book);
  }

  getBooks() {
      return this.books;
  }
}

const bookObject = new Book();
const numberOfBooks = localStorage.getItem("numberOfBooks");
let counter = 1;

document.addEventListener("DOMContentLoaded", function () {
  updateCounter();
});

(function () {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  forms.forEach(form => {
      form.addEventListener('submit', function (event) {
          event.preventDefault();
          if (!form.checkValidity()) {
              event.stopPropagation();
              form.classList.add('was-validated');
          } else {
              let bookName = getValue("bookName");
              let publishDate = getValue("publishDate");
              let price = getValue("price");
              let authorName = getValue("authorName");
              let authorEmail = getValue("authorEmail");

              bookObject.addBook(bookName, publishDate, price, authorName, authorEmail);

              resetForm(["bookName", "publishDate", "price", "authorName", "authorEmail"]);
              form.classList.remove('was-validated');
              counter++;

              if (counter > numberOfBooks) {
                  let existingBooks = JSON.parse(localStorage.getItem("books")) || [];
                  existingBooks.push(...bookObject.getBooks());
                  localStorage.setItem("books", JSON.stringify(existingBooks));
                  window.location.href = "bookTable.html";
              } else {
                  updateCounter();
              }
          }
      });
  });
})();

function getValue(id) {
  return document.getElementById(id).value;
}

function resetForm(ids) {
  ids.forEach(id => {
      document.getElementById(id).value = "";
  });
}

function updateCounter() {
  document.getElementById("bookNumber").textContent = counter;
}
