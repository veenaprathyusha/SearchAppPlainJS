const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
let lastCategory = null;
let inStockOnly = false;
let allCheckBox = document.getElementById('check-box');
let productList = document.querySelector('.product-list');
let inputBox = document.getElementById("search");

allCheckBox.addEventListener('change', (event) => {
    let filteredList = [];
    if (event.target.checked) {
        filteredList = PRODUCTS.filter((prt) => prt.stocked === true)

    } else {
        filteredList = PRODUCTS
    }
    productList.innerHTML = (filteredList.length == 0) ? "No Results Found !!" : getProducts(filteredList);
})


document.addEventListener('input', () => SearchFunc(PRODUCTS));
function SearchFunc(products) {
    productList.innerHTML = "";
    let filteredList = products.filter(hotel => {
        return hotel.name.toLowerCase().indexOf(inputBox.value.toLowerCase()) > -1;
    });
    productList.innerHTML = (filteredList.length == 0) ? "No Results Found !!" : getProducts(filteredList);

}
function getProductCatregoryRow(category) {
    return `
        <tr>
          <th colSpan="2">
            ${category}
          </th>
        </tr>
      `
}

function getProductRow(product) {
    return `
    <tr>
      <td>${product.stocked ? product.name : `<span class="completed-stock">${product.name}</span>`}</td>
      <td>${product.price}</td>
    </tr>`
    
}


function getProducts(products) {
    let rows = [];
    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                inputBox.value.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                getProductCatregoryRow(product.category)
            );
        }
        rows.push(
            getProductRow(product)
        );
        lastCategory = product.category;
    });

    return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tbody>
    </table>
  `
}


productList.innerHTML = PRODUCTS.length === 0 ? "no results" : getProducts(PRODUCTS);
