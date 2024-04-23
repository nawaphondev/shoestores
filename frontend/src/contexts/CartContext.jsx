/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextProvider(props) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useQuery({
    queryKey: ["shoppingCartItems"],
    queryFn: fetchCart,
    enabled: !!user,
  });

  async function fetchCart() {
    const res = await axios.get(
      "http://localhost:3001/api/carts/get/" + user.shoppingCart.id
    );
    if (res.status === 200) {
      setCart(res.data.shoppingCartItems);
    }
    return res.data.shoppingCartItems;
  }

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContextProvider };
export default CartContext;
