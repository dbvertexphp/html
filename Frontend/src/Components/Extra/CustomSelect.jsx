import React, { useState } from "react";
import Select from "react-select";
const indianStates = [
  { state_code: "AP", state_name: "Andhra Pradesh" },
  { state_code: "AR", state_name: "Arunachal Pradesh" },
  { state_code: "AS", state_name: "Assam" },
  { state_code: "BR", state_name: "Bihar" },
  { state_code: "CT", state_name: "Chhattisgarh" },
  { state_code: "GA", state_name: "Goa" },
  { state_code: "GJ", state_name: "Gujarat" },
  { state_code: "HR", state_name: "Haryana" },
  { state_code: "HP", state_name: "Himachal Pradesh" },
  { state_code: "JH", state_name: "Jharkhand" },
  { state_code: "KA", state_name: "Karnataka" },
  { state_code: "KL", state_name: "Kerala" },
  { state_code: "MP", state_name: "Madhya Pradesh" },
  { state_code: "MH", state_name: "Maharashtra" },
  { state_code: "MN", state_name: "Manipur" },
  { state_code: "ML", state_name: "Meghalaya" },
  { state_code: "MZ", state_name: "Mizoram" },
  { state_code: "NL", state_name: "Nagaland" },
  { state_code: "OD", state_name: "Odisha" },
  { state_code: "PB", state_name: "Punjab" },
  { state_code: "RJ", state_name: "Rajasthan" },
  { state_code: "SK", state_name: "Sikkim" },
  { state_code: "TN", state_name: "Tamil Nadu" },
  { state_code: "TS", state_name: "Telangana" },
  { state_code: "TR", state_name: "Tripura" },
  { state_code: "UP", state_name: "Uttar Pradesh" },
  { state_code: "UK", state_name: "Uttarakhand" },
  { state_code: "WB", state_name: "West Bengal" },
  { state_code: "AN", state_name: "Andaman and Nicobar Islands" },
  { state_code: "CH", state_name: "Chandigarh" },
  { state_code: "DN", state_name: "Dadra and Nagar Haveli and Daman and Diu" },
  { state_code: "DL", state_name: "Delhi" },
  { state_code: "JK", state_name: "Jammu and Kashmir" },
  { state_code: "LA", state_name: "Ladakh" },
  { state_code: "LD", state_name: "Lakshadweep" },
  { state_code: "PY", state_name: "Puducherry" },
];

const ColorSelect = ({ HandleChange, name, colors, defaultValue }) => {
  let newArr = colors?.map((el) => {
    el.label = el.name;
    el.value = el._id;
    return el;
  });

  let defaultVal = newArr?.filter((el, index) => {
    return el.name === defaultValue;
  });

  return (
    <>
      <Select
        options={newArr}
        value={defaultVal[0]}
        onChange={(v) => {
          let e = {};
          e.target = {
            name: name,
            label: v.name,
            value: v._id,
          };
          HandleChange(e);
        }}
      />
    </>
  );
};

const StatesArrOfObj = indianStates.map((state) => ({
  label: state.state_name,
  value: { state_name: state.state_name, state_code: state.state_code },
}));

const StateSelect = ({ HandleChange, name }) => {
  return (
    <>
      <Select
        options={StatesArrOfObj}
        onChange={(e) => {
          HandleChange(e);
        }}
      />
    </>
  );
};

export { StateSelect, ColorSelect };
