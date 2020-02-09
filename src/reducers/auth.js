/*
    All function here will be related to authentication and authorization
    like login, register, logout, forgotPassword, verify otp etc

    every exported function must return a state

*/
export const login = (state, data) => {
    localStorage.setItem("accessToken", data);
    return { ...state, accessToken: data };
};
export const logout = (state, data) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile")
    localStorage.removeItem("cart")
    return { ...state, accessToken: null };
};
