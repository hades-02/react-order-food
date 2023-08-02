import { useReducer } from "react";

const initialInputState = {value: '', isTouched: false};

const inputStateReducer = (state,action) => {
  if(action.type === 'INPUT') {
    return {value: action.value, isTouched: state.isTouched};
  }
  if (action.type === 'BLUR') {
    return {value: state.value, isTouched: true};
  }
  return initialInputState;
}

const useInput = (checkValidity) => {
  const [inputState,dispatchFnc] = useReducer(inputStateReducer,initialInputState);

  const enteredValueIsValid = checkValidity(inputState.value);
  const hasError = !enteredValueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatchFnc({type: 'INPUT', value: event.target.value});
  };
  const inputBlurHandler = (event) => {
    dispatchFnc({type: 'BLUR'});
  };

  const reset = () => {
    dispatchFnc({type: 'RESET'});
  }

  return {
    enteredValue: inputState.value,
    enteredValueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
