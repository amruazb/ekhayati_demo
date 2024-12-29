

export const storeLocalFavorites = (data: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("favorites", JSON.stringify(data));
}


export const getLocalFavorites = () => {
    if (typeof window === "undefined") return;

    return JSON.parse(localStorage?.getItem("favorites") || "[]");
}