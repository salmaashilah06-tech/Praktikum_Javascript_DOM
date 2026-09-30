console.log("Bismillah Praktikum Dimulai");

// AKtivitas 1 DOM selection / seleksi elemen
// kenapa kita harus seleksi karena  "menangkap" atau ambil id/class
// mengambil elemen html tersebut lalu di simpan di variabel javascript


// 1.Mengambil elemen judul uatama & Sub judul
// document.getelementById ("...") mengambil berdasarkan atribut id

const judulutama = document.getElementById("judul-utama");

// document.querySelector("#...")
// tanda # artinya ID

const subjudul = document.querySelector("#sub-judul");//menangkap: <p id="#sub-judul">


// 2. Mengambil Elemen pada kartu 1 (Kartu Manipulasi Teks & syle)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");


// 3. Mengambil elemen tombol - tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnTogglewarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Untuk mengambil elemen pada kartu 2 (fitur catatan dinamis / To DO list sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesankosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 manipulasi teks & syle (card 1)
// addEventListener("click", function() {...} artinya adalah tolong dengarkan dulu/ tunggu
// sampai di klick user. Jika di klik jalankan perintah didalam fungction

// A. Mengubah teks & warna secara langsung

BtnUbahTeks.addEventListener("click", function() {
    //.innertext = mengganti atau mengisi secara langsung teks yang ada di dalam elemen HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM!";

    //.style.color = mengubah warna teks secara langsung (Inline Style)
    teksPreview.style.color = " #4138ee";

    //.console.log = mencetak pesan di console browser
    console.log("[DOM] Teks Preview telah diperbaharui!");
    
});

// B. Manipulasi Class Css Menggunakan ClassList.toggle()

btnTogglewarna.addEventListener("click", function() {
    //. classlist.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di switch!");

});

// C. Mengembalikan (Reset) teks ke kondisi 
btnReset.addEventListener("click", function(){
    // 1. mengembalikan teks semula teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh javascript";

    // 2. Kosongkan warna agar kembali ke warna css bawaan
    teksPreview.style.color = "";

    // 3. Hapus Class Khusus untuk menggunakan.classlist.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");
});

// Aktivitas 3 & 4 : elemen dinamis & Evenet Handling (TO-DO List Sederhana)
// Di aktivitas  ini kita belajar elemen html baru (<li>) secara otomatis dalam javascript
// mengisi teksnya, memeberi tombol hapus, lalu menempelkan ke layar (<ul>)

// 1. langkah membuat variable penampung angka jumlah catatan
// "let" digunakan untuk nilai variable yang akan berbubah bisa berthamabah bisa berkurang (counting)
let totalCatatan = 0;

// langkah 2: fungsi update angka counter & pesan status

function perbaruiJumlah() {
    // Masukan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;
    // Conditional Statement berupa Apakah catatanya itu kosong/?
if (totalCatatan === 0) {
    // Jika 0: Hapus class "hidden" supaya teks "Belum ada catatan" muncul ke layar
     pesankosong.classList.remove("hidden");

} else {
    // jika > 0: Tambahkan Class "hidden" agar teks "belum ada catatan" tersembuny 
    pesankosong.classList.add("hidden"); }
}

// langkah 3: fungsi uatama logika tambah catatan baru
function tambahCatatan() {
    // 3.1 inpucatatan.value fungsi nya untuk mengambil teks yang di ketik oleh user
    // .trim() = menghapus spaso di awal dan di akhir

    const isiTeks = inputCatatan.value.trim();

    // 3.2 validasi input: jika isi teks kosong maka tampilan alert
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memeorisecara dinamis

    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menambahkan pada tag li

    // 3.4 innerHTML = mengisi stuktur didalam <li> dengan menggunakan yeks catatan dan tombol hapus
    // tanda backtick (')
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 Menambahkan Telinga / Event Listener Untuk Tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li

    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function() {
        liBaru.remove(); // Menghapus elemen list dari layar HTML
        totalCatatan--; // totalCatatan dikurangin sebanyak 1x
        perbaruiJumlah(); // Panggil fungsi perbaruiJumlah untuk update angka dilayar
    console.log(`DOM Catatan "${isiTeks}" dihapus.`);
});
    // 3.6 appendchild = masukan elemen li dalam wadah <ul id= "daftar-catatan">

    daftarCatatan.appendChild(liBaru);

    // 3.7 mengososngkan kembali isi kolom input (inputcatatan.value= "") supaya bisa di ketik lagi
    inputCatatan.value = "";

    // 3.8  
    totalCatatan++;
    perbaruiJumlah();

    console.log(`DOM catatan baru ditambahkan: ${isiTeks}`);
}

// langkah 4 : Event  listener klik tombol +tambah"
// ketika tombol "+ tambah" diklik oleh user maka, jalankan fungsi catatan baru

btnTambah.addEventListener("click", function(){
    tambahCatatan();
})

// langkah 5 event listener keyboard "enter" pada kolom input
// ketika user mengetik di kolom input dan melepas tombol keyboard ('Event keyboard)

inputCatatan.addEventListener("keyup", function (event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan();
    }
});
