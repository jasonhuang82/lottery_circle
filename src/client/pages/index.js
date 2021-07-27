import { useCallback, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import get from "lodash/get";
// components
import Layout from "components/layout";
import HeadingTitle from "components/headingTitle";
import UserList from "components/userList";
import TimerControl from "components/timerControl";
import Dialog from "components/dialog";
import useDialogControl from "components/dialog/useDialogControl";
// hook
import useGetPeople from "hooks/useGetPeople";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setWinnerInfo } from "lib/redux/action";
import withRedux from "lib/redux/withRedux";
// utils
import getRandomInt from "utils/getRandomInt";
function Home() {
  // handle winner state
  const peopleLimit = 15;
  const { loading, data } = useGetPeople({ limit: peopleLimit });
  const dispatch = useDispatch();
  const winner = useSelector(state => state.winner);
  const setWinnerToStore = useCallback((person) => {
    dispatch(setWinnerInfo(person));
  }, []);

  const genRandomWinner = useCallback(() => {
    const currentWinnerIdx = getRandomInt(0, peopleLimit);
    const currentWinner = data[currentWinnerIdx];
    if (!currentWinner) {
      console.log(`There is no any winner.`);
      return;
    }

    const winnerInfo = {
      id: get(currentWinner, "id.value", ""),
      name: {
        last: get(currentWinner, "name.last", ""),
        first: get(currentWinner, "name.first", ""),
      },
      picture: {
        large: get(currentWinner, "picture.large", ""),
        medium: get(currentWinner, "picture.medium", ""),
        thumbnail: get(currentWinner, "picture.thumbnail", ""),
      },
      nat: get(currentWinner, "nat", ""),
      email: get(currentWinner, "email", ""),
      phone: get(currentWinner, "phone", ""),
      gender: get(currentWinner, "gender", ""),
    };
    setWinnerToStore(winnerInfo);
  }, [data]);

  // generate random winner again when refetch data
  useEffect(() => {
    if (!loading && data) {
      genRandomWinner();
    }
  }, [loading, data, genRandomWinner]);


  // dialog
  const [isOpen, openDialog, closeDialog] = useDialogControl();

  // timeout
  const handleTimeout = useCallback(() => {
    openDialog();
  }, [winner, openDialog]);
  

  
  return (
    <Layout
      title="Lottery Game"
    >
      <div className="home">
        <div className="container">
          <div className="homeContent">
            <section className="homeLotteryTime">
              <HeadingTitle title="抽獎時間" type="h3"/>
              <TimerControl
                onTimeReset={genRandomWinner}
                onTimeout={handleTimeout}
              />
            </section>

            <section className="homeLotteryPeople">
              <HeadingTitle title="參與抽獎名單" type="h3"/>
              <UserList data={data}/>
            </section>
          </div>

          <CSSTransition in={isOpen} timeout={400} classNames="dialog-transition" unmountOnExit>
            <Dialog
              id="homeDialog"
              onCancel={closeDialog}
              onClose={closeDialog}
            >
              <div className="homeDialogContent">
                <div className="homeDialogTitle">抽獎結果</div>
                <div className="homeDialogCard">
                  <div className="homeDialogCardPicture"></div>
                  <div className="homeDialogCardTitle">
                    得獎人：{ get(winner, "name.last", "") } { get(winner, "name.first", "") }
                  </div>
                </div>
              </div>
            </Dialog>
          </CSSTransition>
        </div>
        <style jsx>{`
          .home {
            padding: 80px 0;
          }
          .homeContent {
            @media (min-width: 1024px) {
              display: flex;
            }

            .homeLotteryTime {
              flex: 8;
              margin-bottom: 80px;
              @media (min-width: 1024px) {
                margin-bottom: 0px;
              }
            }
            .homeLotteryPeople {
              flex: 4;
            }
          }

          /* homeDialog */
          :global(.dialog-transition-enter) {
            opacity: 0;
          }
          :global(.dialog-transition-enter-active) {
            opacity: 1;
            transition: opacity 400ms;
          }
          :global(.dialog-transition-exit) {
            opacity: 1;
          }
          :global(.dialog-transition-exit-active) {
            opacity: 0;
            transition: opacity 400ms;
          }

          :global(#homeDialog) {
            :global(.dialogContent) {
              max-width: 320px;
            }
          }
          
          .homeDialogContent {
            display: flex;
            flex-direction: column;
            align-items: center;
            .homeDialogTitle {
              font-size: 32px;
              margin-bottom: 15px;
            }

            .homeDialogCardPicture {
              display: inline-block;
              width: 100%;
              padding: 45%;
              max-width: 230px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              background-color: #eee;
              ${get(winner, "picture.large") && `background-image: url(${get(winner, "picture.large")});`}
            }

            .homeDialogCard {
              width: 100%;
              text-align: center;
              img {
                display: inline-block;
                width: 100%;
                max-width: 230px;
              }
            }

            .homeDialogCardTitle {
              font-size: 16px;
              margin-top: 15px;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default withRedux(Home);
