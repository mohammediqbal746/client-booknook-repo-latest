import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:8000", // আপনার লোকাল ব্যাকএন্ডের লিংক
    plugins: [jwtClient()], // ডকের নির্দেশ অনুযায়ী JWT প্লাগিন যোগ করা হলো
});