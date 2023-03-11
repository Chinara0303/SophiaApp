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


  $(document).on("click", ".item", function () {
    let clickedFLag = $(this).children().eq(0).attr("src");
    let clickedText = $(this).children().eq(1).text();
    $(this).parent().prev().children().eq(0).attr("src", clickedFLag);
    $(this).parent().prev().children().eq(1).text(clickedText);
    $(".languages").toggleClass("d-none");
  })

  //submenu
  $(document).on("click", ".last-menu", function (e) {
    $(".sub-menu").toggleClass("d-none");
  })

  $(document).on("click", function (e) {
    if (!!!e.target.closest(".title-lang")) {
      if (!$(".languages").hasClass("d-none"))
        $(".languages").addClass("d-none")
    }
    if (!!!e.target.closest(".title-currency")) {
      if (!$(".currency").hasClass("d-none"))
        $(".currency").addClass("d-none")
    }
    if (!!!e.target.closest(".last-menu")) {
      if (!$(".sub-menu").hasClass("d-none"))
        $(".sub-menu ").addClass("d-none")
    }
    if (!!!e.target.closest(".shopping-cart")) {
      if (!$(".basket-desc-area").hasClass("d-none"))
        $(".basket-desc-area").addClass("d-none")
    }
  })
  //phone-menu
  $(document).on("click", ".open-icon", function () {
    $(".menu").addClass("active-menu");
    $(".overlay").css("display", "block")
  })

  $(document).on("click", ".close-iconn", function () {
    $(".menu").removeClass("active-menu");
    $(".overlay").css("display", "none");
  })

  //BASKET MODAL
  $(document).on("click", ".shopping-cart", function () {
    $(".basket-desc-area").toggleClass("d-none");
  })

  //overlays
  $(document).on("click", ".overlay", function () {
    $(".menu").removeClass("active-menu");
    $(".overlay").css("display", "none");
    $(".fixed-modal").addClass("d-none");
  })

  //fixed-modal
  $(document).on("click", ".fixed-modal", function () {
    $(".fixed-modal").addClass("d-none");
    $(".overlay").css("display", "none");
    $("body").css("overflow", "unset");
  })
  $(document).on("click", ".fixed-zoom-modal", function () {
    $(".fixed-zoom-modal").addClass("d-none");
    $(".overlay").css("display", "none");
    $("body").css("overflow", "unset");
  })

});

//basket 
let cardBtns = document.querySelectorAll(".info-bottom");
let message = document.querySelector(".message");
let prodCount = document.querySelector(".prod-count");
let subtotal = document.querySelector(".subtotal");
let modalArea = document.querySelector(".modal-area");
let tableBody = document.querySelector("tbody");

let tableArea = document.querySelector(".table-area");
let msg = document.querySelector(".msg");

let products = [];
if (localStorage.getItem("basket") != null) {
  products = JSON.parse(localStorage.getItem("basket"))
}

cardBtns.forEach(cardBtn => {
  cardBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let prodImg = cardBtn.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src")
    let prodName = cardBtn.parentElement.children[1].innerText;
    let prodPrice = cardBtn.previousElementSibling.children[1].lastElementChild.innerText;
    let prodId = parseInt(cardBtn.parentNode.parentNode.getAttribute("data-id"))
    let existProduct = products.find(p => p.id == prodId);
    if (existProduct != undefined) {
      existProduct.count += 1;
      existProduct.price = prodPrice * existProduct.count;

      addAlert.firstElementChild.innerText = `The ${this.parentElement.children[1].innerText} has been added to cart`
      setInterval(() => {
        addAlert.classList.add("d-none")
      }, 4000);
    }
    else {
      products.push({
        id: prodId,
        img: prodImg,
        name: prodName,
        price: prodPrice,
        count: 1
      })
    }
    localStorage.setItem("basket", JSON.stringify(products));

    addAlert.classList.remove("d-none");
    addAlert.firstElementChild.innerText = `The ${this.parentElement.children[1].innerText} has been added to cart`
    setInterval(() => {
      addAlert.classList.add("d-none")
    }, 4000);

    getProductsCount();
    getProductsInfo();
    deleteProductByDeleteIcon();

  })
})

function getProductsCount() {
  if (products != null) {
    document.querySelector(".product-count").innerText = products.length;
    prodCount.innerText = products.length;
  }

}

getProductsCount();
getProductsInfo();

function getProductsInfo() {
  document.querySelector(".products-info").innerHTML = "";
  for (const product of products) {
    message.classList.add("d-none");
    subtotal.classList.remove("d-none");
    let nativePrice = parseInt(product.price) / parseInt(product.count)
    document.querySelector(".products-info").innerHTML +=
      `
      <div class="prods" data-id=${product.id}>
          <div class="heading d-flex align-items-center justify-content-between">
            <p class="prod-name">${product.name}</p>
            <i class="fa-solid fa-trash delete"></i>
          </div>
          <div class="price-count">
            <span class="quantity">${product.count}</span>
            <span>X</span>
            <span class="price">${nativePrice}</span>
          </div>
      </div>
      
      `
    if (modalArea != null) {
      modalArea.setAttribute("data-id", product.id);

    }
    total();
    getProductsCount();

  }
}
function total() {
  let sum = 0;
  for (const product of products) {
    sum += parseInt(product.price);
  }
  document.querySelector(".subtotal-price").innerText = `$${sum}.00`;
  document.querySelector(".bottomSubtotal").innerText = `$${sum}.00`;
}

deleteProductByDeleteIcon()
function deleteProductByDeleteIcon() {
  let deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function () {
      for (const product of products) {
        if (product.id == deleteBtn.parentNode.parentNode.getAttribute("data-id")) {
          del(product.id);
          if (tableBody != null) {
            for (const tableBodyElement of tableBody.children) {
              if (tableBodyElement.getAttribute("data-id") == deleteBtn.parentNode.parentNode.getAttribute("data-id")) {
                tableBodyElement.remove();
              }
            }
          }

          deleteBtn.parentNode.parentNode.remove();
          getProductsCount();
          total();
          if (products.length == 0) {
            localStorage.removeItem("basket");

            if (tableArea != null) {
              tableArea.classList.add("d-none");
            }
            if (msg != null) {
              msg.classList.remove("d-none");
            }
            message.classList.remove("d-none");
            subtotal.classList.add("d-none")
          }
        }
      }
    })
  })
}

function del(id) {
  let existProducts = products.filter(p => p.id != id);
  products = existProducts;
  localStorage.setItem("basket", JSON.stringify(products))
}


let incrementCountBtns = document.querySelectorAll(".increment");
incrementCount();

function incrementCount() {
  for (const incrementBtn of incrementCountBtns) {
    incrementBtn.addEventListener("click", function () {
      let quantity = incrementBtn.previousElementSibling;
      for (const product of products) {
        if (product.id == this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id")) {
          let nativePrice = parseInt(product.price / product.count)
          quantity.value++;
          product.count++;
          product.price = nativePrice * product.count;
          getProductsCount();
          getProductsInfo()
        }
      }
      localStorage.setItem("basket", JSON.stringify(products))
    })
  }
}

let decrementCountBtns = document.querySelectorAll(".decrement");
decrementCount();

function decrementCount() {
  for (const decrementCountBtn of decrementCountBtns) {
    decrementCountBtn.addEventListener("click", function () {
      let quantity = decrementCountBtn.nextElementSibling;
      for (const product of products) {
        if (product.id == this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id")) {
          let nativePrice = parseInt(product.price / product.count)
          if (quantity.value == 1) {
            return
          }
          quantity.value--;
          product.count--;
          product.price = nativePrice * product.count;
          getProductsCount();
          getProductsInfo()
        }
      }
      localStorage.setItem("basket", JSON.stringify(products))
    })
  }
}


//wishlist
let wishlistBtns = document.querySelectorAll('.heart-btn');
let addAlert = document.querySelector(".add-alert")
let wishlistProds = []
if (localStorage.getItem("wishlist") != null) {
  wishlistProds = JSON.parse(localStorage.getItem("wishlist"))
}

wishlistBtns.forEach(wishlistBtn => {
  wishlistBtn.addEventListener("click", function (e) {
    e.preventDefault();

    wishlistBtn.firstElementChild.className = "fa-solid fa-heart wishlisted"

    let prodImg = wishlistBtn.parentElement.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src")
    let prodName = wishlistBtn.parentElement.nextElementSibling.children[1].innerText;
    let prodPrice = wishlistBtn.parentElement.nextElementSibling.children[2].lastElementChild.children[1].innerText;
    let prodId = parseInt(wishlistBtn.parentNode.parentNode.getAttribute("data-id"))
    let existProduct = wishlistProds.find(p => p.id == prodId);

    if (existProduct != undefined) {
      let dbWishlistProducts = wishlistProds.filter(p => p.id != existProduct.id)
      wishlistProds = dbWishlistProducts;
      wishlistBtn.firstElementChild.className = "fa-regular fa-heart";

      addAlert.classList.remove("d-none");
      addAlert.firstElementChild.innerText = `The ${this.parentElement.nextElementSibling.children[1].innerText} has been deleted from wishlist`
      setInterval(() => {
        addAlert.classList.add("d-none")
      }, 3000);

    }
    else {
      addAlert.classList.remove("d-none");
      addAlert.firstElementChild.innerText = `The ${this.parentElement.nextElementSibling.children[1].innerText} has been added to wishlist`
      setInterval(() => {
        addAlert.classList.add("d-none")
      }, 3000);

      wishlistProds.push({
        id: prodId,
        img: prodImg,
        name: prodName,
        price: prodPrice,
      })
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlistProds));


  })

})
for (const icon of wishlistBtns) {
  for (const prod of wishlistProds) {
    let dbProd = wishlistProds.find(p => p.id == prod.id);
    if (dbProd.id == icon.parentElement.parentElement.getAttribute("data-id")) {
      icon.firstElementChild.className = "fa-solid fa-heart wishlisted"
    }
  }
}



