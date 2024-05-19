import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);

  const arr = jobs.map((job) => job[name]);

  const filteredSet = new Set(arr);

  const options = Array.from(filteredSet);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input list="values" name={name} id={{ label }} type="text" required />
      <datalist id={name}>
        {options.map((i) => (
          <option value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
