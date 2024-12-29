

export const storeLocalFavorites = (data: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("favorites", JSON.stringify(data));
}

export const appendToFav = (data: any[]) => {
    if (typeof window === "undefined") return;

    // Retrieve the existing favorites from localStorage
    const existingFavorites = localStorage.getItem("favorites");

    // Parse the existing favorites or initialize an empty array
    const favoritesList = existingFavorites ? JSON.parse(existingFavorites) : [];

    // Add unique items from the input data to the favorites list
    data.forEach((item) => {
        if (!favoritesList.includes(item)) {
            favoritesList.push(item);
        }
    });

    // Store the updated favorites back in localStorage
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
};


export const getLocalFavorites = () => {
    if (typeof window === "undefined") return;

    return JSON.parse(localStorage?.getItem("favorites") || "[]");
}
