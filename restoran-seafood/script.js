/* ============================================================
   SEAFOOD NUSANTARA - JQUERY SCRIPT
   ============================================================ */

$(document).ready(function () {


    /* =====================================================
       1. DATA PRODUK
       ===================================================== */

    const produkData = [

        {
            id: 1,
            nama: 'Ikan Bakar Sambal Matah',
            harga: 35000,
            kategori: 'ikan',
            icon: '🐟',
            desc: 'Ikan bakar segar dengan sambal matah',
            badge: 'Best Seller',
            badgeType: 'hot'
        },

        {
            id: 2,
            nama: 'Ikan Goreng Crispy',
            harga: 30000,
            kategori: 'ikan',
            icon: '🐠',
            desc: 'Ikan goreng renyah dan gurih',
            badge: 'Favorit',
            badgeType: ''
        },

        {
            id: 3,
            nama: 'Udang Saus Padang',
            harga: 40000,
            kategori: 'udang',
            icon: '🦐',
            desc: 'Udang segar dengan saus padang pedas',
            badge: 'Best Seller',
            badgeType: 'hot'
        },

        {
            id: 4,
            nama: 'Udang Bakar Madu',
            harga: 42000,
            kategori: 'udang',
            icon: '🦐',
            desc: 'Udang bakar dengan saus madu spesial',
            badge: 'Baru',
            badgeType: ''
        },

        {
            id: 5,
            nama: 'Cumi Goreng Tepung',
            harga: 35000,
            kategori: 'cumi',
            icon: '🦑',
            desc: 'Cumi crispy gurih dan lezat',
            badge: 'Favorit',
            badgeType: ''
        },

        {
            id: 6,
            nama: 'Cumi Saus Tiram',
            harga: 38000,
            kategori: 'cumi',
            icon: '🦑',
            desc: 'Cumi segar dengan saus tiram',
            badge: '',
            badgeType: ''
        },

        {
            id: 7,
            nama: 'Kepiting Saus Padang',
            harga: 75000,
            kategori: 'kepiting',
            icon: '🦀',
            desc: 'Kepiting segar dengan saus padang',
            badge: 'Best Seller',
            badgeType: 'hot'
        },

        {
            id: 8,
            nama: 'Kepiting Saus Tiram',
            harga: 70000,
            kategori: 'kepiting',
            icon: '🦀',
            desc: 'Kepiting dengan saus tiram spesial',
            badge: '',
            badgeType: ''
        },

        {
            id: 9,
            nama: 'Kerang Saus Padang',
            harga: 30000,
            kategori: 'kerang',
            icon: '🐚',
            desc: 'Kerang segar dengan saus padang',
            badge: 'Baru',
            badgeType: ''
        },

        {
            id: 10,
            nama: 'Kerang Saus Tiram',
            harga: 28000,
            kategori: 'kerang',
            icon: '🐚',
            desc: 'Kerang segar dengan saus tiram',
            badge: '',
            badgeType: ''
        },

        {
            id: 11,
            nama: 'Seafood Mix',
            harga: 85000,
            kategori: 'ikan',
            icon: '🍤',
            desc: 'Campuran seafood lengkap dan segar',
            badge: 'Favorit',
            badgeType: ''
        },

        {
            id: 12,
            nama: 'Nasi Goreng Seafood',
            harga: 30000,
            kategori: 'ikan',
            icon: '🍚',
            desc: 'Nasi goreng dengan campuran seafood',
            badge: '',
            badgeType: ''
        }

    ];


    /* =====================================================
       2. STATE
       ===================================================== */

    let cart = [];

    let currentFilter = 'all';

    let searchKeyword = '';


    /* =====================================================
       3. RENDER PRODUK
       ===================================================== */

    function renderProduk() {

        const $grid = $('#produkGrid');

        $grid.empty();


        const filtered = produkData.filter(function (p) {

            const matchKategori =
                currentFilter === 'all' ||
                p.kategori === currentFilter;


            const matchSearch =
                p.nama
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) ||

                p.desc
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase());


            return matchKategori && matchSearch;

        });


        if (filtered.length === 0) {

            $grid.html(`

                <div style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:60px 20px;
                ">

                    <i
                        class="fas fa-search"
                        style="
                            font-size:3.5rem;
                            color:#ffe4ec;
                            margin-bottom:20px;
                        ">
                    </i>

                    <h3>
                        Produk tidak ditemukan
                    </h3>

                    <p>
                        Coba kata kunci atau kategori lain
                    </p>

                </div>

            `);

            return;
        }


        filtered.forEach(function (p) {


            const badgeHtml = p.badge

                ? `
                    <div class="produk-badge ${p.badgeType}">
                        ${p.badge}
                    </div>
                  `

                : '';


            const card = `

                <div
                    class="produk-card"
                    data-id="${p.id}"
                    data-kategori="${p.kategori}">


                    ${badgeHtml}


                    <div class="produk-img">

                        ${p.icon}

                    </div>


                    <div class="produk-info">

                        <h3>
                            ${p.nama}
                        </h3>


                        <p class="desc">

                            ${p.desc}

                        </p>


                        <div class="produk-footer">


                            <div class="produk-price">

                                Rp ${p.harga.toLocaleString('id-ID')}

                                <small>
                                    per porsi
                                </small>

                            </div>


                            <button
                                class="btn-add-cart"
                                data-id="${p.id}">

                                <i class="fas fa-plus"></i>

                            </button>


                        </div>

                    </div>

                </div>

            `;


            $grid.append(card);

        });

    }


    /* =====================================================
       4. FILTER NAVBAR
       ===================================================== */

    $('.nav-link').click(function () {

        $('.nav-link').removeClass('active');

        $(this).addClass('active');


        currentFilter =
            $(this).data('filter');


        $('.filter-btn')
            .removeClass('active');


        $(`.filter-btn[data-cat="${currentFilter}"]`)
            .addClass('active');


        renderProduk();

    });


    /* =====================================================
       5. FILTER BUTTON
       ===================================================== */

    $('.filter-btn').click(function () {

        $('.filter-btn')
            .removeClass('active');


        $(this).addClass('active');


        currentFilter =
            $(this).data('cat');


        $('.nav-link')
            .removeClass('active');


        $(`.nav-link[data-filter="${currentFilter}"]`)
            .addClass('active');


        renderProduk();

    });


    /* =====================================================
       6. SEARCH
       ===================================================== */

    $('#searchProduk').on('input', function () {

        searchKeyword =
            $(this).val();


        renderProduk();

    });


    /* =====================================================
       7. TAMBAH KE KERANJANG
       ===================================================== */

    $(document).on(
        'click',
        '.btn-add-cart',
        function () {


            const id =
                $(this).data('id');


            const produk =
                produkData.find(
                    p => p.id === id
                );


            if (!produk) {
                return;
            }


            const existing =
                cart.find(
                    item => item.id === id
                );


            if (existing) {

                existing.qty += 1;

            } else {

                cart.push({

                    id: produk.id,

                    nama: produk.nama,

                    harga: produk.harga,

                    icon: produk.icon,

                    qty: 1

                });

            }


            updateCartUI();


            showToast(
                `${produk.icon} ${produk.nama} ditambahkan!`
            );

        }
    );


    /* =====================================================
       8. UPDATE KERANJANG + DISKON
       ===================================================== */

    function updateCartUI() {

        const $cartItems =
            $('#cartItems');


        const totalQty =
            cart.reduce(
                (sum, item) =>
                    sum + item.qty,
                0
            );


        const hargaAwal =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (item.harga * item.qty),
                0
            );


        let diskon = 0;

        let totalHarga = hargaAwal;


        /*
         * DISKON MODUL
         * 10% jika total > Rp100.000
         */

        if (hargaAwal > 100000) {

            diskon =
                hargaAwal * 0.10;


            totalHarga =
                hargaAwal - diskon;

        }


        $('#cartBadge')
            .text(totalQty);


        /* TAMPILKAN TOTAL */

        if (diskon > 0) {

            $('#cartTotal').html(`

                <small class="harga-lama">

                    Rp ${hargaAwal.toLocaleString('id-ID')}

                </small>


                <strong>

                    Rp ${totalHarga.toLocaleString('id-ID')}

                </strong>


                <small class="diskon-info">

                    Hemat
                    Rp ${diskon.toLocaleString('id-ID')}

                </small>

            `);

        } else {

            $('#cartTotal').html(`

                <strong>

                    Rp ${totalHarga.toLocaleString('id-ID')}

                </strong>

            `);

        }


        /* KERANJANG KOSONG */

        if (cart.length === 0) {

            $cartItems.html(`

                <div class="cart-empty">

                    <i class="fas fa-shopping-cart"></i>

                    <p>
                        Keranjang masih kosong
                    </p>

                    <small>
                        Yuk pilih menu seafood dulu!
                    </small>

                </div>

            `);

            return;

        }


        /* ITEM KERANJANG */

        let html = '';


        cart.forEach(function (item) {

            html += `

                <div
                    class="cart-item"
                    data-id="${item.id}">


                    <div class="cart-item-icon">

                        ${item.icon}

                    </div>


                    <div class="cart-item-info">

                        <h5>

                            ${item.nama}

                        </h5>


                        <div class="price">

                            Rp ${item.harga.toLocaleString('id-ID')}

                        </div>


                        <div class="qty-control">


                            <button
                                class="qty-btn"
                                data-action="minus"
                                data-id="${item.id}">

                                −

                            </button>


                            <span class="qty-value">

                                ${item.qty}

                            </span>


                            <button
                                class="qty-btn"
                                data-action="plus"
                                data-id="${item.id}">

                                +

                            </button>


                        </div>

                    </div>


                    <button
                        class="cart-item-remove"
                        data-id="${item.id}">

                        <i class="fas fa-trash"></i>

                    </button>


                </div>

            `;

        });


        $cartItems.html(html);

    }


    /* =====================================================
       9. PLUS / MINUS
       ===================================================== */

    $(document).on(
        'click',
        '.qty-btn',
        function () {


            const action =
                $(this).data('action');


            const id =
                $(this).data('id');


            const item =
                cart.find(
                    i => i.id === id
                );


            if (!item) {
                return;
            }


            if (action === 'plus') {

                item.qty += 1;

            }


            if (action === 'minus') {

                item.qty -= 1;


                if (item.qty <= 0) {

                    cart =
                        cart.filter(
                            i => i.id !== id
                        );

                }

            }


            updateCartUI();

        }
    );


    /* =====================================================
       10. HAPUS PRODUK
       ===================================================== */

    $(document).on(
        'click',
        '.cart-item-remove',
        function () {


            const id =
                $(this).data('id');


            cart =
                cart.filter(
                    item => item.id !== id
                );


            updateCartUI();

        }
    );


/* =====================================================
   BUKA / TUTUP KERANJANG
   ===================================================== */

$('#cartBtn').on('click', function () {

    $('#cartSidebar').addClass('open');

    $('#cartOverlay').fadeIn(300);

});


$('#cartClose').on('click', function () {

    $('#cartSidebar').removeClass('open');

    $('#cartOverlay').fadeOut(300);

});


$('#cartOverlay').on('click', function () {

    $('#cartSidebar').removeClass('open');

    $('#cartOverlay').fadeOut(300);

});


    /* =====================================================
       13. CHECKOUT
       ===================================================== */

    $('#btnCheckout').click(function () {


        if (cart.length === 0) {

            showToast(
                '❌ Keranjang masih kosong!'
            );

            return;

        }


        $('#checkoutModal')
            .addClass('show');

    });


    /* =====================================================
       14. BATAL CHECKOUT
       ===================================================== */

    $('#btnBatal').click(function () {

        $('#checkoutModal')
            .removeClass('show');

    });


    /* =====================================================
       15. BAYAR SEKARANG
       ===================================================== */

    $('#checkoutForm').submit(function (e) {

        e.preventDefault();


        const nama =
            $('#namaPembeli')
                .val()
                .trim();


        const alamat =
            $('#alamatPembeli')
                .val()
                .trim();


        const noHp =
            $('#noHp')
                .val()
                .trim();


        if (
            nama === '' ||
            alamat === '' ||
            noHp === ''
        ) {

            showToast(
                '❌ Data pembeli belum lengkap!'
            );

            return;

        }


        const hargaAwal =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (item.harga * item.qty),
                0
            );


        let totalHarga =
            hargaAwal;


        /* DISKON 10% */

        if (hargaAwal > 100000) {

            totalHarga =
                hargaAwal -
                (hargaAwal * 0.10);

        }


        $('#checkoutModal')
            .removeClass('show');


        $('#cartSidebar')
            .removeClass('open');


        $('#cartOverlay')
            .fadeOut(300);


        cart = [];


        updateCartUI();


        $('#checkoutForm')[0]
            .reset();


        showToast(

            `✅ Pembayaran berhasil!
             Total Rp ${totalHarga.toLocaleString('id-ID')}`

        );

    });


    /* =====================================================
       16. TOAST
       ===================================================== */

    let toastTimer;


    function showToast(message) {


        clearTimeout(toastTimer);


        $('#toastMsg')
            .text(message);


        $('#toast')
            .addClass('show');


        toastTimer =
            setTimeout(
                function () {

                    $('#toast')
                        .removeClass('show');

                },
                2500
            );

    }


    /* =====================================================
       17. HAMBURGER
       ===================================================== */

    $('#hamburger').click(function () {


        $('#navMenu')
            .toggleClass('show');


        const icon =
            $(this).find('i');


        if (
            $('#navMenu')
                .hasClass('show')
        ) {

            icon
                .removeClass('fa-bars')
                .addClass('fa-times');

        } else {

            icon
                .removeClass('fa-times')
                .addClass('fa-bars');

        }

    });


    /* =====================================================
       18. INISIALISASI
       ===================================================== */

    renderProduk();

    updateCartUI();


    console.log(
        '🐟 Seafood Nusantara - Siap!'
    );

});