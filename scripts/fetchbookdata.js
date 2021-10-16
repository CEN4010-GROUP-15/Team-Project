function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function goDetails(evt){
  location.href='./book_details.html?ISBN='+evt.currentTarget.book.ISBN;
}

const url = 'https://cen4010-group15.herokuapp.com/api/books/';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let books = data;
  console.log(books);
  return books.map(function(book) {
    
    var objTo = document.getElementById("grid");
    console.log(objTo);
    var divtest = document.createElement("div");
    var button = document.createElement("button");
    button.className = "btnDetails"
    button.innerHTML = 'Details'   
    divtest.className = "col"
    divtest.innerHTML = `
      <h3>${book.name}</h3>
      <p>by ${book.author}</p>
      <br/>
      <h4>$${book.price}</h4>
      <img src="${book.cover_url}" alt="${book.name} cover page" />`; 
      button.addEventListener("click", goDetails, false);
      button.book = book;
      divtest.appendChild(button);
    objTo.appendChild(divtest);
  })
})
.catch(function(error) {
  console.log(error);
});
