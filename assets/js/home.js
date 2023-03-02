$(document).ready(function () {
    //currency
    $(document).on("click", ".title-currency", function () {
        $(".currency").toggleClass("d-none");
        // $(".languages").toggleClass("d-none");
    })

    $(".eur-btn").click(function () {
        let text = $(this).children().eq(0).text();
        $(this).parent().prev().children().eq(0).text(text);
        $(".currency").addClass("d-none")
    })
    $(".usd-btn").click(function () {
        let text = $(this).children().eq(0).text();
        $(this).parent().prev().children().eq(0).text(text);
        $(".currency").addClass("d-none")
    })

    //language
    $(document).on("click", ".title-lang", function () {
        $(".languages").toggleClass("d-none");
        // $(".currency").toggleClass("d-none");
    })
    $(document).on("click", "main", function () {
        if (!$(".sub-menu").hasClass("d-none")) {
            $(".sub-menu").addClass("d-none")
        }
        // $(".currency").toggleClass("d-none");
    })

    $(document).on("click", ".item", function () {
        let clickedFLag = $(this).children().eq(0).attr("src");
        let clickedText = $(this).children().eq(1).text();
        $(this).parent().prev().children().eq(0).attr("src", clickedFLag);
        $(this).parent().prev().children().eq(1).text(clickedText);
        $(".languages").toggleClass("d-none");
    })

    //submenu
    $(document).on("click", ".last-menu", function (e) {
        e.preventDefault();
        $(".sub-menu").toggleClass("d-none")
    })

    //phone-menu
    $(document).on("click", ".open-icon", function () {
        $(".menu").addClass("active-menu");
        $(".overlay").css("display", "block")
    })
    $(document).on("click", ".close-icon", function () {
        $(".menu").removeClass("active-menu");
        $(".overlay").css("display", "none");
    })
    $(document).on("click", ".overlay", function () {
        $(".menu").removeClass("active-menu");
        $(".overlay").css("display", "none");
    })
    //slider

    $('.slider-intro').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
});
