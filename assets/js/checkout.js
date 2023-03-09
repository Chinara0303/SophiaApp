
let dbproducts = JSON.parse(localStorage.getItem("basket"));
let mesagge = document.querySelector(".ul .mesagge")
let ul = document.querySelector(".ul");

if (dbproducts != null) {
    for (const product of dbproducts) {
        mesagge.classList.add("d-none")
        document.querySelector(".ul").innerHTML +=
            `
        <li data-id=${product.id}>
           ${product.name} × ${product.count} 
            <span> $${product.price} </span>
        </li>
        `
    }
}

grandTotal()
function grandTotal() {
    let sum = 0;
    if (dbproducts != null) {
        for (const product of dbproducts) {
            sum += parseInt(product.price);
        }
        let totals = document.querySelectorAll(".total");
        for (const  total of totals) {
            total.children[0].children[0].innerText = ` $${sum}.00 `;
        }
    }
}