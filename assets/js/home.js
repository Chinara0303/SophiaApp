$(document).ready(function () {
  //currency
  $(document).on("click", ".title-currency", function () {
    $(".currency").toggleClass("d-none");
    $(".languages").addClass("d-none");
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
    $(".currency").addClass("d-none");
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
    $(".product-modal").addClass("d-none");
  })

  //slider intro

  $('.slider-intro').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  });

  //products slider
  $('.cards').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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

  //modal
  $(document).on("click", ".eye-btn", function (e) {
    e.preventDefault()
    $(".product-modal").removeClass("d-none");
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
    $(".product-modal").addClass("d-none");
    $(".overlay").css("display", "none");
  })

});

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
