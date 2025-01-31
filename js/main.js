let products_box = document.querySelector("#products")
let count = document.querySelector("#count");
let cards = document.querySelector("#cards")
let card_box = document.querySelector("#card-box")
function addToProduct() {
    products_box.innerHTML = null
    cosmetics.forEach((prop, index) => {
        let card = document.createElement("div")
        card.classList.add('rounded-lg', 'p-[2px', 'shadow-2xl')
        let card_image = document.createElement("img")
        card_image.src = prop.image
        card_image.alt = prop.name
        card_image.classList.add("rounded-lg", 'h-[300px]', "mx-auto", "object-cover")
        let card_titles = document.createElement("div")
        card_titles.classList.add("p-3")
        let title = document.createElement("p")
        title.textContent = prop.name >= 100 ? `${prop.name.slice(0, 100) + "..."}` : prop.name
        title.classList.add("text-[20px]")
        let price = document.createElement("p")
        price.classList.add("font-bold")
        price.textContent = "Стоимость продукта:" + prop.price + " $"

        let count = document.createElement("p")
        count.classList.add("font-bold")
        count.textContent = "Количество продукта:" + prop.quantity


        let comment = document.createElement("p")
        comment.textContent = prop.comment
        comment.classList.add('text-blue-500')
        let btn = document.createElement("button")
        btn.textContent = " Купить";
        btn.classList.add("border", "py-1", 'px-3', 'rounded-md', 'bg-blue-500', 'text-white', 'active:bg-blue-300', 'mt-3')
        btn.setAttribute("onclick", `sotibOlish(${index})`);

        card_titles.appendChild(title)
        card_titles.appendChild(price)
        card_titles.appendChild(comment)
        card_titles.appendChild(count)
        card_titles.appendChild(btn)
        card.appendChild(card_image)
        card.appendChild(card_titles)
        products_box.appendChild(card)
    })
}
addToProduct()
let savatcha = []
function sotibOlish(index) {
    if (savatcha.length == 0) {
        let new_prod = { ...cosmetics[index], count: 1 };
        savatcha.push(new_prod)
    } else {
        let finded = savatcha.find((item) => {
            return item.id == cosmetics[index].id
        });
        if (!finded) {
            let new_prod = { ...cosmetics[index], count: 1 };
            savatcha.push(new_prod)
        } else {
            finded.count += 1;
        }
    }
    cosmetics[index].quantity -= 1;
    if (cosmetics[index].quantity == 0) {
        cosmetics.splice(index, 1)
    }
    addToProduct()
    renderCards()
    count.textContent = savatcha.length;
}
document.getElementById("add-product-btn").addEventListener("click", function inputInformation() {

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();
    if (!name && isNaN(price) && isNaN(quantity) && !image && !description) {
        alert("Пожалуйста, заполните все поля .");
        return;
    }
    cosmetics.push({
        id: Date.now(),
        name,
        price,
        quantity,
        image,
        comment: description,
    });
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
    addToProduct();

});

function showCards(params) {
    if (params == "show") {
        cards.classList.remove("translate-x-[-600px]")
        cards.classList.add("translate-x-[0px]")
        renderCards()
    } else if (params == "hide") {
        cards.classList.add("translate-x-[-600px]")
        cards.classList.remove("translate-x-[0px]")
    }
}
function renderCards() {
    summ()
    card_box.innerHTML = null
    savatcha.forEach((item, index) => {
        let div = document.createElement("div")
        let box = `
     <div class="flex gap-4 items-center ">
                <img class="w-2/5 h-full"
                    src= ${item.image}
                    alt="photo">
                <div>
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                    <div>
                        <button class="px-2 rounded-md bg-blue-500  text-center text-white" onclick="decr(${index})" >-</button>
                        <span>${item.count} </span> 
                        <button class="px-2 rounded-md bg-blue-500  text-center text-white" onclick="incr(${index})" >+</button>
                    </div>
                </div>
            </div>`
        div.innerHTML = box
        card_box.appendChild(div)
    });
    count.textContent = savatcha.length;
}
function incr(i) {
    if (savatcha[i].quantity > savatcha[i].count) {
        savatcha[i].count += 1
        cosmetics.forEach((product, index) => {
            if (savatcha[i].id == product.id) {
                cosmetics[index].quantity -= 1
                addToProduct()
            }
        })
        renderCards()
        if (savatcha[i].quantity == savatcha[i].count) {
            cosmetics.forEach((product, index) => {
                if (savatcha[i].id == product.id) {
                    cosmetics.splice(index, 1)
                    addToProduct()
                }
            })
        }
    }
}

function decr(i) {
    if (savatcha[i].count > 0) {
        savatcha[i].count -= 1
        cosmetics.forEach((product, index) => {
            if (savatcha[i].id == product.id) {
                cosmetics[index].quantity += 1
                addToProduct()
            }
        })
        let finded = cosmetics.find((prod) => {
            return prod.id == savatcha[i].id
        })
        if (!finded) {
            cosmetics.unshift({ ...savatcha[i], quantity: 1 })
        }
        if (savatcha[i].count == 0) {
            savatcha.splice(i, 1)
        }
        renderCards()
    }
}







let total = document.querySelector("#total-price")

function summ() {
    let sum = 0
    savatcha.forEach((element) => {
        sum = sum + element.count * element.price
    })

    console.log(sum);
    total.textContent = sum

}

