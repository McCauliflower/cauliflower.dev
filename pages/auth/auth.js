import './auth.css'

// Check authentication status
async function checkAuth() {
    try {
        const response = await fetch('/api/user', {
            credentials: 'include' // Important for cookies
        });
        const data = await response.json();
        console.log(data);

        if (data.isAuthenticated) {
            showUserInfo(data.user);
            showProtectedContent();
        } else {
            showLoginButton();
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        showLoginButton();
    }
}

function showLoginButton() {
    const authButtons = document.getElementById('auth-buttons');
    authButtons.innerHTML = `
        <a href="/auth/login" class="btn">Log In</a>
        <a href="/auth/login?screen_hint=signup" class="btn">Sign Up</a>
    `;
}

function showUserInfo(user) {
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    
    authButtons.innerHTML = `
        <a href="/auth/logout" class="btn">Log Out</a>
    `;
    
    userName.textContent = user.name || user.email;
    userInfo.style.display = 'block';
}

function showProtectedContent() {
    document.getElementById('protected-content').style.display = 'block';
}

// Example: Fetch protected data
async function fetchProtectedData() {
    try {
        const response = await fetch('/api/protected', {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Protected data:', data);
            return data;
        } else {
            console.log('Not authorized');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initialize
checkAuth();

// Expose to window for testing
window.fetchProtectedData = fetchProtectedData;