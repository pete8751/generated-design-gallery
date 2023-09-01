//Cookie
import {generateCookie, getCookie, getUserDataFromCookie, create_UUID, updateUserDataInCookie, userObj} from '../cookie.js'
generateCookie("user", userObj)
// console.log(userObj)

let currData = getUserDataFromCookie("user")
console.log(currData)

//Loading Gallery
let gallerycontainer = document.querySelector(".grid-wrapper");


{/* <div class="box zone">
                <img src="../img/Gallery/Abstract 1.jpg" alt="" />
                <div class="caption">
                  <div class="details">
                    <p class="title">Title</p>
                    <p class="size">Size</p>
                    <p class="price">Price</p>
                  </div>
                  <div class="interact">
                    <i class="fa-regular fa-heart cap"></i>
                    <i class="fa-solid fa-cart-shopping cap"></i>
                  </div>
                </div>
              </div> */}



fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => {displayImages(gallerycontainer, data)})
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
      displayCaption(element, newlisting)

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


//Filters
let wrapper = document.querySelector(".wrapper");
let panelbutton = document.querySelector(".filter-panel-toggle");

//Price
let minprice = document.querySelector(".cost.range-min");
let maxprice = document.querySelector(".cost.range-max");
let minpricetext = document.querySelector(".cost.input-min");
let maxpricetext = document.querySelector(".cost.input-max");


panelbutton.addEventListener("click", togglepanel)

function togglepanel() {
  wrapper.classList.toggle("panel-open");
  let panel = document.querySelector(".panel")
  console.log(panel)
  let width = panel.offSetWidth

  console.log(width)
}

minprice.addEventListener("input", () => {
    minpricetext.value = minprice.value
    console.log(minprice.value)
    reloadGallery()
})

minpricetext.addEventListener("input", () => {
    minprice.value = minpricetext.value
    reloadGallery()
})

maxprice.addEventListener("input", () =>{
    maxpricetext.value = maxprice.value
    reloadGallery()
})

maxpricetext.addEventListener("input", () =>{
    maxprice.value = maxpricetext.value
    reloadGallery()
})

//Width
let minheight = document.querySelector(".height.range-min");
let maxheight = document.querySelector(".height.range-max");
let minheighttext = document.querySelector(".height.input-min");
let maxheighttext = document.querySelector(".height.input-max");

minheight.addEventListener("input", () => {
    minheighttext.value = minheight.value
    reloadGallery()
})

minheighttext.addEventListener("input", () =>{
    minheight.value = minheighttext.value
    reloadGallery()
})

maxheight.addEventListener("input", () =>{
    maxheighttext.value = maxheight.value
    reloadGallery()
})

maxheighttext.addEventListener("input", () =>{
    maxheight.value = maxheighttext.value
    reloadGallery()
})

//Height
let minwidth = document.querySelector(".width.range-min");
let maxwidth = document.querySelector(".width.range-max");
let minwidthtext = document.querySelector(".width.input-min");
let maxwidthtext = document.querySelector(".width.input-max");

minwidth.addEventListener("input", () => {
    minwidthtext.value = minwidth.value
    reloadGallery()
})

minwidthtext.addEventListener("input", () =>{
    minwidth.value = minwidthtext.value
    reloadGallery()
})

maxwidth.addEventListener("input", () =>{
    maxwidthtext.value = maxwidth.value
    reloadGallery()
})

maxwidthtext.addEventListener("input", () =>{
    maxwidth.value = maxwidthtext.value
    reloadGallery()
})

//Styles
let Styles = []
let modern = document.getElementById("modern");
let impressionism = document.getElementById("impressionism");
let scenic = document.getElementById("scenic")
let abstract = document.getElementById("abstract")


modern.addEventListener('click', () =>{
  addStyle(modern)
  reloadGallery()
  console.log(Styles)
})

impressionism.addEventListener('click', () =>{
  addStyle(modern)
  reloadGallery()
})

scenic.addEventListener('click', () =>{
  addStyle(modern)
  reloadGallery()
})

abstract.addEventListener('click', () =>{
  addStyle(abstract)
  reloadGallery()
})


function addStyle(input){
  let style = input.value

  if (Styles.includes(style)) {
    const i = Styles.indexOf(style)
    Styles.splice(i, 1)
    input.checked = false
  } else {
    Styles.push(style)
  }
}

//Search
let searchValue = ""
let searchBar = document.getElementById("search");

searchBar.addEventListener('input', () => {
    searchValue = searchBar.value
    reloadGallery()
  }
)

//Sort
let sort = "none"
let sorter = document.getElementById("sorting")

sorter.onchange = () => {
  sort = sorter.value
  reloadGallery()
}

//Bundle
let isBundle = false
let bundler = document.getElementById("bundles")

bundler.addEventListener('click', () => {
  if (isBundle) {
    isBundle = false
  } else {
    isBundle = true
  }
})

//Reset Filters
let reset = document.getElementById("reset");
reset.addEventListener('click', () =>{
  minheight.value = minheighttext.value = minwidth.value = minwidthtext.value = 0;
  maxheight.value = maxheighttext.value = maxwidth.value = maxwidthtext.value = 100;
  minprice.value = minpricetext.value = 0;
  maxprice.value = maxpricetext.value = 100000;
  Styles = []
  isBundle = false
  searchValue = ""
  sorter.value = sort = "none"
  reloadGallery()
})

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

    fetch('http://localhost:3000/', {method: "POST", headers: {
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


