export const API_BASE_URL = 'http://localhost:8080';

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};
