$(document).ready(function () {



    let productDetailsInfo = JSON.parse(localStorage.getItem("productDetail"))
    let basket = []
    if (productDetailsInfo != null) {
        for (const product of productDetailsInfo) {
            $("#detail-intro .left-side .img img").attr("src", product.img)
            $("#detail-intro .left-side .slider-area .box").children().eq(0).attr("src", product.img)
            $("#detail-intro .left-side  .information h2").text(product.name)
            $("#detail-intro .left-side  .information .prices del").text(`$${product.nativePrice}`)
            $("#detail-intro .left-side  .information .prices .native-price span").text(`$${product.discountPrice}`)
            $(".prod-name").text(`${product.name}`)
        }
    }
    basket = JSON.parse(localStorage.getItem("basket"));
    if (basket != null) {
        if (productDetailsInfo != null) {
            for (const product of productDetailsInfo) {
                for (const prod of basket) {
                    if (prod.img == product.img) {
                        $("#detail-intro .left-side  .information .bottom input").val(`${prod.count}`)
                    }

                }
            }
        }

    }

    $(document).on("click", ".zoom", function () {
        $(".fixed-modal").css("display", "block");
        $(".fixed-modal").removeClass("d-none");
        $(".overlay").css("display", "block");
        $("body").css("overflow", "hidden");
        for (const product of productDetailsInfo) {
            $(".zoom-modal-area").children().eq(0).attr("src", product.img)
        }
    })
    
    $('.slider-area').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
})