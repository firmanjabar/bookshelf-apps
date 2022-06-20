const submit = document.getElementById('submitBuku');
const submitEdit = document.getElementById('submitEditBuku');
const cbSudahBaca = document.getElementById('sudahBaca');
const cbSudahEditBaca = document.getElementById('sudahEditBaca');
const search = document.getElementById('search');
let arrData = [];

function getBookList() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function selecaiBaca(id){
    let bookData = getBookList();
    var data = [];
    
    bookData.forEach((book, key) => {
        if(book.id == id){
            data = book;
            bookData.splice(key, 1);
        }
    });

    if(data.isComplete == false){
        data.isComplete = true;
    }else{
        data.isComplete = false;
    }

    bookData = [data, ...bookData];

    localStorage.setItem("books", JSON.stringify(bookData));
    renderBookList();
}

function deleteBook(id){
    let bookData = getBookList();

    bookData.forEach((book, key) => {
        if(book.id == id){
            bookData.splice(key, 1);
        }
    });

    localStorage.setItem("books", JSON.stringify(bookData));
    renderBookList();
}

function editBook(id){
    let judul = document.getElementById('txtEditJudul');
    let penulis = document.getElementById('txtEditPenulis');
    let tahun = document.getElementById('txtEditTahun');
    let cbSudahBaca = document.getElementById('sudahEditBaca');
    let submitEdit = document.getElementById('submitEditBuku');

    let bookData = getBookList();
    var data = [];
    let urutan = 0;
    
    bookData.forEach((book, key) => {
        if(book.id == id){
            data = book;
            urutan = key;
            bookData.splice(key, 1);
        }
    });

    judul.value = data.title;
    penulis.value = data.author;
    tahun.value = data.year;
    cbSudahBaca.checked = data.isComplete;

    if(data.isComplete == true){
        submitEdit.innerHTML= 'Edit Buku ke rak <b>Selesai Dibaca</b>';
    } else {
        submitEdit.innerHTML= 'Edit Buku ke rak <b>Belum Selesai Dibaca</b>';
    }

    submitEdit.myParam = data.id;
}

function renderBookList() {
    const bookData = getBookList();
    const bookListBelum = document.querySelector('#listBelumDibaca');
    const bookListSudah = document.querySelector('#listSudahDibaca');

    bookListBelum.innerHTML = '';
    bookListSudah.innerHTML = '';
    for (let book of bookData) {
        if(book.isComplete == false){
            bookListBelum.innerHTML += `
                <div class="justify-content-center content-book" style="display:flex">
                    <div class="p-3">
                    <div class="list-group">
                        <div class="list-group-item px-5 py-4">
                        <div class="d-flex w-100 justify-content-center fw-bold">
                            <p class="mb-1 bookTitle">${book.title}</p>
                        </div>
                        <p class="mb-1">${book.author}</p>
                        <small>${book.year}</small>
                        <div class="mt-2">
                            <button onclick="selecaiBaca(${book.id})" type="button" class="btn btn-primary">Selesai Dibaca</button>
                            <button onclick="editBook(${book.id})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                            <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger">Delete</button>
                        </div>
                        </div>
                    </div>
                    </div> 
                </div>
            `;
        } else {
            bookListSudah.innerHTML += `
                <div class="justify-content-center content-book" style="display:flex">
                    <div class="p-3">
                    <div class="list-group">
                        <div class="list-group-item px-5 py-4">
                        <div class="d-flex w-100 justify-content-center fw-bold">
                            <p class="mb-1 bookTitle">${book.title}</p>
                        </div>
                        <p class="mb-1">${book.author}</p>
                        <small>${book.year}</small>
                        <div class="mt-2">
                            <button onclick="selecaiBaca(${book.id})" type="button" class="btn btn-primary">Belum Selesai Dibaca</button>
                            <button onclick="editBook(${book.id})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                            <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger">Delete</button>
                        </div>
                        </div>
                    </div>
                    </div> 
                </div>
            `;
        }
    }
}

cbSudahBaca.addEventListener('change',(e)=>{
    const checked = e.target.checked
    const submit = document.getElementById('submitBuku');

    if(checked == true){
        submit.innerHTML= 'Masukkan Buku ke rak <b>Selesai Dibaca</b>';
    } else {
        submit.innerHTML= 'Masukkan Buku ke rak <b>Belum Selesai Dibaca</b>';
    }

})

cbSudahEditBaca.addEventListener('change',(e)=>{
    const checked = e.target.checked
    const submit = document.getElementById('submitEditBuku');

    if(checked == true){
        submit.innerHTML= 'Masukkan Buku ke rak <b>Selesai Dibaca</b>';
    } else {
        submit.innerHTML= 'Masukkan Buku ke rak <b>Belum Selesai Dibaca</b>';
    }
})

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    let judul = document.getElementById('txtJudul');
    let penulis = document.getElementById('txtPenulis');
    let tahun = document.getElementById('txtTahun');
    let cbSudahBaca = document.getElementById('sudahBaca');

    const simpan = {
        'id': Date.now(),
        'title': judul.value,
        'author': penulis.value,
        'year': tahun.value,
        'isComplete': cbSudahBaca.checked,
    }

    arrData.unshift(simpan);
    localStorage.setItem("books",JSON.stringify(arrData));

    judul.value = '';
    penulis.value = '';
    tahun.value = '';
    cbSudahBaca.checked = false;

    renderBookList();
})

submitEdit.addEventListener('click', (e)=>{
    e.preventDefault();

    const id = e.currentTarget.myParam;
    let judul = document.getElementById('txtEditJudul');
    let penulis = document.getElementById('txtEditPenulis');
    let tahun = document.getElementById('txtEditTahun');
    let cbSudahBaca = document.getElementById('sudahEditBaca');

    let bookData = getBookList();
    var data = [];
    let urutan = 0;
    
    bookData.forEach((book, key) => {
        if(book.id == id){
            data = book;
            urutan = key;
            bookData.splice(key, 1);
        }
    });
    
    const simpan = {
        'id': data.id,
        'title': judul.value,
        'author': penulis.value,
        'year': tahun.value,
        'isComplete': cbSudahBaca.checked,
    }

    bookData.splice(urutan, 0, simpan);
    localStorage.setItem("books",JSON.stringify(bookData));
    renderBookList();
})

search.addEventListener('keyup', ()=>{
    const filter = document.getElementById('search').value.toUpperCase();
    const listTitle = document.querySelectorAll('.bookTitle');
    const cardBook = document.querySelectorAll('.content-book');

    listTitle.forEach((title, key) => {
        txtValue = title.innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cardBook[key].style.display = "";
        } else {
            cardBook[key].style.display = "none";
        }
    })
})

window.addEventListener("load",()=>{
    arrData = JSON.parse(localStorage.getItem("books")) || []; 
    renderBookList()
})

