const isDevMode = process.env.DEVMODE === "true";
const isSaveApi = process.env.SAVE_API === "true";


export const ENV = {
    isDevMode,
    isSaveApi
}