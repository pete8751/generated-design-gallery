let wrapper = document.querySelector(".wrapper");
let panelbutton = document.querySelector(".filter-panel-toggle")

function togglepanel() {
    wrapper.classList.toggle("panel-open");
    console.log("TOGGLED")
}

panelbutton.addEventListener("click", togglepanel)