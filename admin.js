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



const fetchApi = "https://69c558688a5b6e2dec2c41b6.mockapi.io/imtihon"
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
    productsUl.innerHTML = ``
    productsUl.innerHTML = array.map((val, index) => {
        return `
              <li class="pl-9 flex justify-between" id="lists">
                        <p class="font-bold text-[14px]">${val.title}</p>
                        <i class="fa-regular fa-pen-to-square cursor-pointer " onclick="editItem(${val.id})"></i>

                        <div class="flex pr-10 gap-27">
                            <p class="text-[14px]"> $${val.price} </p>
                            <i class="fa-solid fa-trash  text-red-400 cursor-pointer" onclick='deleteItem(${val.id})'></i>
                        </div>
                    </li>
        `
    }).join("")
    console.log(array)
}
async function editItem(id) {
    const newTitle = prompt("yangi title kiriting")
    const newPrice = prompt("yangi narx kiriting")
    const image = prompt("yangi rasm kiriting")

    const newProduct = {
        title: newTitle,
        price: newPrice,
        image: image
    }
    await fetch(`${fetchApi}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newProduct) 
    })
    const update = await fetch(fetchApi)
    const updateJson = await update.json()
    createProduct(updateJson)
}


async function deleteItem(id) {
    await fetch(`${fetchApi}/${id}`, {
        method: "DELETE"
    })

    const deleteProduct = await fetch(fetchApi)
    const deleteProductJson = await deleteProduct.json()
    console.log(deleteProductJson);
    
    createProduct(deleteProductJson)
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