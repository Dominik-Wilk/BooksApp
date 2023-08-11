/* eslint-disable no-unused-vars */
{
  ('use strict');
  const templates = {
    menuBooks: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList {
    constructor(data) {
      const thisBookLists = this;
      thisBookLists.favouriteBooks = [];
      thisBookLists.filters = [];
      thisBookLists.data = data;
      thisBookLists.getElements();
      thisBookLists.render();
      thisBookLists.initActions();
    }

    ratingStyle() {
      const thisBookLists = this;

      for (const book of thisBookLists.data.books) {
        book.width = book.rating * 10;

        if (book.rating < 6) {
          book.color = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
        } else if (book.rating > 6 && book.rating <= 8) {
          book.color = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (book.rating > 8 && book.rating <= 9) {
          book.color = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else {
          book.color = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
      }
    }

    getElements() {
      const thisBookLists = this;
      thisBookLists.dom = {
        filterForm: document.querySelector('.filters'),
        booksList: document.querySelector('.books-list'),
      };
    }

    render() {
      const thisBookLists = this;
      thisBookLists.ratingStyle(thisBookLists.data);

      for (const book of thisBookLists.data.books) {
        const generatedHTML = templates.menuBooks(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBookLists.dom.booksList.appendChild(element);
      }
    }

    initActions() {
      const thisBookLists = this;

      thisBookLists.dom.booksList.addEventListener('dblclick', function (event) {
        const book = event.target.closest('.book__image');
        event.preventDefault();
        if (book) {
          if (!thisBookLists.favouriteBooks.includes(book.getAttribute('data-id'))) {
            book.classList.add('favorite');
            thisBookLists.favouriteBooks.push(book.getAttribute('data-id'));
          } else {
            book.classList.remove('favorite');
            const index = thisBookLists.favouriteBooks.indexOf(book.getAttribute('data-id'));
            thisBookLists.favouriteBooks.splice(index, 1);
          }
        }
      });
      thisBookLists.dom.filterForm.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox' && event.target.name === 'filter' && event.target.tagName === 'INPUT') {
          if (event.target.checked) {
            thisBookLists.filters.push(event.target.value);
          } else {
            const index = thisBookLists.filters.indexOf(event.target.value);
            thisBookLists.filters.splice(index, 1);
          }
        }
        thisBookLists.filterBooks();
      });
    }

    filterBooks() {
      const thisBookLists = this;
      for (let book of thisBookLists.data.books) {
        let shouldBeHidden = false;
        for (let filter of thisBookLists.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          document.querySelector(`.book__image[data-id='${book.id}']`).classList.add('hidden');
        } else {
          document.querySelector(`.book__image[data-id='${book.id}']`).classList.remove('hidden');
        }
      }
    }
  }
  const app = new BooksList(dataSource);
}
