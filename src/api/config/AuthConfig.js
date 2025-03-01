export const AuthConfig = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    TOTP_IMAGE: "/totp",
    VERIFY_TOTP: "/verify-totp"
}


export const RegisterRequest = (email, password) => {
    return {
        email: email,
        password: password
    }
}

export const TotpRequest = (totpCode) => {
    return {
        totpCode: totpCode
    }
}

export const LoginRequest = (email, password) => {
    return {
        email: email,
        password: password
    }
}