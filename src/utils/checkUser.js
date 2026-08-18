import axios from "axios";

export async function  checkUser(token, allowedRoles = []) {
    if (!token) {
        return {
            authenticated: false,
            authorized: false,
            user: null,
        };
    }

    try {
        const response = await axios.get(
            "http://localhost:8080/api/auth/check-user",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const user = response.data;

        const authorized = allowedRoles.length === 0 || allowedRoles.includes(user.role);

        return {
            authenticated: true,
            authorized,
            user,
        };

    } catch (error) {

        if (error.response?.status === 401) {
            return {
                authenticated: false,
                authorized: false,
                user: null,
            };
        }

        throw error;
    }
}