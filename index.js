async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
}

function createProductElement(product) {
    const template = document.querySelector('#result-item-template');
    const clone = template.content.cloneNode(true);

    const item = clone.querySelector('.result-item');
    item.querySelector('.item-result-title').textContent = product.title;
    item.querySelector('.result-item-condition').textContent = "Nuevo";
    item.querySelector('.result-item-sell-count-num').textContent = Math.floor(Math.random() * 100);
    item.querySelector('.result-item-price p').textContent = `$${product.price}`;
    item.querySelector('.result-item-img').src = product.image;
    item.querySelector('.result-item-img').alt = product.title;

    return clone;
}

function displayResults(products, searchTerm = "") {
    const resultContainer = document.querySelector('.results');
    resultContainer.innerHTML = "";

    const filteredProducts = searchTerm
        ? products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : products;
    
    if (filteredProducts.length === 0) {
        resultContainer.innerHTML = `<p>No se encontraron resultados para "${searchTerm}"</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        resultContainer.appendChild(productElement);
    });
}

async function main() {
    console.log("Inicio de la aplicación");
    const products = await fetchProducts();
    console.log("Productos obtenidos:", products);
    displayResults(products);

    const formEl = document.querySelector(".search-form");
    console.log("Formulario encontrado:", formEl);
    
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchTerm = document.querySelector(".search-input").value.trim();
        console.log("Término de búsqueda:", searchTerm);
        displayResults(products, searchTerm);
    });
}

main();