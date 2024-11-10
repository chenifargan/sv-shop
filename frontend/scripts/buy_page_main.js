const baseUrl = "http://localhost:3000/";
let userId = "";
let products = [];
let totalPrice = 0;
let totalItem = 0;
function checkout() {
  userId = localStorage.getItem("userId");
  totalPrice = localStorage.getItem("totalPrice");
  products = localStorage.getItem("selectedProducts");
  totalItem = localStorage.getItem("totalItems");

  document.getElementById("total-items").innerText = totalItem;
  document.getElementById("total-price").innerText = totalItem + " $";
}
checkout();

window.confirmOrder = async function () {
  let credentials = { userId, products };

  try {
    const response = await axios.post(
      `${baseUrl}pendingOrder/order`,
      credentials
    );

    alert(response.data.message);
    localStorage.removeItem("userId");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("selectedProducts");
    localStorage.removeItem("totalItems");
    window.location.href = "../pages/login_page.html";
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);
  }
};
