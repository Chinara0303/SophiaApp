$(document).ready(function () {
    //currency
    $(document).on("click", ".title-currency", function () {
      $(".currency").toggleClass("d-none");
      $(".languages").addClass("d-none");
      $(".colorless-overlay").css("display","block")
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
      $(".colorless-overlay").css("display","block")
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
      $(".sub-menu").toggleClass("d-none");
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
 
  
  //BASKET MODAL
  $(document).on("click",".shopping-cart",function(){
    $(".basket-desc-area").toggleClass("d-none");
    $(".colorless-overlay").css("display","block");
  })
  
    //overlays
    $(document).on("click", ".overlay", function () {
      $(".menu").removeClass("active-menu");
      $(".overlay").css("display", "none");
      $(".product-modal").addClass("d-none");
    })
    $(document).on("click", ".colorless-overlay", function () {
      $(".colorless-overlay").css("display","none");
      $(".currency").addClass("d-none");
      $(".languages").addClass("d-none");
      $(".basket-desc-area").addClass("d-none");
    })
  
   
  
  });


//basket 
let cardBtns = document.querySelectorAll(".info-bottom");
let message = document.querySelector(".message");
let prodCount = document.querySelector(".prod-count");
let subtotal = document.querySelector(".subtotal");
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
      existProduct.price = prodPrice * existProduct.count
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
    getProductsCount();
    getProductsInfo();
   
  })

})

function getProductsCount() {
  document.querySelector(".product-count").innerText = products.length;
  prodCount.innerText = products.length;
}

getProductsCount();
getProductsInfo();

function getProductsInfo() {

  document.querySelector(".products-info").innerHTML = " ";
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

let deleteBtns = document.querySelectorAll(".delete");

function del(id) {
  let existProducts = products.filter(p => p.id != id);
  products = existProducts;
  localStorage.setItem("basket", JSON.stringify(products))
}

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener("click", function () {
    for (const product of products) {
      if (product.id == deleteBtn.parentNode.parentNode.getAttribute("data-id")) {
        del(product.id);
        deleteBtn.parentNode.parentNode.remove();
        getProductsCount();
        total();
        if (products.length == 0) {
          message.classList.remove("d-none");
          subtotal.classList.add("d-none")
        }
      }
    }
  })

})

  