$(document).ready(function () {
    //currency
    $(document).on("click",".title-currency", function () {
        $(".currency").toggleClass("d-none");
    //   $(document).on("click",".title-lang",function () {
    //         $(".currency").toggleClass("d-none");
    //     })
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
    // $("body").click(function () {
    //     console.log(!$(".currency").hasClass("d-none"));
    //     if (!$(".currency").hasClass("d-none")) {
    //         $(".currency").addClass("d-none")
    //     }
    // })

    //language
    $(document).on("click",".title-lang",function () {
        $(".languages").toggleClass("d-none");
        // $(document).on("click",".title-currency", function () {
        //     $(".languages").toggleClass("d-none")
        // })
    })

    $(document).on("click",".item",function(){
       let clickedFLag = $(this).children().eq(0).attr("src");
       let clickedText = $(this).children().eq(1).text();
       $(this).parent().prev().children().eq(0).attr("src",clickedFLag);
       $(this).parent().prev().children().eq(1).text(clickedText);
       $(".languages").toggleClass("d-none");
    })

})