import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartTotalAmount = cartCtx.totalAmount.toFixed(2);

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={removeItemHandler.bind(null, item.id)}
        onAdd={addItemHandler.bind(null, item)}
      />
    );
  });

  const submitFormHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-order-f2ad9-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const closeButtonHandler = () => {
    props.onButtonClick(false);
  };

  const cancelButtonHandler = () => {
    setIsCheckout(false);
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button-alt"]} onClick={closeButtonHandler}>
        Close
      </button>
      {cartTotalAmount > 0 && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitContent = (
    <Fragment>
      {isSubmitting && <p>Submitting your order data...</p>}
      {submitted && <p>Successfully recieved your order.</p>}
      {submitted && (
        <div className={styles.actions}>
          <button className={styles.button} onClick={closeButtonHandler}>
            Close
          </button>
        </div>
      )}
    </Fragment>
  );

  return (
    <Modal onBackdropClick={closeButtonHandler}>
      {!isCheckout && <ul className={styles["cart-items"]}>{cartItems}</ul>}
      {!isSubmitting && !submitted && (
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>${cartTotalAmount}</span>
        </div>
      )}
      {!isCheckout && modalActions}
      {!isSubmitting && !submitted && isCheckout && (
        <Checkout
          onConfirm={submitFormHandler}
          onCancel={cancelButtonHandler}
        />
      )}
      {submitContent}
    </Modal>
  );
};

export default Cart;
