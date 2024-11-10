const baseUrl = "http://localhost:3000/";
let userId = "";
async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const credentials = { email, password };

  try {
    const response = await axios.post(`${baseUrl}users/`, credentials);
    alert("User log in successfully");
    console.log(response.data.message);
    userId = response.data.message._id;
    localStorage.setItem("userId", userId);
    window.location.href = "../pages/products_page.html";
  } catch (error) {
    let errorMessage = "An error occurred";

    // Check if there's a response with a message
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    alert("Error signing in: " + errorMessage);
  }
}

async function signUp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const credentials = { name, email, password };
  try {
    const response = await axios.post(`${baseUrl}users/signup`, credentials);
    alert("User created successfully");
    console.log(response.data.message);
    userId = response.data.message._id;
    localStorage.setItem("userId", userId);
    window.location.href = "../pages/products_page.html";
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    alert("Error signing in: " + errorMessage);
  }
}
