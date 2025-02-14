export const AuthConfig = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login"
}

export const RegisterRequest = (email,password) => {
    return {
        email:email,
        password:password
    }
}