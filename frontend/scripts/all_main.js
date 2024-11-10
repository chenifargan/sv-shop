const baseUrl = "http://localhost:3000/pendingOrder/all?admin=true";

async function fetchOrders() {
  try {
    const response = await axios.get(baseUrl);
    if (response.status === 400) {
      window.location.href = "../pages/login_page.html";
    } else {
      displayOrders(response.data);
    }
  } catch (error) {
    document.getElementById("order-list").innerHTML = `<p>${
      error.response ? error.response.data.message : "Error fetching data"
    }</p>`;
  }
}

function displayOrders(orders) {
  const orderListElement = document.getElementById("order-list");

  if (orders.length === 0) {
    orderListElement.innerHTML = "<p>No orders available.</p>";
    return;
  }

  const orderHtml = orders
    .map((order) => {
      const productHtml = order.productId
        .map((product) => {
          return `<li>${product.name} - $${product.price}</li>`;
        })
        .join("");

      return `
      <div class="order-item">
        <h3>Customer Name: ${order.userId.name}</h3>
        <ul>Products Ordered:
          ${productHtml}
        </ul>
      </div>
    `;
    })
    .join("");

  orderListElement.innerHTML = orderHtml;
}

fetchOrders();
