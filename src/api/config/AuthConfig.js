export const AuthConfig = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    TOTP_IMAGE: "/totp",
    VERIFY_TOTP: "/verify-totp",
    REFRESH_TOKEN: "/auth/refreshtoken",
}

export const AdminConfig = {
    GET_ALL_ADMINS: "/admin/admins",
    GET_ALL_PROFS: "/admin/profs",
    GET_ALL_STUDENT: "/admin/students",
    GET_ALL_PENDING_USERS: "/admin/pending-users",
    CREATE_NEW_USER: "/admin/users",
    PENDING_USER:"/admin/users/pending/",
    CREATE_NEW_CURRICULUM:"/admin/curricula"

}

export const RegisterRequest = (fullName, email, password) => {
    return {
        email: email,
        password: password,
        fullName: fullName
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

export const CreateNewUserRequest = ({fullName, birthDate, email, gender, phoneNumber, province, role}) => {
    return {
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        gender: gender,
        phoneNumber: phoneNumber,
        province: province,
        role: role
    }
}


export const ChangeUserType = ({role, stage}) => {
    return {
        "role": role,
        "stage":stage
    }
}