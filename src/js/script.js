{
  ('use strict');

  const favouriteBooks = [];
  const filters = [];
  const filterForm = document.querySelector('.filters');
  const booksList = document.querySelector('.books-list');
  const menuBooks = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  const ratingStyle = function () {
    for (const book of dataSource.books) {
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
  };

  const render = function () {
    ratingStyle(dataSource);
    for (const book of dataSource.books) {
      const generatedHTML = menuBooks(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
    }
  };
  render();

  const initActions = function () {
    booksList.addEventListener('dblclick', function (event) {
      const book = event.target.closest('.book__image');
      event.preventDefault();
      if (book) {
        // console.log(book);
        if (!favouriteBooks.includes(book.getAttribute('data-id'))) {
          book.classList.add('favorite');
          favouriteBooks.push(book.getAttribute('data-id'));
          console.log(favouriteBooks);
        } else {
          book.classList.remove('favorite');
          const index = favouriteBooks.indexOf(book.getAttribute('data-id'));
          favouriteBooks.splice(index, 1);
          console.log(favouriteBooks);
        }
      }
    });
    filterForm.addEventListener('click', function (event) {
      if (event.target.type === 'checkbox' && event.target.name === 'filter' && event.target.tagName === 'INPUT') {
        if (event.target.checked) {
          filters.push(event.target.value);
          console.log(filters);
        } else {
          const index = filters.indexOf(event.target.value);
          filters.splice(index, 1);
          console.log(filters);
        }
      }
      filterBooks();
    });
  };

  const filterBooks = function () {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        if (!book.details[filter]) {
          console.log(!book.details[filter]);
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
  };
  initActions();

  // rating <6
  // background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);

  //Rating > 6 && <= 8
  // background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);

  //Rating > 8 && <= 9
  // background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);

  // Rating > 9
  // background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);

  // ratingWidth = `${rating}%`
}
