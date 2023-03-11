
let wishlistProducts = JSON.parse(localStorage.getItem("wishlist"));
msg = document.querySelector(".msg");
let wishlistTableArea = document.querySelector(".table-area");
let table = document.querySelector(".table");
let tBody = document.querySelector(".table tbody");
let clearAllBtn = document.querySelector(".table th button");

if (wishlistProducts != null) {
    for (const product of wishlistProducts) {
        msg.classList.add("d-none");
        wishlistTableArea.classList.remove("d-none");
        tBody.innerHTML +=
            `
        <tr data-id="${product.id}">
            <td><div class="img"><img src="${product.img}" alt=""></div></td>
            <td><p class="name">${product.name}</p></td>
            <td><p class="price">$${product.price}</p></td> 
            <td><i class="fa-solid fa-xmark delete"></i></td>
         </tr>
        `
    }
}
if (clearAllBtn != null) {
    clearAllBtn.addEventListener("click", function () {
        localStorage.removeItem("wishlist");
        wishlistTableArea.classList.add("d-none");
        msg.classList.remove("d-none");
    })
}


function deleteItem(id) {
    let dbProducts = wishlistProducts.filter(p => p.id != id);
    wishlistProducts = dbProducts;
    localStorage.setItem("wishlist", JSON.stringify(wishlistProducts))
}
deleteItemsByDelIcon()
function deleteItemsByDelIcon() {
    let delIcons = document.querySelectorAll(".delete");
    for (const delIcon of delIcons) {
        delIcon.addEventListener("click", function () {
            for (const product of wishlistProducts) {
                if (product.id == delIcon.parentElement.parentElement.getAttribute("data-id")) {
                    deleteItem(product.id);
                    delIcon.parentElement.parentElement.remove();
                    if (wishlistProducts.length == 0) {
                        localStorage.removeItem("wishlist");
                        wishlistTableArea.classList.add("d-none");
                        msg.classList.remove("d-none");
                    }
                }
            }
        })
    }
}
