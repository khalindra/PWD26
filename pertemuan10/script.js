$(document).ready(function () {

    // 1. MENU HP: slideToggle()
    $("#menu-toggle").on("click", function () {
        $("#nav-links").stop(true, true).slideToggle(250);

        const isOpen = $(this).attr("aria-expanded") !== "true";

        $(this)
            .attr("aria-expanded", isOpen)
            .text(isOpen ? "×" : "☰");
    });

    // 2. NAVIGASI: bergeser ke bagian yang dipilih
    $(".nav-link, .footer-links a, .logo, .footer-logo, .btn-pink, .btn-small")
        .on("click", function (event) {
            const target = $(this).attr("href");

            if (target && target.startsWith("#")) {
                const section = $(target);

                if (section.length) {
                    event.preventDefault();

                    $("html, body").stop().animate({
                        scrollTop: section.offset().top - 68
                    }, 550);

                    // Tandai menu yang dipilih
                    if ($(this).hasClass("nav-link")) {
                        $(".nav-link").removeClass("active");
                        $(this).addClass("active");
                    }

                    // Tutup menu setelah memilih di HP
                    if ($(window).width() <= 850 &&
                        $(this).hasClass("nav-link")) {
                        $("#nav-links").stop(true, true).slideUp(200);
                        $("#menu-toggle")
                            .attr("aria-expanded", "false")
                            .text("☰");
                    }
                }
            }
        });

    // 3. TAB JADWAL: fadeOut() dan fadeIn()
    const routineData = {
        pagi: {
            symbol: "☼",
            title: "01 / Pagi",
            description:
                "Bersihkan wajah, gunakan pelembap, dan akhiri dengan sunscreen."
        },
        siang: {
            symbol: "☁",
            title: "02 / Siang",
            description:
                "Jaga kelembapan kulit dan gunakan kembali sunscreen sesuai kebutuhan."
        },
        malam: {
            symbol: "☾",
            title: "03 / Malam",
            description:
                "Bersihkan wajah, gunakan serum, lalu akhiri dengan pelembap."
        }
    };

    $(".tab").on("click", function () {
        const selectedTab = $(this).data("tab");
        const data = routineData[selectedTab];

        if (!data) return;

        $(".tab")
            .removeClass("active")
            .attr("aria-selected", "false");

        $(this)
            .addClass("active")
            .attr("aria-selected", "true");

        $(".routine-card").stop(true, true).fadeOut(180, function () {
            $("#routine-symbol").text(data.symbol);
            $("#routine-title").text(data.title);
            $("#routine-description").text(data.description);

            $(".routine-card").fadeIn(300);
        });
    });

    // 4. ANIMASI KARTU PRODUK: animate()
    $(".product-card").css({
        opacity: 0,
        position: "relative",
        top: "15px"
    });

    let productsAnimated = false;

    function animateProducts() {
        if (productsAnimated) return;

        productsAnimated = true;

        $(".product-card").each(function (index) {
            $(this).delay(index * 150).animate({
                opacity: 1,
                top: "0px"
            }, 450);
        });
    }

    function checkProducts() {
        const productSection = $("#produk");

        if (!productSection.length) return;

        const sectionTop = productSection.offset().top;
        const visibleBottom = $(window).scrollTop() + $(window).height();

        if (visibleBottom > sectionTop + 50) {
            animateProducts();
        }
    }

    $(window).on("scroll", checkProducts);
    checkProducts();

    // 5. TOMBOL KEMBALI KE ATAS: fadeIn(), fadeOut(), animate()
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 250) {
            $("#back-to-top").stop(true, true).fadeIn(250);
        } else {
            $("#back-to-top").stop(true, true).fadeOut(250);
        }
    });

    $("#back-to-top").on("click", function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 650);
    });

    // 6. TAMPILKAN DAN SEMBUNYIKAN PASSWORD
    $(".toggle-password").on("click", function () {
        const targetId = $(this).data("target");
        const input = $("#" + targetId);
        const showPassword = input.attr("type") === "password";

        input.attr("type", showPassword ? "text" : "password");

        $(this)
            .text(showPassword ? "⊘" : "◉")
            .attr(
                "aria-label",
                showPassword ? "Sembunyikan password" : "Tampilkan password"
            );
    });

    // 7. ATURAN VALIDASI NOMOR HP
    $.validator.addMethod("nomorHP", function (value, element) {
        return this.optional(element) || /^08[0-9]{8,11}$/.test(value);
    }, "Nomor HP harus diawali 08 dan terdiri dari 10–13 angka.");

    // 8. ATURAN VALIDASI PASSWORD
    $.validator.addMethod("passwordKuat", function (value, element) {
        return this.optional(element) ||
            /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(value);
    }, "Password minimal 8 karakter, mengandung huruf dan angka.");

    // 9. VALIDASI FORM DENGAN JQUERY VALIDATION PLUGIN
    $("#register-form").validate({
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
                nomorHP: true
            },
            usia: {
                required: true,
                digits: true,
                min: 17
            },
            jenis_kulit: {
                required: true
            },
            password: {
                required: true,
                passwordKuat: true
            },
            konfirmasi: {
                required: true,
                equalTo: "#password"
            },
            persetujuan: {
                required: true
            }
        },

        messages: {
            nama: {
                required: "Nama lengkap wajib diisi.",
                minlength: "Nama minimal 3 karakter."
            },
            email: {
                required: "Email wajib diisi.",
                email: "Masukkan alamat email yang valid."
            },
            telepon: {
                required: "Nomor HP wajib diisi."
            },
            usia: {
                required: "Usia wajib diisi.",
                digits: "Usia harus berupa angka.",
                min: "Usia minimal 17 tahun."
            },
            jenis_kulit: {
                required: "Silakan pilih jenis kulit."
            },
            password: {
                required: "Password wajib diisi."
            },
            konfirmasi: {
                required: "Konfirmasi password wajib diisi.",
                equalTo: "Konfirmasi password tidak sama."
            },
            persetujuan: {
                required: "Kamu harus menyetujui ketentuan."
            }
        },

        errorElement: "span",
        errorClass: "error",

        errorPlacement: function (error, element) {
            if (element.attr("name") === "persetujuan") {
                error.insertAfter(element.closest(".checkbox-label"));
            } else if (element.closest(".password-wrap").length) {
                error.insertAfter(element.closest(".password-wrap"));
            } else {
                error.insertAfter(element);
            }
        },

        submitHandler: function (form) {
            // 10. PESAN BERHASIL: slideDown()
            $("#form-message")
                .stop(true, true)
                .text(
                    "✓ Pendaftaran berhasil! Terima kasih telah bergabung dengan Glow & Bloom."
                )
                .slideDown(350);

            form.reset();

            // Kembalikan ikon password ke tampilan awal
            $(".toggle-password")
                .text("◉")
                .attr("aria-label", "Tampilkan password");

            // Bersihkan tanda validasi setelah form direset
            $(form).validate().resetForm();
            $(form).find(".error").removeClass("error");

            setTimeout(function () {
                $("#form-message").slideUp(300);
            }, 5000);

            // Simulasi pendaftaran, belum menyimpan ke database
            return false;
        }
    });

});