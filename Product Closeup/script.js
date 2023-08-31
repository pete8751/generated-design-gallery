import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'
generateCookie("user", userObj)


const currData = getUserDataFromCookie("user")
const obj = {imgid: currData.clicked}
const currId = obj.imgid
console.log(currId)


fetch('http://localhost:3000/Product%20Closeup/Item.html', {method: "POST", headers: {
    "Content-Type": "application/json"},
    body: JSON.stringify(obj)
})
// .then(array => displayImages(gallerycontainer, array))
.then(response => response.json())
.then(data => {productDisplay(data)})

const bigContainer = document.getElementById("big")
const small1 = document.getElementById("1")
const small2 = document.getElementById("2")
const small3 = document.getElementById("3")

const bundlebtn = document.querySelector(".bundle-btn")

function productDisplay(response) {
    console.log(response.length)
    if (response.length > 1) {
        initializeBundleBtn(response)

        let i = 0
        response.forEach(element => {
            console.log(element)
            if (i == 0 ){
                bigContainer['src'] = element.url
            } else {
                let small = document.getElementById(`${i}`)
                console.log(small)
                small['src'] = element.url
                small.addEventListener('click', () => swapBig(small))
            }
            i++
        });
    } else {
        bigContainer['src'] = response.url
        bundlebtn.classList.toggle("hide")
        const bundle = document.querySelector(".bundle")
        bundle.textContent = ""
    }
}

// small1.addEventListener('click', () =>{
//     swapBig(small1)
// })

// small2.addEventListener('click', () =>{
//     swapBig(small2)
// })

// small3.addEventListener('click', () =>{
//     swapBig(small3)
// })

//swap
function swapBig(element) {
    let bigUrl = bigContainer['src']
    let smallUrl = element['src']

    bigContainer['src'] = smallUrl
    element["src"] = bigUrl
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