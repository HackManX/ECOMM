// Sign-Up function
async function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message);
}

// Login function
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        alert("Login successful");
        window.location.href = 'index.html';
    } else {
        alert(data.message);
    }
}
