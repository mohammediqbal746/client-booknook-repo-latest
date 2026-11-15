import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
    baseURL: "http://localhost:8000", // আপনার ব্যাকএন্ডের লিংক
    plugins: [jwt()]
});