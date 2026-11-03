// Ambil elemen daftar dari HTML
const daftar = document.getElementById("daftar");

// Jalankan fungsi saat tombol Simpan diklik
document.getElementById("simpan").addEventListener("click", function () {

    // Ambil nilai dari input nama dan instansi
    const nama = document.getElementById("nama").value;
    const instansi = document.getElementById("instansi").value;

    // Periksa apakah nama sudah diisi
    if (nama.trim() === "") {
        alert("Nama wajib diisi");
        return;
    }

    // Buat item daftar baru
    const item = document.createElement("li");

    // Masukkan nama dan instansi ke dalam daftar
    item.textContent = nama + " - " + instansi;

    // Tambahkan item ke halaman
    daftar.appendChild(item);

    // Kosongkan input setelah disimpan
    document.getElementById("nama").value = "";
    document.getElementById("instansi").value = "";

});
