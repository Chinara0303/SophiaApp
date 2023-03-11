$(document).ready(function () {

  let productDetailsInfo = JSON.parse(localStorage.getItem("productDetail"))
  let basket = JSON.parse(localStorage.getItem("basket"));

  if (productDetailsInfo != null) {
    for (const product of productDetailsInfo) {
      $("#detail-intro .left-side .img img").attr("src", product.img)
      $("#detail-intro .left-side .slider-area .box").children().eq(0).attr("src", product.img)
      $("#detail-intro .left-side  .information h2").text(product.name)
      $("#detail-intro .left-side  .information .prices del").text(`$${product.nativePrice}`)
      $("#detail-intro .left-side  .information .prices .native-price span").text(`$${product.discountPrice}`)
      $(".prod-name").text(`${product.name}`)
      if (basket != null) {
        for (const prod of basket) {
          if (prod.img == product.img) {
            $("#detail-intro .left-side  .information .bottom input").val(`${prod.count}`)
          }
        }
      }
    }
  }
  $(document).on("click", ".slider-area .box img", function () {
    $("#detail-intro .left-side .img img").attr("src", $(this).attr("src"))
  })

  $(document).on("click", ".zoom", function () {
    $(".fixed-zoom-modal").css("display", "block");
    $(".fixed-zoom-modal").removeClass("d-none");
    $(".overlay").css("display", "block");
    $("body").css("overflow", "hidden");
    for (const product of productDetailsInfo) {
      $(".zoom-modal-area").children().eq(0).attr("src", product.img)
    }
  })
  //products slider
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
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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
  $('.cards').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });


  //modal
  $(document).on("click", ".eye-btn", function (e) {
    e.preventDefault()
    $(".product-modal").removeClass("d-none");
    $(".fixed-modal").removeClass("d-none");
    $("body").css("overflow", "hidden");
    $(".fixed-modal").css("display", "block");
    $(".overlay").css("display", "block");

    let img = $(this).parent().prev().children().eq(0).children().eq(0).attr("src");
    $(".img").children().eq(0).attr("src", img);

    let title = $(this).parent().next().children().eq(1).text()
    $(".information").children().eq(0).text(title);

    let price = $(this).parent().next().children().eq(2).children().eq(1).children().eq(1).text();
    $(".discount").children().eq(0).text(`$${price}`);

    let discountPrice = parseInt(price) / 2;
    $(".native-price").children().eq(0).text(`$${discountPrice}`)
  })

  $(document).on("click", ".close-icon", function () {
    $(".product-modal").removeClass("d-none");
    $("body").css("overflow", "unset");
    $(".fixed-modal").css("display", "none");
    $(".fixed-zoom-modal").css("display", "none");
    $(".overlay").css("display", "none");
  })
});

$(document).on("click", ".img-area a", function () {
  let productDetailsInfo = []
  let prodImg = $(this).children().eq(0).attr("src");
  let prodName = $(this).parent().next().next().children().eq(1).text()
  let prodPrice = $(this).parent().next().next().children().eq(2).children().eq(1).children().eq(1).text();
  let prodDiscountPrice = parseInt(prodPrice) / 2;
  productDetailsInfo.push({
    img: prodImg,
    name: prodName,
    nativePrice: prodPrice,
    discountPrice: prodDiscountPrice
  })

  localStorage.setItem("productDetail", JSON.stringify(productDetailsInfo))
})





//tab menu
const tabLink = document.querySelectorAll(".tab-menu-link");
const tabContent = document.querySelectorAll(".tab-bar-content");

tabLink.forEach((item) => {
  item.addEventListener("click", activeTab);
});

function activeTab(item) {
  const btnTarget = item.currentTarget;
  const content = btnTarget.dataset.content;

  tabContent.forEach((item) => {
    item.classList.remove("is-active");
  });

  tabLink.forEach((item) => {
    item.classList.remove("is-active");
  });
  document.querySelector("#" + content).classList.add("is-active");
  btnTarget.classList.add("is-active");
}
