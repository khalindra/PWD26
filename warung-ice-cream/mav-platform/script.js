// Daftar menu untuk setiap peran
const menuPerPeran = {
    admin: ["Dashboard", "Kelola pengguna", "Kelola layanan"],
    staf: ["Dashboard", "Layanan saya"],
    tamu: ["Daftar layanan"]
};

// Ambil elemen dari HTML
const pilihPeran = document.getElementById("peran");
const daftarMenu = document.getElementById("menu");

// Fungsi untuk menampilkan menu sesuai peran
function tampilkanMenu() {

    // Ambil daftar menu berdasarkan peran yang dipilih
    const menu = menuPerPeran[pilihPeran.value];

    // Kosongkan daftar menu sebelumnya
    daftarMenu.innerHTML = "";

    // Tampilkan setiap menu
    menu.forEach(function (nama) {
        const item = document.createElement("li");
        item.textContent = nama;
        daftarMenu.appendChild(item);
    });

}

// Jalankan fungsi saat peran berubah
pilihPeran.addEventListener("change", tampilkanMenu);

// Tampilkan menu saat halaman pertama kali dibuka
tampilkanMenu();