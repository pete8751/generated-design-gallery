//Cookie
import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'
generateCookie("user", userObj)
// console.log(userObj)

let currData = getUserDataFromCookie("user")
console.log(currData)

//Loading Gallery
let gallerycontainer = document.querySelector(".grid-wrapper");
let container = document.querySelector(".items")

if (currData.likes.length == 0){
  container.textContent = "Go like some photos!"
} else {
  fetch('https://onlinegenerateddesignserver.onrender.com/likes', {method: "POST", headers: {
    "Content-Type": "application/json"},
    body: JSON.stringify(currData)})
    .then(response => response.json())
    .then(data => {displayImages(gallerycontainer, data)})
  }

    // .then(console.log(imgtable))
    // .then(Displayimages(gallerycontainer, imgtable))


// const len = imgtable.length;

function displayImages(container, array) {
    container.textContent = '';

    array.forEach(element => {
      console.log(element.img_name)
      const newlisting = document.createElement("div")
      newlisting.classList.add("box", "zone")
      
      const imgContain = createLink(element)

      container.appendChild(imgContain)

      const url = element.url
      const img = document.createElement("img")
      img['src'] = url

      imgContain.appendChild(img)
      newlisting.appendChild(imgContain)
      // displayCaption(element, newlisting)

      container.appendChild(newlisting)
});
}

function createLink(element) {
  const link = document.createElement("a")
  link['href'] = "../Product Closeup/Item.html"
  link['id'] = element.imgid
  link.classList.add("image-container")

  link.addEventListener('click', () => {
    let currData = getUserDataFromCookie("user")
    currData.clicked = element.imgid
    updateUserDataInCookie("user", currData)
  })

  return link
}

function displayCaption(element, listing) {
    const caption = document.createElement("div")
    caption.classList.add("caption")
    const details = document.createElement("div")
    details.classList.add("details")

    const title = document.createElement("p")
    title.classList.add("title")
    const size = document.createElement("p")
    size.classList.add("size")
    const price = document.createElement("p")
    price.classList.add("price")

    insertDetails(element, title, size, price)

    details.appendChild(title)
    details.appendChild(size)
    details.appendChild(price)

    const interact = createInteract(element)

    caption.appendChild(details)
    caption.appendChild(interact)

    listing.append(caption)
}

function insertDetails(element, title, size, price) {
    title.textContent = element.img_name;
    // console.log(element.img_name)
    size.textContent = String(element.height) + " x " + String(element.width);
    price.textContent = "$" + String(element.price);
}


function createInteract(element) {
    const interact = document.createElement("div");
    interact.classList.add("interact");

    const likeButton = document.createElement("button")

    if (getUserDataFromCookie("user").likes.includes(element.imgid.toString())) {
      likeButton.classList.add("like-btn", "liked")
    } else {
      likeButton.classList.add("like-btn")
    }

    likeButton.setAttribute("id", element.imgid)
    
    const likeSymbol = document.createElement("i")
    likeSymbol.classList.add("fa-solid", "fa-heart", "cap")

    likeButton.appendChild(likeSymbol)
    likeButton.addEventListener("click", () => like(likeButton))

    const cartButton = document.createElement("button")
    cartButton.classList.add("cart-btn")
    cartButton.setAttribute("id", element.imgid)

    const cartSymbol = document.createElement("i")
    cartSymbol.classList.add("fa-solid", "fa-cart-shopping", "cap")

    cartButton.appendChild(cartSymbol)
    cartButton.addEventListener("click", () => cart(cartButton))

    interact.appendChild(likeButton)
    interact.appendChild(cartButton)
    return interact
}


//Connecting Filters and Database

function reloadGallery(){
    let priceArray = [minprice.value, maxprice.value];
    let heightArray = [minheight.value, maxheight.value];
    let widthArray = [minwidth.value, maxwidth.value];

    const filterObj = {
        Price: priceArray,
        Height: heightArray,
        Width: widthArray,
        Style: Styles,
        isBundle: isBundle,
        Search: searchValue,
        sortBy: sort
    }

    console.log(filterObj)
    // console.log(filterObj)

    fetch('https://onlinegenerateddesignserver.onrender.com/', {method: "POST", headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify(filterObj)
    })
    // .then(array => displayImages(gallerycontainer, array))
    .then(response => response.json())
    .then(data => {displayImages(gallerycontainer, data)})
}

function like(button) {
  const currData = getUserDataFromCookie("user")
  const liked = currData.likes
  if (liked.includes(button.id)) {
    const i = liked.indexOf(button.id)
    liked.splice(i, 1)
  } else {
    liked.push(button.id)
  }
  // currData.likes = liked
  updateUserDataInCookie("user", currData)
  button.classList.toggle("liked")
}

function cart(button) {
  const currData = getUserDataFromCookie("user")
  const carted = currData.carted
  const quantity = currData.quantity
  if (carted.includes(button.id)) {
    const i = carted.indexOf(button.id)
    quantity[i]++
  } else {
    carted.push(button.id)
    quantity.push(1)
  }

  currData.carted = carted
  currData.quantity = quantity
  updateUserDataInCookie("user", currData)
  console.log(getUserDataFromCookie("user"))
}
console.log(getUserDataFromCookie("user").likes)

//Links to Products


