let products = document.querySelector("#products")
const body = document.querySelector('body')
const dark = document.querySelector("#darkmode")
const headerMain = document.querySelector("#header-main")
const navigation = document.querySelector("#navigation")
const ul = document.querySelectorAll("#nav-ul li")
const adminBtn = document.querySelector("#admin-btn")
const container = document.querySelector(".container")
console.log();





const fetchApi = "https://69080b1eb49bea95fbf23575.mockapi.io/api/v1/shop"
fetchData()

async function fetchData() {
    try {
        const response = await fetch(fetchApi)
        const dataJson = await response.json()
        displayApi(dataJson)
    } catch (error) {
        alert(error)
    }



}

displayApi()
function displayApi(array = []) {
    products.innerHTML = ``
    products.className = "grid grid-cols-2 pt-10 gap-9"
    products.innerHTML = array.map((val) => {
        return `
            <div class="h-auto pb-5 bg-white rounded-4xl" id="product">
                    <div id="product-top">
                        <img class="w-[100%] h-[400px] object-cover rounded-4xl" src="${val.image}" alt="Bu yerda rasm bo'lish kerak edi yani APIda rasm yuq ekan ">
                    </div>

                    <div id="product-bottom " class="flex flex-col items-center justify-center">
                        <div>
                            <h2 class="font-semibold text-[24px] pt-5">${val.title}</h2>
                            <p class="text-center text-[#6e6e73]">$${val.price}</p>
                        </div>
                        <button class="py-[10px] px-[24px] bg-[#0071e3] rounded-[25px] text-white mt-4 cursor-pointer">Sotib
                            olish</button>
                    </div>
                </div>
        `
    }).join("")

}


dark.addEventListener("click", () => {
    body.classList.toggle("dark")
    navigation.classList.toggle("product-for")
    const productsChild = products.children
    adminBtn.classList.toggle("product-for")

    Array.from(productsChild).forEach((val) => {
        val.classList.toggle("product-for")
    })

    ul.forEach((val) => {
        val.classList.toggle("li-style")
    })
})
