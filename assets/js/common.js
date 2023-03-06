$(document).ready(function () {
  //currency
  $(document).on("click", ".title-currency", function () {
    $(".currency").toggleClass("d-none");
    $(".languages").addClass("d-none");
    $(".colorless-overlay").css("display", "block")
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
    $(".colorless-overlay").css("display", "block")
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
  $(document).on("click", ".shopping-cart", function () {
    $(".basket-desc-area").toggleClass("d-none");
    $(".colorless-overlay").css("display", "block");
  })

  //overlays
  $(document).on("click", ".overlay", function () {
    $(".menu").removeClass("active-menu");
    $(".overlay").css("display", "none");
    $(".product-modal").addClass("d-none");
  })
  $(document).on("click", ".colorless-overlay", function () {
    $(".colorless-overlay").css("display", "none");
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
let modalArea = document.querySelector(".modal-area");
let tableBody = document.querySelector("tbody");
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

    let deleteBtns = document.querySelectorAll(".delete");
    deleteProductByDeleteIcon(deleteBtns);

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
function deleteProductByDeleteIcon(deleteBtns) {
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function () {
      for (const product of products) {
        if (product.id == deleteBtn.parentNode.parentNode.getAttribute("data-id")) {
          del(product.id);
          if(tableBody != null){
           for (const tableBodyElement of tableBody.children) {
             if(tableBodyElement.getAttribute("data-id")==deleteBtn.parentNode.parentNode.getAttribute("data-id")){
                tableBodyElement.remove();
                localStorage.clear();
              }
           }
          }
          deleteBtn.parentNode.parentNode.remove();
          getProductsCount();
          total();
          if (products.length == 0) {
            localStorage.clear();
            tableArea.classList.add("d-none");
            msg.classList.remove("d-none");
            message.classList.remove("d-none");
            subtotal.classList.add("d-none")
          }
        }
      }
    })
  })
}

function del(id) {
  debugger
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
      console.log("ddd");
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



// Validation

let inputs = document.querySelectorAll("form .inputs input");

inputs.forEach(input => {
    input.addEventListener("blur", function () {
        if (this.value == "") {
            this.style.borderBottom = "1px solid red";
            this.nextElementSibling.nextElementSibling.style.color = "red";
            this.parentNode.lastElementChild.style.opacity = "1";
        }
    })

    input.addEventListener("keyup", function () {
        if (this.value == "") {
            this.style.borderBottom = "1px solid red";
            this.parentNode.lastElementChild.style.opacity = "1";
        }

        else {
            this.style.borderBottom = "1px solid #949494";
            this.parentNode.lastElementChild.style.opacity = "0";
        }
    })

    input.addEventListener("focus", function () {
        this.nextElementSibling.nextElementSibling.style.color = "#ef6c00";
    })
})

let textarea = document.querySelector(" form .textarea textarea");

textarea.addEventListener("blur", function () {
    if (this.value == "") {
        this.style.borderBottom = "1px solid red";
        this.nextElementSibling.nextElementSibling.style.color = "red";
    }
})

textarea.addEventListener("keyup", function () {
    if (this.value == "") {
        this.style.borderBottom = "1px solid red";
    }

    else {
        this.style.borderBottom = "1px solid #949494";
    }
})

textarea.addEventListener("focus", function () {
    this.nextElementSibling.nextElementSibling.style.color = "#ef6c00";
})

let submit = document.querySelector("form button");

submit.addEventListener("click", function (event) {
    event.preventDefault();
    
    let checkValidation = false;
    let countOfEmpty = 0;

    for (const input of inputs) {
        if (input.value == "") {
            input.style.borderBottom = "1px solid red";
            input.nextElementSibling.nextElementSibling.style.color = "red";
            input.parentNode.lastElementChild.style.opacity = "1";
            input.nextElementSibling.style.setProperty("--beforeAndAfterBack", "#ef6c00");

            textarea.style.borderBottom = "1px solid red";
            textarea.nextElementSibling.nextElementSibling.style.color = "red";
            textarea.nextElementSibling.style.setProperty("--beforeAndAfterBack", "#ef6c00");

            countOfEmpty++;
        }
    }

    if (countOfEmpty == 0) {
        checkValidation = true;
    }

    if (!checkValidation) {
        return;
    }

    window.location.reload();
})
