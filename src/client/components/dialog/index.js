import { createPortal } from "react-dom";
import cx from "classnames";
import noop from "lodash/noop";
const Dialog = ({
  children,
  rootEl,
  id="",
  className = "",
  onClose = noop,
  onCancel = noop,
}) => {

  
  if (typeof window === "undefined") {
    return null;
  }

  const rootElement = rootEl || document.body;

  return createPortal(
    <div id={id} className={cx("dialog", className)}>
      <div className="backgroundDrop" onClick={onCancel}></div>
      <div className="dialogContent">
        <div className="dialogClose" onClick={onClose}>&times;</div>
        { children }
      </div>
      <style jsx>{`
        .dialog {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          .backgroundDrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(#000, 0.5);
            z-index: 0;
          }
          .dialogContent {
            position: relative;
            z-index: 1;
            width: 80%;
            max-width: 750px;
            background-color: #fff;
            min-height: 300px;
            border-radius: 5px;
            padding: 35px 25px;
          }

          .dialogClose {
            position: absolute;
            top: 0px;
            right: 8px;
            font-size: 30px;
            cursor: pointer;
          }
        }
      
      `}</style>
    </div>,
    rootElement
  );
};

export default Dialog;
