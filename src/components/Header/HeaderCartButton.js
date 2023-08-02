import CartIcon from "../Cart/CartIcon.js";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext.js";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const buttonHandler = () => {
    props.onButtonClick(true);
  };

  const cartCtx = useContext(CartContext);

  const [btnAnimation,setBtnAnimation] = useState(false);

  const numberOfItemsInCart = cartCtx.items.reduce((acc,item) => {
    return acc + item.amount;
  }, 0);

  const btnStyles = `${styles.button} ${btnAnimation ? styles.bump : ''}`;

  useEffect(() => {
    if (numberOfItemsInCart === 0){
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    },300);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfItemsInCart]);

  return (
    <button className={btnStyles} onClick={buttonHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
