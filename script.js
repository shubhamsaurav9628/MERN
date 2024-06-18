fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => createUI(data))
    .catch((err) => console.log("❌Error occurred\n", err));


const main = document.getElementById("root");

function createUI(data) {
    const products = data.products;
    main.innerHTML = ``;
    for (let i = 0; i < products.length; i++) {
        const newCard = document.createElement("div");
        newCard.innerHTML = `
            <div>
                <h3>${products[i].title}</h3>
                <img src="${products[i].thumbnail}">
                <p>Price: $${products[i].price}</p>
                <button onclick="removeCard(this)">Remove</button>
            </div>
        `;
        main.appendChild(newCard);
    }
}


function searchProducts(e) {
    const searchText = e.target.value;
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
        .then((res) => res.json())
        .then((data) => createUI(data))
        .catch((err) => console.log("❌Error occurred\n", err));
}


function removeCard(button) {
    const card = button.parentElement.parentElement;
    card.remove();
}


function addProduct() {
    const title = document.getElementById("productTitle").value;
    const thumbnail = document.getElementById("productThumbnail").value;
    const price = document.getElementById("productPrice").value;

    if (title && thumbnail && price) {
        const newCard = document.createElement("div");
        newCard.innerHTML = `
            <div>
                <h3>${title}</h3>
                <img src="${thumbnail}">
                <p>Price: $${price}</p>
                <button onclick="removeCard(this)">Remove</button>
            </div>
        `;
        main.appendChild(newCard);

        document.getElementById("productTitle").value = '';
        document.getElementById("productThumbnail").value = '';
        document.getElementById("productPrice").value = '';
    } else {
        alert("Please fill in all fields");
    }
}
