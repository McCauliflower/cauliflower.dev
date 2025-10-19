import './auth.css'

const login = () => {
    document.querySelector('.login').addEventListener('click', () => {
        getSession().then(session => {
        console.log('Session data:', session);
            if (session.isAuthenticated) {
            console.log('User is authenticated:', session.user);
            } else {
            console.log('User is not authenticated');
            }
        })
    })
}
async function getSession() {
    const res = await fetch('http://localhost:5174/api/session', { credentials: 'include' })
    return res.json()
}
async function checkAuth() {
    try {
        login();
        const response = await fetch('/api/user', {
            credentials: 'include'
        });
        console.log('response, ', response)
        const data = await response.json();
        console.log('data', data);
    } catch (error) {
        console.error('Auth check failed:', error);
    }
}

checkAuth();
