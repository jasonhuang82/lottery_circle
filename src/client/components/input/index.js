

const Input = (props) => {

  return (
    <div className="customInput">
      <input {...props}/>
      <style jsx>{`
        .customInput {
          display: inline-block;
          input {
            display: inline-block;
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 8px 12px;
            outline: none;
          }
        }
        
      `}</style>

    </div>
  );
};

export default Input;
