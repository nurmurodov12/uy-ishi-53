const productsUl = document.querySelector("#product-ul")
const dark = document.querySelector("#darkmode")
const body = document.querySelector('body')
const navigation = document.querySelector("#navigation")
const list = document.querySelectorAll(".nav-li")
const adminBtn = document.querySelector("#admin-btn")
const productUl = document.querySelector("#nav-ul")
const adminMain = document.querySelector("#admin-main")
const h2 = document.querySelectorAll("#mahsulot")
const formInput = document.querySelectorAll("#form input")
const select = document.querySelector("select")
const lists = document.querySelector("#lists")
const adminMainChild = adminMain.children
const productsUlLi = productUl.children
const productAddBtn = document.getElementById("product-add-btn")
const form = document.querySelector("#form")



const fetchApi = "https://69080b1eb49bea95fbf23575.mockapi.io/api/v1/shop"
let arrFetch = []

fetchData()
async function fetchData() {
    try {
        const response = await fetch(fetchApi)
        const dataJson = await response.json()
        arrFetch = dataJson
        createProduct(dataJson)
    } catch (error) {
        alert(error)
    }
}

createProduct()

function createProduct(array = []) {
    productUl.innerHTML = ``
    productsUl.innerHTML = array.map((val, id) => {
        return `
              <li class="pl-9 flex justify-between" id="lists">
                        <p class="font-bold text-[14px]">${val.title}</p>

                        <div class="flex pr-10 gap-27">
                            <p class="text-[14px]"> $${val.price} </p>
                            <i class="fa-solid fa-trash  text-red-400 cursor-pointer" onclick="deleteItem(event)"></i>
                        </div>
                    </li>
        `
    }).join("")
    console.log(array);
}

function deleteItem(e) {
    const target = e.target.parentElement.parentElement
    target.remove()
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const img = document.getElementById("img").value

    const newProduct = {
        title: title,
        price: price,
        image: img
    }

    const response =  await fetch(fetchApi, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newProduct)
    })
    const addProduct = await response.json()
    
    arrFetch.push(addProduct)

    createProduct(arrFetch)
    form.reset()
})


dark.addEventListener("click", () => {
    body.classList.toggle("dark")
    navigation.classList.toggle("product-for")

    adminBtn.classList.toggle("product-for")
    Array.from(productsUlLi).forEach((val) => {
        val.classList.toggle("product-for")
    })
    adminMain.classList.toggle("product-for")

    Array.from(adminMainChild).forEach((val) => {
        val.classList.toggle('product-add-for')
    })
    Array.from(h2).forEach((val) => {
        val.classList.toggle("li-style")
    })

    formInput.forEach((val) => {
        val.classList.toggle('bg-black')
    })
    select.classList.toggle("bg-black")
})
