import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'

generateCookie("user", userObj)

const cartInfo = getUserDataFromCookie("user");
const carted = cartInfo.carted
let currObj = []

//Getting Data on Carted Items
if (carted.length == 0) {
    console.log("you have no items in your cart")
} else {
    fetch('http://localhost:3000/cart', {method: "POST", headers: {
        "Content-Type": "application/json"}, body: JSON.stringify(cartInfo)})
        .then(response => response.json())
        // .then(console.log)
        .then(object => {
            currObj = object
            displayCart(tbody, object)
        })
        .then(() => fillValues())

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
    const pr2 = document.createElement("p")
    const value2 = quantity[i]
    pr2.textContent = value2
    quant.appendChild(pr2)

    row.appendChild(remove);
    row.appendChild(image);
    row.appendChild(description);
    row.appendChild(price);
    row.appendChild(quant);

    icon.addEventListener('click', () => {
        removeItem(element)
        row.textContent = ""
    })
}

//Remove Button
function removeItem(object){
    let currData = getUserDataFromCookie("user")
    let userCart = currData.carted
    let amount = currData.quantity
    let i = userCart.indexOf(object.img_id)
    userCart.splice(i, 1)
    amount.splice(i, 1)
    updateUserDataInCookie("user", currData)
    fillValues()
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
    const taxAmount = sum * 0.15
    const totalValue = sum + ship + taxAmount
    let disc = 0

    if (discountEnabled) {
        disc = totalValue
    }
    console.log(totalValue)

    const finalValue = sum + ship + taxAmount - disc;

    total.textContent = `$${sum}`;
    shipping.textContent = `$${ship}`;;
    tax.textContent = `$${taxAmount}`;
    discount.textContent = `$${disc}`;
    total1.textContent = `$${totalValue}`;
    final.textContent = `$${finalValue}`;
}

function getTotal(table){
    let total = 0
    for (var i = 0; i < table.rows.length; i++){
        console.log(table.rows[i].cells[3].textContent)
        total += parseFloat(table.rows[i].cells[3].textContent)
        console.log(total)
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
