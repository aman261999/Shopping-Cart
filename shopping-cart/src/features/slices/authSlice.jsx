import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(sessionStorage.getItem("authUser")) || {
            name: "",
            password: "",
            email: "",
            authUser: false,
        }
    },
    reducers: {
        login(state, action) {
            const { name, password } = action.payload;

            const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name);
            const usernameValidation = /^[a-zA-Z0-9_]{4,10}$/i.test(name);
            const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/i.test(password);

            if ((!emailValidation && !usernameValidation) || !passwordValidation) {
                state.user.authUser = false;
            } else {
                const expiry = Date.now() + 60 * 60 * 1000;
                state.user = { 
                    name: emailValidation ? "" : name, 
                    email: emailValidation ? name : "", 
                    password, 
                    authUser: true 
                };
                sessionStorage.setItem("authUser", JSON.stringify(state.user));
                sessionStorage.setItem("expiry", expiry);
            }
        },
        googleLogin(state, action) {
            const { name, email } = action.payload;
            const expiry = Date.now() + 60 * 60 * 1000; 
            state.user = { name, email, authUser: true };
            sessionStorage.setItem("authUser", JSON.stringify(state.user));
            sessionStorage.setItem("expiry", expiry);
        },
        logout(state) {
            state.user = { name: "", email: "",password: "", authUser: false };
            sessionStorage.clear();
        }
    }
})

export const { login, googleLogin, logout } = authSlice.actions;
export default authSlice.reducer;
