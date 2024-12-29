import { getTokenFromLocalCookie } from "@/utils";
import { POST, GET, PUT, DELETE } from "./client";
import { operations, paths } from "./schema";
import qs from "qs";
import axios from "axios";
export const registerApi = (body: any) => POST("/auth/local/register", {body});

export const loginApi = (body: paths["/auth/local"]["post"]["requestBody"]["content"]["application/json"]) => POST("/auth/local", {body});

export const getHomePageData = () => POST("/home-page/localizations", {
  body: {
    locale: "en",
  }
});

interface GetFabricParams {
    sort?: string | undefined;
    "pagination[withCount]"?: boolean | undefined;
    "pagination[page]"?: number | undefined;
    "pagination[pageSize]"?: number | undefined;
    "pagination[limit]"?: number | undefined;
    "pagination[start]"?: number | undefined;
    populate?: string | undefined;
    fields?: string | undefined;
    filters?: Record<string, never> | undefined;
    locale?: string | undefined;
}

/**
 * Get the listing of fabrics.
 * 
 * @param {string} token - The access token for authentication.
 * @param {object} params - The query parameters for the request.
 * @returns {Promise<object>} - A promise that resolves to the fabric listing.
 */
export const getFabricListing = (token: string, params: operations["get/fabrics"]["parameters"]["query"]) => {
  // Create headers object and set Authorization and Accept headers
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");

  // Send GET request to /fabrics endpoint with headers and query parameters
  return GET("/fabrics", {
    headers,
    params: {
      query: {
        ...params,
        populate: "*",
        "pagination[pageSize]" : 200,
      },
    },
  });
};

export const getProductCategoryListing = (token: string, params: operations["get/categories"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/categories", {
    headers,
    params: {
      query: params
    }
  })
}

export const getProductListing = (token: string, params: operations["get/mekhwars"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/mekhwars", {
    headers,
    params: {
      query: params,
    },
  })
}

export const getHomeData = (token: string, params: operations["get/home-page"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/home-page", {
    headers,
    params: {
      query: params
    }
  })
}

export const getSiteConfig = () => {
  return GET("/site-config")
}

export const getTailorListing = (token: string, params: operations["get/tailors"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/tailors", {
    headers,
    params: {
      query: params
    }
  })
}

export const getDesignListing = (token: string, params: operations["get/designs"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/designs", {
    headers,
    params: {
      query: params
    }
  })
}

export const getTailorMekhwarListing = (token: string, params: operations["get/designs"]["parameters"]["query"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/mekhwars", {
    headers,
    params: {
      query: params
    }
  })
}

export const getDesignData = (token: string, params: operations["get/designs/{id}"]["parameters"]) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  return GET("/designs/{id}?populate=deep", {
    headers,
    params
  });
}

export const getMekhwarByID = (token: string, id: any) => {
  let headers: any = new Headers();
  headers.append("Accept", "application/json");
  let url: any = `/mekhwars/{id}?populate=deep`;
  let options: any = {
    headers,
    params: {
      path: {
        id,
      },
    },
  };
  return GET(url,
    //@ts-ignore
    options)
}

export const getFabricByID = (token: string, id: any) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  return GET(`/fabrics/{id}?populate=*,main_image,images,fabric_pattern.image,detail_list_item,detail_list_item.title`, {
    headers,
    params: {
      path: {
        id,
      },
    },
  })
}

export const getTailorByID = async (token: string, id: any, locale = "en") => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  let res = await GET(`/tailors/{id}?populate=*`, {
    headers,
    params: {
      path: {
        id,
      },
    },
  });

  //if res.locale = locale then return same
  //@ts-ignore
  if (res.data?.data?.attributes?.locale != locale) {
    //@ts-ignore
    const otherLocaleID = res.data?.data?.attributes?.localizations?.data?.[0].id;
    //@ts-ignore
    res = await GET(`/tailors/{id}?populate=*`, {
      headers,
      params: {
        path: {
          id: otherLocaleID,
        },
      },
    });
  }
  //else poulate 

  return res;
}

export const getMekhwarByMetaID = (token: string, id: any) => {
  let headers: any = new Headers();
  if (!token) token = process.env.API_TOKEN || getTokenFromLocalCookie() || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  return GET(`/mekhwars/{id}?populate=*`, {
    headers,
    params: {
      path: {
        id,
      },
    },
  });
}

export const filterMekhwar = (params: operations["get/mekhwars"]["parameters"]["query"]) => {
  return GET(`/mekhwars`, {
    params: {
      query: params,
    }
  })
}

export const filterFabric = (params: operations["get/fabrics"]["parameters"]["query"]) => {
  return GET(`/fabrics`, {
    params: {
      query: params,
    }
  })
}

/*==============================================USER ENDPOINTS===================================================*/
export const getMe = (token?: string) => {
  let headers: any = new Headers();
  if (!token) token =  getTokenFromLocalCookie() || process.env.API_TOKEN || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  return GET("/users/me?populate=size_profiles,addresses,cart,cart.mekhwar.mekhwar.main_image,cart.custom.design,cart.custom.design.image,cart.custom.tailor,cart.custom.fabric", {
    params: {
      query: ""
    },
    headers
  });
}

export const getFavoritedProducts = (token?: string) => {
  let headers: any = new Headers();
  if (!token) token =  getTokenFromLocalCookie() || process.env.API_TOKEN || "";
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/favourite-product/get-user-favourite-products", {
    headers
  });
}

export const getCart = (token?: string) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  //@ts-ignore
  return GET("/cart/getOrInsert", {
    headers,
  });
}

export const addMekhwarToCart = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/cart/add-custom", {
    headers,
    body
  });
}

export const addCustomToCart = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/cart/add-custom", {
    headers,
    body
  });
}

export const incrementCartItem = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/cart/increment/{id}", {
    headers,
    body,
    params: {
      path: {
        id: body?.id
      }
    }
  });
}

export const decrementCartItem = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/cart/decrement/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
    body,
  });
}

export const removeCartItem = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/cart/remove-item/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
    body
  });
}

export const applyCoupon = (token: string, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/cart/coupon/check", {
    headers,
    body
  });
}

export const getCustomerAddresses = (token: string) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/customer-addresses", {
    headers,
    params: {
      query: {
        filters: {
          
        }
      }
    }
  });
}

export const createCustomerAddress = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/customer-addresses/create", {
    headers,
    body
  });
}

export const updateCustomerAddress = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/customer-addresses/updateAddress/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
    body
  });
}

export const getClientSecret = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/orders/client-secret", {
    headers,
    body
  });
}

export const getCustomOrderDetails = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/custom-order/customer-get-order/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    }
  });
}

export const updateCustomerDetails = (token: string | undefined, id: any, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/users/{id}", {
    headers,
    params: {
      path: {
        id,
      }
    },
    body
  });
}

/**
 * Deletes a customer address.
 *
 * @param {string} token - The authentication token.
 * @param {object} body - The request body containing the address ID.
 * @returns {Promise} - A promise that resolves with the API response.
 */
export const deleteCustomerAddress = (token: any, body: { id: number }) => {
  // Create the headers object
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");

  // Call the DELETE API endpoint
  return DELETE("/customer-addresses/deleteAddress/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
  });
}

export const getUserProfile = (token: string) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return GET("/orders/user-profile", {
    headers
  });
}

export const cancelCustomOrder = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/custom-order/cancel-custom-order", {
    headers,
    body
  });
}

//create,update,delete size profile
export const createSizeProfile = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/size-profiles", {
    headers,
    body
  });
}

export const updateSizeProfile = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return PUT("/size-profiles/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
    body
  });
}

export const deleteSizeProfile = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return DELETE("/size-profiles/{id}", {
    headers,
    params: {
      path: {
        id: body?.id
      }
    },
  });
}

export const createCustomOder = (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  return POST("/custom-order/customer-create-order", {
    headers,
    body
  });
}


export const quseUploadFile = async (token: string | undefined, body: any) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "multipart/form-data");
  const res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + "upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
  });
  return res;
}

export const addToFavorite = async (token: string | undefined, body: { productID: number, locale: string }) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  const res = await POST("/favourite-product/add", {
    headers,
    //@ts-ignore
    body
  });
  return res;
}

export const removeFromFavorite = async (token: string | undefined, body: { productID: number, locale: string }) => {
  let headers: any = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Accept", "application/json");
  const res = await POST("/favourite-product/remove", {
    headers,
    //@ts-ignore
    body
  });
  return res;
}

export const getPrivacyPolicy = async (locale: string) => {
  const res = await GET("/privacy-policy", {
    params: {
      query: {
        locale,
      }
    }
  });
  return res;
}

export const getTermsAndConditions = async (locale: string) => {
  const res = await GET("/terms-and-condition", {
    params: {
      query: {
        locale,
      }
    }
  });
  return res;
}

export const requestResetPassword = async (body: any) => {
  const res = await POST("/auth/forgot-password", {
    body
  });
  return res;
}

export const resetPassword = async (body: any) => {
  const res = await POST("/auth/reset-password", {
    body
  });
  return res;
}

export const getFooter = async (locale: string) => {
  const res = await GET("/footer", {
    params: {
      query: {
        locale,
        populate: "logo,link_section,link_section.Links"
      }
    }
  });
  return res;
}

export const getAboutUs = async (locale: string) => {
  const res = await GET("/about-us", {
    params: {
      query: {
        locale,
        populate: "show_case_1,show_case_2,show_case_3,how_it_works,how_it_works.step,seo"
      }
    }
  });
  return res;
}

export const getPurchasePolicy = async (locale: string) => {
  const res = await GET("/purchase-policy", {
    params: {
      query: {
        locale
      }
    }
  });
  return res;
}

export const extractError = (error: any) => {
  //@ts-ignore
  if (error?.error?.details?.errors?.[0]?.message) {
    //@ts-ignore
    return error?.error.details.errors[0].message;
  }

  if (error?.error?.message) {
    return error?.error?.message;
  }
}

export const sendContactUs = async (body: any) => {
  const res = await POST("/email-template/sendContactUs", {
    body,
  });
  return res;
}