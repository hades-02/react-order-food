import { useState } from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {

  const [cartButtonClicked, setCartButtonClicked] = useState(false);

  const CartButtonHandler = val => {
    setCartButtonClicked(val);
    return;
  }

  return (
    <CartProvider>
      {cartButtonClicked && <Cart onButtonClick={CartButtonHandler}/>}
      <Header onButtonClick={CartButtonHandler}/>
      <Meals/>
    </CartProvider>
  );
};

export default App;
