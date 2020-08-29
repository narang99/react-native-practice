import { useReducer } from "react";

const FORM_UPDATE_ACTION = "FORM_UPDATE_ACTION";
const inputFormReducer = (state, action) => {
  if (action.type === FORM_UPDATE_ACTION) {
    const inputs = { ...state.inputs, [action.id]: action.value };
    const valids = { ...state.valids, [action.id]: action.validity };
    let isFormValid = true;
    for (const key in valids) {
      isFormValid = isFormValid && valids[key];
    }
    return { inputs, valids, isFormValid };
  }
  return state;
};

const useFormValidator = (inputs, valids, isFormValid) => {
  const [formState, formDispatch] = useReducer(inputFormReducer, {
    inputs,
    valids,
    isFormValid,
  });

  const inputChangeHandler = (id, text) => {
    let validity = true;
    if (text.trim().length === 0) {
      validity = false;
    }
    formDispatch({ type: FORM_UPDATE_ACTION, id, value: text, validity });
  };

  return [formState, inputChangeHandler];
};

export default useFormValidator;
