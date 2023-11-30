import React, { useEffect, useState } from "react";

import AsyncSelect from "react-select/async";
import { useDispatch } from "react-redux";

const AsyncSelector = ({
  placeholder,
  handleChangeFn,
  getItems,
  defaultValue,
  token,
}) => {
  const [items, setitems] = useState([]);
  let dispatch = useDispatch();

  defaultValue = defaultValue || "";
  defaultValue = items.find((el) => el.value == defaultValue);

  const getData = () => {
    dispatch(getItems(setitems, token));
  };

  const filterItems = (inputValue) => {
    if (!inputValue) {
      return items;
    }
    return items.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterItems(inputValue));
    }, 300);
  };

  useEffect(() => {
    getData();
  }, []);
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  return (
    <>
      {items?.length > 0 && (
        <AsyncSelect
          styles={customStyles}
          cacheOptions
          value={defaultValue}
          loadOptions={loadOptions}
          defaultOptions
          onChange={(val) => handleChangeFn(val)}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default AsyncSelector;
