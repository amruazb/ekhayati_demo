import Cookies from "js-cookie";

/**
 * Sets the token and user information in cookies and redirects to the home page.
 *
 * @param {any} data - The data containing the JWT token and user information.
 * @return {void} This function does not return anything.
 */
export const setToken = (data: any) => {
  if (typeof window === "undefined") return;
  
  Cookies.set("token", data.jwt);
  Cookies.set("userID", data.user.id);
  Cookies.set("userName", data.user.name);
  Cookies.set("userEmail", data.user.email);

  // Router.push("/");
}

/**
 * Retrieves the token from the cookies.
 *
 * @return {string} The token value.
 */
export const getToken = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("token");
}

/**
 * Removes the token and user information from cookies
 */
export const removeToken = () => {
  // Check if running in a browser environment
  if (typeof window === "undefined") return;

  // Remove the token and user information from cookies
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("userName");
  Cookies.remove("userEmail");
}

export const getIdFromServerCookie = (req: any) => {
  if (!req.header.cookie || '') {
    return undefined;
  }

  const idCookie = req.header.cookie.split(';').find((c: any) => c.trim().startsWith('userID='));

  if (!idCookie) {
    return undefined;
  }

  const id = idCookie.split('=')[1];
  return id;
}

export const getIdFromLocalCookie = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("userID");
}

//getUserEmail, getUserName, getUserID
export const getEmailFromLocalCookie = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("userEmail");
}

export const getUserNameFromLocalCookie = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("userName");
}

export const getUserIDFromLocalCookie = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("userID");
}

export const getTokenFromServerCookie = (req: any) => {
  if (!req.header.cookie || '') {
    return undefined;
  }
}

export const getTokenFromLocalCookie = () => {
  if (typeof window === "undefined") return;
  
  return Cookies.get("token");
}

/**
 * Get the favorites from the cookies
 * 
 * @returns {string | undefined} The favorites from the cookies, or undefined if window is undefined
 */
export const getFavorites = () => {
  // Check if window is undefined
  if (typeof window === "undefined") return;
  
  // Get the favorites from cookies
  return Cookies.get("favorites");
}

/**
 * Sets the favorites cookie with the given value.
 * @param favorites - The value to set as the favorites cookie.
 */
export const setFavorites = (favorites: string) => {
  // Set the favorites cookie
  Cookies.set("favorites", favorites);
}

/**
 * Add the given ID to the favorites list.
 * If the favorites list already exists, append the ID to it.
 * If the favorites list doesn't exist, create a new list with the ID.
 * @param id - The ID to add to the favorites list.
 */
export const addToFavourites = (id: string) => {
  // Get the current favorites list
  let favorites = getFavorites();

  // If the favorites list exists, append the ID to it
  if (favorites) {
    favorites = favorites + "," + id;
  } else {
    // If the favorites list doesn't exist, create a new list with the ID
    favorites = id;
  }

  // Set the updated favorites list
  setFavorites(favorites);
}

/**
 * Remove the given ID from the favorites list.
 * @param {string} id - The ID to be removed.
 */
export const removeFromFavorites = (id: string) => {
  // Get the current favorites list
  let favorites = getFavorites();

  // If favorites list exists, remove the ID from it
  if (favorites) {
    favorites = favorites.replace("," + id, "").replace(id, "");
  }

  // Update the favorites list
  setFavorites(favorites || "");
}