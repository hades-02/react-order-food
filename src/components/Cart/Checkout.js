import styles from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

const Checkout = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isSixDigits = (value) => value.trim().length === 6;
  const isTenDigits = (value) => value.trim().length === 10;

  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    hasError: nameIsNotValid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredPhone,
    enteredValueIsValid: enteredPhoneIsValid,
    hasError: phoneIsNotValid,
    inputChangeHandler: phoneInputChangeHandler,
    inputBlurHandler: phoneInputBlurHandler,
    reset: resetPhoneInput,
  } = useInput(isTenDigits);

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    hasError: emailIsNotValid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    enteredValue: enteredStreet,
    enteredValueIsValid: enteredStreetIsValid,
    hasError: streetIsNotValid,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredCity,
    enteredValueIsValid: enteredCityIsValid,
    hasError: cityIsNotValid,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredPostalCode,
    enteredValueIsValid: enteredPostalCodeIsValid,
    hasError: postalCodeIsNotValid,
    inputChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isSixDigits);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPhoneIsValid &&
    enteredEmailIsValid &&
    enteredCityIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid
  ) {
    formIsValid = true;
  }

  const checkoutHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostalCode,
    });

    resetNameInput();
    resetPhoneInput();
    resetEmailInput();
    resetStreetInput();
    resetCityInput();
    resetPostalCodeInput();
  };

  const nameControlClasses = `${styles.control} ${
    !nameIsNotValid ? "" : styles.invalid
  }`;
  const phoneControlClasses = `${styles.control} ${
    !phoneIsNotValid ? "" : styles.invalid
  }`;
  const emailControlClasses = `${styles.control} ${
    !emailIsNotValid ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    !streetIsNotValid ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    !cityIsNotValid ? "" : styles.invalid
  }`;
  const postalControlClasses = `${styles.control} ${
    !postalCodeIsNotValid ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={checkoutHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameIsNotValid && <p>Name must not be empty.</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          pattern="[0-9]+"
          onChange={phoneInputChangeHandler}
          onBlur={phoneInputBlurHandler}
          value={enteredPhone}
        />
        {phoneIsNotValid && <p>Phone number is not valid.</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailIsNotValid && <p>Email is not valid.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
        />
        {streetIsNotValid && <p>Street must not be empty.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
        {cityIsNotValid && <p>City name must not be empty.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          pattern="[0-9]+"
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeIsNotValid && <p>Postal code is not valid.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;