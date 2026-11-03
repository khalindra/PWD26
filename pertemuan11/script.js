$(document).ready(function () {

    // 1. EFEK SLIDE: membuka dan menutup navigasi pada HP
    $('#navToggle').on('click', function () {
        $('.nav-content nav')
            .stop(true, true)
            .slideToggle(220)
            .toggleClass('open');
    });


    // 2. NAVIGASI TAB: mengganti tampilan layanan
    $('.tab').on('click', function () {
        const target = $(this).data('target');

        // Mengubah tab yang aktif
        $('.tab')
            .removeClass('active')
            .attr('aria-selected', 'false');

        $(this)
            .addClass('active')
            .attr('aria-selected', 'true');

        // Efek fade saat mengganti isi tab
        $('.tab-panel:visible')
            .stop(true, true)
            .fadeOut(150, function () {
                $('.tab-panel').attr('hidden', true);

                $(target)
                    .removeAttr('hidden')
                    .hide()
                    .fadeIn(250);
            });
    });


    // 3. EFEK ANIMATE: animasi kartu portofolio
    $('.portfolio-card')
        .on('mouseenter', function () {
            $(this)
                .stop(true)
                .animate({ opacity: 0.92 }, 160);
        })
        .on('mouseleave', function () {
            $(this)
                .stop(true)
                .animate({ opacity: 1 }, 160);
        });


    // 4. SMOOTH SCROLL: navigasi menuju bagian halaman
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');

        if (!href || href === '#') {
            return;
        }

        const $target = $(href);

        if (!$target.length) {
            return;
        }

        e.preventDefault();

        $('html, body')
            .stop()
            .animate({
                scrollTop: $target.offset().top -
                    $('.navbar').outerHeight()
            }, 550);

        // Menutup navigasi HP setelah menu dipilih
        if (window.matchMedia('(max-width: 760px)').matches) {
            $('.nav-content nav')
                .stop(true, true)
                .slideUp(180)
                .removeClass('open');
        }
    });


    // 5. VALIDASI FORM MENGGUNAKAN JQUERY VALIDATION PLUGIN
    $('#contactForm').validate({

        // ATURAN VALIDASI
        rules: {
            nama: {
                required: true,
                minlength: 3
            },

            email: {
                required: true,
                email: true
            },

            telepon: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 13
            },

            layananPilihan: {
                required: true
            },

            anggaran: {
                required: true,
                number: true,
                min: 100000
            },

            pesan: {
                required: true,
                minlength: 10
            }
        },

        // PESAN KESALAHAN
        messages: {
            nama: {
                required: 'Nama wajib diisi.',
                minlength: 'Nama minimal 3 karakter.'
            },

            email: {
                required: 'Email wajib diisi.',
                email: 'Masukkan format email yang benar.'
            },

            telepon: {
                required: 'Nomor telepon wajib diisi.',
                digits: 'Nomor telepon hanya boleh berisi angka.',
                minlength: 'Nomor telepon minimal 10 digit.',
                maxlength: 'Nomor telepon maksimal 13 digit.'
            },

            layananPilihan: {
                required: 'Silakan pilih layanan.'
            },

            anggaran: {
                required: 'Anggaran wajib diisi.',
                number: 'Anggaran harus berupa angka.',
                min: 'Anggaran minimal Rp100.000.'
            },

            pesan: {
                required: 'Ceritakan kebutuhan proyek.',
                minlength: 'Pesan minimal 10 karakter.'
            }
        },

        // MENAMPILKAN PESAN ERROR DI BAWAH INPUT
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },

        // MEMBERI TANDA JIKA INPUT SALAH
        highlight: function (element) {
            $(element)
                .addClass('error')
                .removeClass('valid');
        },

        // MEMBERI TANDA JIKA INPUT BENAR
        unhighlight: function (element) {
            $(element)
                .removeClass('error')
                .addClass('valid');
        },

        // DIJALANKAN JIKA SEMUA INPUT VALID
        submitHandler: function (form) {
            $('#toast')
                .removeClass('error-toast')
                .text(
                    'Terima kasih, ' + $('#nama').val() +
                    '! Formulir berhasil divalidasi. ' +
                    'Ini simulasi praktikum, data tidak dikirim ke server.'
                )
                .stop(true, true)
                .fadeIn(250)
                .delay(4000)
                .fadeOut(350);

            // Mengosongkan formulir setelah berhasil
            form.reset();

            // Menghapus tanda validasi sebelumnya
            $('#contactForm input, #contactForm select, #contactForm textarea')
                .removeClass('valid error');

            $('#contactForm label.error').remove();

            return false;
        }
    });

});