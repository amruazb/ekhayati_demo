
export const getUserCart = () => {
  if (typeof window === "undefined") return;

  return JSON.parse(localStorage?.getItem("cart") || "{}");
}

export const storeCart = (data: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

export const saveCartItems = (cartItems: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("storage"));
}

export const clearCart = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("cart");
}

export const setUserAddresses = (addresses: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("addresses", JSON.stringify(addresses));
}

export const getUserAddresses = () => {
  if (typeof window === "undefined") return;

  const addresses: any = localStorage.getItem("addresses");
  if (addresses == "undefined") return [];
  return JSON.parse(addresses);
}

export const setUserProfiles = (profiles: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("profiles", JSON.stringify(profiles));
}

export const getUserProfiles = () => {
  if (typeof window === "undefined") return;

  return JSON.parse(localStorage.getItem("profiles") || "[]");
}

export const storeAddresses = (addresses: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("addresses", JSON.stringify(addresses));
  window.dispatchEvent(new Event("storage"));
}