import noop from "lodash/noop";
import { CSSTransition } from 'react-transition-group';
import Dialog from "components/dialog";

const WinnerDialog = ({
  isOpen = false,
  timeout = 400,
  classNames = "dialog-transition",
  picture = "",
  name = "",
  onClose = noop,
  onCancel = noop,
}) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={timeout}
      classNames={classNames}
      unmountOnExit
    >
      <Dialog
        id="winnerDialog"
        onCancel={onCancel}
        onClose={onClose}
      >
        <div className="winnerDialogContent">
          <div className="winnerDialogTitle">抽獎結果</div>
          <div className="winnerDialogCard">
            <div className="winnerDialogCardPicture"></div>
            <div className="winnerDialogCardTitle">
              得獎人： { name } 
            </div>
          </div>
        </div>
        <style jsx>{`
          :global(.dialog-transition-enter) {
            opacity: 0;
          }
          :global(.dialog-transition-enter-active) {
            opacity: 1;
            transition: opacity ${timeout}ms;
          }
          :global(.dialog-transition-exit) {
            opacity: 1;
          }
          :global(.dialog-transition-exit-active) {
            opacity: 0;
            transition: opacity ${timeout}ms;
          }

          :global(#winnerDialog) {
            :global(.dialogContent) {
              max-width: 320px;
            }
          }
          
          .winnerDialogContent {
            display: flex;
            flex-direction: column;
            align-items: center;
            .winnerDialogTitle {
              font-size: 32px;
              margin-bottom: 15px;
            }

            .winnerDialogCardPicture {
              display: inline-block;
              width: 100%;
              padding: 45%;
              max-width: 230px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              background-color: #eee;
              ${ picture && `background-image: url(${picture});` }
            }

            .winnerDialogCard {
              width: 100%;
              text-align: center;
              img {
                display: inline-block;
                width: 100%;
                max-width: 230px;
              }
            }

            .winnerDialogCardTitle {
              font-size: 16px;
              margin-top: 15px;
            }
          }
        `}</style>
      </Dialog>
    </CSSTransition>
  );
};

export default WinnerDialog;
