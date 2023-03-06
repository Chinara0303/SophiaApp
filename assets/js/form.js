
// Validation

let inputs = document.querySelectorAll("form .inputs input");
let textarea = document.querySelector("form textarea");

if(inputs != null ){

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
    
}

if(textarea != null){
    
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
}