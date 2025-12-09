import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, { resetOnSubmit = true } = {}) => {
  const [values, setValues] = useState(initialValues);

  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, 
      [name]: name === "price" ? Number(value) : value,
  }));
  };

  
  const setFieldValue = (path, value) => {
    setValues((state) => {
      const newState = { ...state };
      const keys = path.split('.');
      let obj = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
        obj[k] = Array.isArray(obj[k]) ? [...obj[k]] : { ...obj[k] };
        obj = obj[k];
      }
      const lastKey = keys[keys.length - 1];
      obj[isNaN(lastKey) ? lastKey : Number(lastKey)] = value;
      return newState;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler(values);
    if (resetOnSubmit) setValues(initialValues);
  };

  const changeValues = (newValues) => setValues(newValues);

  return { values, changeHandler, setFieldValue, onSubmit, changeValues };
};