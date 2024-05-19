const Select = ({ label, options, handleChange, name }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={handleChange} name={name} defaultValue="">
        <option hidden value="">
          Select
        </option>
        {options.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
