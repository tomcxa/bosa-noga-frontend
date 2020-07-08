import React, { useState } from "react";
import { useLocalStorage } from "react-use";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  const defaultAnchors = {
    q: "",
    categoryId: "",
    offset: 0,
  };

  const defaultCart = {
    items: [
      // {
      //   id: 123,
      //   title: "Босоножки 'MYER'",
      //   size: "18 US",
      //   count: 1,
      //   price: 34000,
      //   totalPrice: 34000,
      // },
    ],
  };

  const defaultOrderStatus = {
    loading: false,
    success: false,
    error: false,
  };

  const [search, setSearch] = useState("");
  const [anchors, setAnchors] = useState(defaultAnchors);
  const [cart, setCart, remove] = useLocalStorage("cart", defaultCart);
  const [orderStatus, setOrderStatus] = useState(defaultOrderStatus);

  function changeAnchors(newValue) {
    setAnchors((prev) => ({ ...prev, ...newValue }));
  }

  function changeSearch(input) {
    setSearch(input);
  }

  function orderStatusChange(newStatus) {
    setOrderStatus((prev) => ({ ...prev, ...newStatus }));
  }

  function addToCart(item) {
    const items = cart?.items ? [...cart.items] : [];
    const index = items.findIndex(
      (o) => o.id === item.id && o.size === item.size
    );
    if (index !== -1) {
      const updatedItem = items[index];
      updatedItem.count = Math.min(updatedItem.count + item.count, 10);
    } else {
      items.push(item);
    }
    console.log(items);
    setCart({ items });
  }

  function removeFromCart(id) {
    const items = [...cart.items].filter((item) => item.id + item.size !== id);
    setCart({ items });
  }

  return (
    <GlobalContext.Provider
      value={{
        anchors,
        changeAnchors,
        search,
        changeSearch,
        cart,
        addToCart,
        removeFromCart,
        remove,
        orderStatus,
        orderStatusChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
