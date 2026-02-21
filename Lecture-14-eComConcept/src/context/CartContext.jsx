import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [toastClosing, setToastClosing] = useState(false); // FIXED

  const addToCart = (product) => {
    setCart([...cart, product]);

    setToast("Product added to Cart!");
    setToastClosing(false);
    setTimeout(() => {
      setToastClosing(true);
    }, 1700);
    setTimeout(() => {
      setToast(null);
    }, 2200);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item)=> item.id !== id)
    setCart(newCart)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart }}>
      {children}

      {toast && (
        <div
          className={`
            fixed top-5 right-5  
            bg-green-500 text-white font-medium  
            px-5 py-3 rounded-xl shadow-lg  
            flex items-center gap-3
            ${toastClosing ? "toast-exit" : "toast-enter"}
          `}
        >
          <i className="fas fa-check-circle text-xl"></i>
          <span>{toast}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};
