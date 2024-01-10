import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'
generateCookie("user", userObj)


const currData = getUserDataFromCookie("user")
const obj = {imgid: currData.clicked}
const currId = obj.imgid
console.log(currId)


fetch('https://generateddesignserver-8c11c23883ae.herokuapp.com/item', {method: "POST", mode: 'cors', headers: {
    "Content-Type": "application/json"},
    body: JSON.stringify(obj)
})
// .then(array => displayImages(gallerycontainer, array))
.then(response => response.json())
.then(data => {productDisplay(data)})

const bigContainer = document.getElementById("big")
const bundlebtn = document.querySelector(".bundle-btn")
const bundle = document.querySelector(".bundle")

function productDisplay(response) {
    console.log(response.length)
    bundle.textContent = ""
    if (response.length > 1) {
        initializeBundleBtn(response)

        let i = 0
        response.forEach(object => {
            console.log(object)
            if (i == 0 ){
                bigContainer['src'] = object.url
                updateDetails(object)
            } else {
                // let small = document.getElementById(`${i}`)
                let smallcontainer = document.createElement('div');
                smallcontainer.classList.add('small')
                let small = document.createElement('img')
                // console.log(small)
                small['src'] = object.url

                let swapBig1 = (element) => swapBig(element, object)
                small.addEventListener('click', () => swapBig1(small))

                smallcontainer.appendChild(small)
                bundle.appendChild(smallcontainer)
            }
            i++
        });
    } else {
        bigContainer['src'] = response.url
        bundlebtn.classList.toggle("hide")
        updateDetails(response)
    }
}


//swap
function swapBig(element, object) {
    let bigUrl = bigContainer['src']
    let smallUrl = element['src']

    bigContainer['src'] = smallUrl;
    element["src"] = bigUrl;
    updateDetails(object);
}

//Listing Details
const small1 = document.getElementById("1")
const pricetext = document.getElementById("product-price")
const name = document.getElementById("product-name")

function updateDetails(object){
    name.textContent = object.img_name
    pricetext.textContent = "$" + object.price
    console.log(object)
}

//Buy Buttons
const buybtn = document.querySelector(".buy-btn")
const quantSelect = document.querySelector(".quantity")

function initializeBundleBtn(array) {
    bundlebtn.addEventListener('click', () => {
        let currData = getUserDataFromCookie("user");
        const carted = currData.carted
        const quantity = currData.quantity
        
        array.forEach(element => {
            let imgId = element.imgid
            if (carted.includes(imgId)) {
                const i = carted.indexOf(imgId)
                quantity[i]++
            } else {
                carted.push(imgId)
                quantity.push(1)
            }
        })

        currData.carted = carted
        currData.quantity = quantity
        updateUserDataInCookie("user", currData)
        console.log(getUserDataFromCookie("user"))
    })
}

buybtn.addEventListener('click', () => {
    let currData = getUserDataFromCookie("user");
    const carted = currData.carted
    const quantity = currData.quantity

    const numItems = quantSelect.value

    if (carted.includes(currId)) {
        const i = carted.indexOf(currId)
        quantity[i] = quantity[i] + numItems
    } else {
        carted.push(currId)
        quantity.push(numItems)
    }

    currData.carted = carted
    currData.quantity = quantity
    updateUserDataInCookie("user", currData)
    console.log(getUserDataFromCookie("user"))
})