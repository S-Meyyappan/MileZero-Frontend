export const saveAuth = (auth) => {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("role", auth.role);
    localStorage.setItem("username", auth.username);
    localStorage.setItem("expiration", auth.expirationTime);
};

export const loadAuth = () => ({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
    expirationTime: localStorage.getItem("expiration"),
});

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("expiration");
};