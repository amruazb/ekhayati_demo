'use client'
import { getEmailFromLocalCookie, getIdFromServerCookie, getToken, getTokenFromLocalCookie, getUserIDFromLocalCookie, getUserNameFromLocalCookie, removeToken } from '@/utils';
import { clearCart, getUserCart } from '@/utils/cart';
import { createCustomOder } from "@/provider";
import { useRouter } from "@/utils";
import { createContext, useContext, useEffect, useState } from 'react';

interface IUser {
  id: any;
  name: any;
  email: any;
}
const AuthContext = createContext<{
  token: string;
  setToken: (token: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: IUser;
  setUser: (user: IUser) => void;
  checkAuth: any;
  cartItemCount: number;
  setCartItemCount: (i: number) => void;
  logout: () => void;
}>({
  token: '',
  setToken: (token: string) => { },
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => { },
  user: {
    id: '',
    name: '',
    email: ''
  },
  setUser: (user: IUser) => { },
  checkAuth: () => { },
  cartItemCount: 0,
  setCartItemCount: (i: number) => { },
  logout: () => { }
});

export const useAuth = () => {
  return useContext(AuthContext);
}

/**
 * Component that provides authentication context to its children.
 * @param children - The child components.
 * @returns The component that provides authentication context.
 */
export default function AuthContextProvider({ children }: any) {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    id: undefined,
    name: '',
    email: ''
  });
  const [cartItemCount, setCartItemCount] = useState(0);


  const checkAuth = () => {
    const token = getTokenFromLocalCookie();
    const id = getUserIDFromLocalCookie();
    const name = getUserNameFromLocalCookie();
    const email = getEmailFromLocalCookie();
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      setUser({
        id,
        name,
        email
      });
      return true;
    }
    return false;
  }

  const checkCart = () => {
    const isAuthenticated = checkAuth();
    const cart = getUserCart();
    if ((cart?.mekhwar || cart?.custom) && isAuthenticated) {
      setCartItemCount(
        cart?.custom.reduce((c: any, p: { quantity: any; }, a: any) => (p?.quantity || 0) + c, 0)
      );
    }
  }

  const handleLocalStorageUpdate = () => {
    if (window !== undefined) {
      checkCart();
    }
  }

  useEffect(() => {
    checkAuth();
    //@ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (window !== undefined) {
      window.addEventListener("storage", handleLocalStorageUpdate);
      checkCart();
    }
    return () => {
      //@ts-ignore
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.removeEventListener('storage', handleLocalStorageUpdate);
    }
  }, []);

  useEffect(() => {
    const handlePendingCustomization = async () => {
      if (!isAuthenticated) return;
  
      const pendingCustomization = sessionStorage.getItem("pendingCustomization");
      if (!pendingCustomization) return;
  
      try {
        const customizationData = JSON.parse(pendingCustomization);
  
        const { data }: any = await createCustomOder(token, customizationData);
  
        if (data?.orderId) {
          // Redirect to the checkout address after successful order creation
          sessionStorage.setItem("redirectTo", `/en/checkout/address?orderType=custom&orderId=${data.orderId}`);
          router.push({
            pathname: "/checkout/address",
            query: {
              orderType: "custom",
              orderId: data.orderId,
            },
          });
          // Clear pending customization data
          sessionStorage.removeItem("pendingCustomization");
        } else {
          console.error("Order ID not found in the response.");
        }
      } catch (error: any) {
        console.error("Error creating order:", error.message || error);
      }
    };
  
    handlePendingCustomization();
  }, [isAuthenticated]);
  
  

  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
    if (window !== undefined) {
      clearCart();
      setUser({
        email: "",
        id: "",
        name: ""
      });
      localStorage.clear();
      removeToken()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        checkAuth,
        cartItemCount,
        setCartItemCount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
