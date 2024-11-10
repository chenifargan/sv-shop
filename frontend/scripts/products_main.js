document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = "http://localhost:3000/";

  let totalPrice = 0;
  let selectedProducts = [];
  let products = [];

  async function fetchProducts() {
    try {
      const response = await axios.get(`${baseUrl}products/products`);
      products = response.data;
      console.log(products);
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products: " + error.message);
    }
  }

  function displayProducts(products) {
    const productListElement = document.getElementById("product-list");

    if (products.length === 0) {
      productListElement.innerHTML = "<p>No products available</p>";
      return;
    }

    const productHtml = products
      .map((product) => {
        return `
          <div class="product-item" data-price="${product.price}" data-name="${product.name}" onclick="selectProduct('${product._id}', ${product.price})">
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>Price: ${product.price}$</p>
            </div>
          </div>
        `;
      })
      .join("");

    productListElement.innerHTML = productHtml;
  }

  window.selectProduct = function (id, price) {
    const selectedProduct = id;
    selectedProducts.push(selectedProduct);
    addToTotalPrice(price);
  };

  function addToTotalPrice(price) {
    totalPrice += parseFloat(price);
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
      totalPriceElement.innerText = totalPrice.toFixed(2);
    }
    const totalItemsElement = document.getElementById("total-items");
    if (totalItemsElement) {
      totalItemsElement.innerText = selectedProducts.length;
    }
  }

  window.sortProducts = function () {
    const sortOption = document.getElementById("sort-option").value;

    let sortedProducts = [];
    if (sortOption === "name") {
      sortedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortOption === "price") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    }

    displayProducts(sortedProducts);
  };

  window.searchProducts = function () {
    const searchQuery = document
      .getElementById("search-input")
      .value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
  };

  window.handleBuyButtonClick = function () {
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    localStorage.setItem("totalItems", selectedProducts.length);

    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

    window.location.href = "../pages/buy_page.html";
  };

  fetchProducts();
});
