import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'

generateCookie("user", userObj)

const cartInfo = getUserDataFromCookie("user");
console.log(cartInfo)
const carted = cartInfo.carted

//Getting Data on Carted Items
if (carted.length == 0) {
    console.log("you have no items in your cart")
} else {
    fetch('https://generateddesignserver-8c11c23883ae.herokuapp.com/cart', {method: "POST", headers: {
        "Content-Type": "application/json"}, body: JSON.stringify(cartInfo)})
        .then(response => response.json())
        .then(object => {
            // currObj = object
            // console.log(currObj)
            displayCart(tbody, object)
            fillValues()
        })
}

//Displaying Cart
const tbody = document.querySelector(".inventory")
const quantity = cartInfo.quantity

function displayCart(tableBody, array) {
    tableBody.textContent = '';
    let i = 0;
    console.log(array)

    array.forEach(element => {
    const newrow = document.createElement("tr")
    
    enterData(newrow, element, i)

    tableBody.appendChild(newrow)
    i++
});
}

function enterData(row, element, i) {
    const remove = document.createElement("td")
    const icon = document.createElement("icon")
    icon.classList.add("fa-solid", "fa-square-minus", "cap")
    remove.appendChild(icon)

    const image = document.createElement("td")
    const url = element.url
    const img = document.createElement("img")
    img['src'] = url
    image.appendChild(img)

    const description = document.createElement("td")
    const pr0 = document.createElement("p")
    const value0 = element.img_name
    pr0.textContent = value0
    description.appendChild(pr0)

    const price = document.createElement("td")
    const pr1 = document.createElement("p")
    const value1 = element.price
    pr1.textContent = value1
    price.appendChild(pr1)

    const quant = document.createElement("td")
    const input = addQuant(i)
    quant.appendChild(input)

    row.appendChild(remove);
    row.appendChild(image);
    row.appendChild(description);
    row.appendChild(price);
    row.appendChild(quant);

    icon.addEventListener('click', () => {
        removeItem(element)
    })
}

function addQuant(index){
    let input = document.createElement("input")
    input['type'] = "number"
    input.value = quantity[index]
    input['min'] = 1
    // ToDo: add method to ensure that whenever user inputs value below min, it is automatically reset to previous value
    input.addEventListener("input", () => {
        let currData = getUserDataFromCookie("user");
        quantity[index] = input.value;
        updateUserDataInCookie(currData);
        fillValues()
    })
    return input
}

//Remove Button
function removeItem(object){
    let currData = getUserDataFromCookie("user");
    let userCart = currData.carted;
    let amount = currData.quantity;
    let i = userCart.indexOf(object.img_id);
    userCart.splice(i, 1);
    amount.splice(i, 1);
    updateUserDataInCookie("user", currData);
    tbody.deleteRow(i);
    fillValues();
}

//Discount
let discountEnabled = false
const coupon = document.querySelector(".code")
const apply = document.querySelector(".apply")

apply.addEventListener('click', () => {
    if (coupon.value == "FREE100") {
        discountEnabled = true
        fillValues()
    }
})

//Transaction Menu

function fillValues() {
    const total = document.getElementById("sum");
    const shipping = document.getElementById("shipping");
    const tax = document.getElementById("tax");
    const discount = document.getElementById("discount");
    const total1 = document.getElementById("total");

    const sum = getTotal(tbody);
    console.log(sum)
    const ship = 10;
    const taxAmount = sum * 0.15;
    const totalValue = sum + ship + taxAmount
    let disc = 0

    if (discountEnabled) {
        disc = totalValue
    }
    console.log(totalValue)

    const finalValue = sum + ship + taxAmount - disc;

    total.textContent = `$${sum.toFixed(2)}`;
    shipping.textContent = `$${ship.toFixed(2)}`;;
    tax.textContent = `$${taxAmount.toFixed(2)}`;
    discount.textContent = `$${disc.toFixed(2)}`;
    total1.textContent = `$${totalValue.toFixed(2)}`;
    final.textContent = `$${finalValue.toFixed(2)}`;
}

function getTotal(table){
    let total = 0
    console.log(table.rows.length);
    for (var i = 0; i < table.rows.length; i++){
        // console.log(table.rows[i].cells[3].firstElementChild.value)
        total += parseFloat(table.rows[i].cells[3].textContent) * quantity[i]
    }
    return total
}


// function calculateTotal(obj, quantities) {
//     let total = 0;
//     console.log(obj.length)
//     for (let i = 0; i < obj.length; i++) {
//       total += obj[i].price * quantities[i];
//     }
//     console.log(total)
//     return total;
//   }
