// ===== 1. Mode Gelap / Terang =====

// Ambil tombol dari HTML berdasarkan ID
const tombolTema = document.getElementById("tombol-tema");

// Jalankan fungsi saat tombol diklik
tombolTema.addEventListener("click", function () {

    // Tambah atau hapus class "gelap" pada body
    document.body.classList.toggle("gelap");

    // Ubah tulisan tombol sesuai mode aktif
    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "Mode terang";
    } else {
        tombolTema.textContent = "Mode gelap";
    }

});


// ===== 2. Pencarian Proyek =====

// Ambil elemen dari HTML
const kotakCari = document.getElementById("cari");
const semuaKartu = document.querySelectorAll(".kartu");
const pesanKosong = document.getElementById("pesan-kosong");

// Jalankan pencarian setiap kali pengguna mengetik
kotakCari.addEventListener("input", function () {

    // Ambil kata kunci dan ubah menjadi huruf kecil
    const kataKunci = kotakCari.value.toLowerCase();

    // Penanda apakah ada kartu yang cocok
    let adaYangCocok = false;

    // Periksa setiap kartu proyek
    semuaKartu.forEach(function (kartu) {

        // Ambil seluruh teks di dalam kartu
        const isiKartu = kartu.textContent.toLowerCase();

        // Periksa apakah teks kartu sesuai kata kunci
        if (isiKartu.includes(kataKunci)) {
            kartu.style.display = "block";
            adaYangCocok = true;
        } else {
            kartu.style.display = "none";
        }

    });

    // Tampilkan atau sembunyikan pesan jika hasil kosong
    if (adaYangCocok) {
        pesanKosong.style.display = "none";
    } else {
        pesanKosong.style.display = "block";
    }

});