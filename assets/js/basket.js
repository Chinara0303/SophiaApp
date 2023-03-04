
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let tableArea = document.querySelector(".table-area");
let msg = document.querySelector(".msg");

let dbProducts = JSON.parse(localStorage.getItem("basket"));
if (dbProducts != null) {
    for (const product of dbProducts) {
        tableArea.classList.remove("d-none");
        msg.classList.add("d-none");
        tbody.innerHTML +=
            `
        <tr data-id="${product.id}">
            <td><div class="img"><img src="${product.img}" alt=""></div></td>
            <td><p class="name">${product.name}</p></td>
            <td><p class="price">${product.price}</p></td> 
            <td>
                <div class="bottom d-flex align-items-center justify-content-center">
                    <div class="bottom-left">
                        <button class="decrement"><i class="fa-solid fa-minus  "></i></button>
                        <input type="number"  value = ${product.count}>
                        <button class="increment"><i class="fa-solid fa-plus "></i></button>
                    </div>
                </div>
            </td>
            <td><span class="subtotal-price">${product.price}</span></td>
            <td><i class="fa-solid fa-xmark delete"></i></td>
       </tr>
        `
    }
}
else {
    tableArea.classList.add("d-none");
    msg.classList.remove("d-none")
}

grandTotal()
function grandTotal() {
    let sum = 0;
    if (dbProducts != null) {
        for (const product of dbProducts) {
            sum += parseInt(product.price);
        }
        document.querySelector(".total-price").innerText = `GRAND TOTAL: $${sum}.00`;
        document.querySelector(".bottomSubtotal").innerText = `$${sum}.00`;
    }

}
function deleteItem(id) {
    let existPorducts = dbProducts.filter(p => p.id != id);
    dbProducts = existPorducts;
    localStorage.setItem("basket", JSON.stringify(dbProducts))
}

let delBtns = document.querySelectorAll(".delete");
delBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function () {
        for (const product of dbProducts) {
            if (product.id == deleteBtn.parentNode.parentNode.getAttribute("data-id")) {
                deleteItem(product.id);
                deleteBtn.parentNode.parentNode.remove();

                if (dbProducts.length == 0) {
                    localStorage.clear()
                    tableArea.classList.add("d-none");
                    msg.classList.remove("d-none");
                }
                getProductsCount();
                grandTotal();
            }
        }
    })

})
let decrementBtns = document.querySelectorAll(".decrement")
decrement()

function decrement() {
    for (const decrementBtn of decrementBtns) {
        
        decrementBtn.addEventListener("click",function(){
            let quantity = this.nextElementSibling;
            for (const product of dbProducts) {
                if(product.id == this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id")){
                    if (quantity.value == 1) {
                        return;
                    }
                    quantity.value--;
                    product.count--;
                }
            }
            localStorage.setItem("basket",JSON.stringify(dbProducts))
        })
    }
}
