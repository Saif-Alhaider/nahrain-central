export const AuthConfig = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    TOTP_IMAGE: "/totp",
    VERIFY_TOTP: "/verify-totp",
    REFRESH_TOKEN:"/auth/refreshtoken",
}

export const AdminConfig={
    GET_ALL_ADMINS:"/admin/admins",
    GET_ALL_PROFS:"/admin/profs",
    GET_ALL_STUDENT:"/admin/students"
}

export const RegisterRequest = (fullName,email, password) => {
    return {
        email: email,
        password: password,
        fullName:fullName
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