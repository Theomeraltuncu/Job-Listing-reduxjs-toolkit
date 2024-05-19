const Error = ({ retry, message }) => {
  return (
    <div className="error">
      <p>Sorry. There was an error occured.</p>
      <p className="text">{message}</p>

      <button className="btn-try" onClick={retry}>
        Try again
      </button>
    </div>
  );
};

export default Error;
