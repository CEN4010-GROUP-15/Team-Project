function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


const url = 'https://cen4010-group15.herokuapp.com/api/books/';
console.log();
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let books = data;
  console.log(books);
  return books.map(function(book) {
    
    var objTo = document.getElementById("grid");
    console.log(objTo);
    var divtest = document.createElement("div");
    divtest.className = "col"
    divtest.innerHTML = `
      <h3>${book.name}</h3>
      <p>by ${book.author}</p>
      <br/>
      <h4>$${book.price}</h4>
      <img src="${book.cover_url}" alt="${book.name} cover page" />
      <button class="btnDetails" type="button">Details</button>`;
    objTo.appendChild(divtest);
  })
})
.catch(function(error) {
  console.log(error);
});
