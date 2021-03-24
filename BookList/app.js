//Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author=author;
    this.isbn=isbn;
}



//UI Constrctor

function UI(){
    
}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row= document.createElement('tr');
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class= "delete">X</a></td>
    `;

    list.appendChild(row);
}
UI.prototype.showAlert= function(message,className){
    const div = document.createElement('div');
    div.className= `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');

    const form= document.querySelector('#book-form');
    container.insertBefore(div,form);

    //Timeout after 3 secs
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)

}

UI.prototype.clearFields= function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Event Listner to add book
document.getElementById('book-form').addEventListener('submit',function(e){
    
    //Get form values
    const title = document.getElementById('title').value;
          author= document.getElementById('author').value;
          isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn)

    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
            ui.showAlert('Please fill in all fields','error');
    }else{
        //Add book 
        ui.addBookToList(book);

        //Show success
        ui.showAlert('Book Added!' , 'success')

        //Clear Fields after adding book
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listner for delete book

document.getElementById('book-list').addEventListener
('click',function(e){
    
    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book removed','success');

    e.preventDefault();
})

