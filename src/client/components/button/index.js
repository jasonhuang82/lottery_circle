const Button = ({ children, ...nextProps}) => {

  return (
    <button {...nextProps}>
      { children }
      <style jsx>{`
        button {
          background-color: #3a3a3a;
          color: #fff;
          border: none;
          outline: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          &:disabled {
            cursor: not-allowed;
          }
        }
      `}</style>
    </button>
  );
};

export default Button;
