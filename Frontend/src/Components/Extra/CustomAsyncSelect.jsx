import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = ({ placeholder, handleChangeFn, defaultValue, token, apiCall, onChange }) => {
  const [items, setItems] = useState([]);

  const getData = async inputValue => {
    if (inputValue) {
      // केवल जब इनपुट में कुछ हो, तब ही कॉल होगा
      // और तब तक्करीबन 300 मिलीसेकंड के बाद विकल्पों को अपडेट करेगा
      //setItems(await getItems(token, inputValue));
    }
  };

  const filterItems = inputValue => {
    if (!inputValue) {
      return items;
    }
    return items.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterItems(inputValue));
      getData(inputValue); // यहां getData को बुलाएं
    }, 300);
  };

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%'
    })
  };
  const handleKeyUp = event => {
    console.log('defaultValue', items);
  };
  const handleInputChange = async value => {
    setItems(value);
    console.log('Input value changed:', items);
  };

  return (
    <AsyncSelect
      styles={customStyles}
      cacheOptions
      loadOptions={loadOptions}
      placeholder={placeholder}
      onInputChange={apiCall}
      value={defaultValue}
      //onKeyDown={handleKeyUp}
      onChange={onChange}
    />
  );
};

export default CustomAsyncSelect;
