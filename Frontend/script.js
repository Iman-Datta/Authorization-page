const API_URL = "http://localhost:3000";

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message.includes("Welcome")) {
            message.style.color = "green";
            message.textContent = data.message;
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect on success
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = data.message;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        message.style.color = "red";
        message.textContent = "Login failed";
    });
}

// Register function (Optional)
function register(username, firstName, lastName, password) {
    fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, firstName, lastName, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}