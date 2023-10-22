export const getApiUrl = () => {
    if(process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_LOCAL_API_URL;
    } else {
        return process.env.NEXT_PUBLIC_PRODUCTION_API_URL;
    }
}