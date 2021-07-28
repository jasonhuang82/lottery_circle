import { useCallback, useEffect, useMemo } from "react";
import get from "lodash/get";
// components
import Layout from "components/layout";
import HeadingTitle from "components/headingTitle";
import UserList from "components/userList";
import TimerControl from "components/timerControl";
import WinnerDialog from "components/dialog/winnerDialog";
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
  const setWinnerToStore = useCallback((person) => dispatch(setWinnerInfo(person)), []);
  const genRandomWinner = useCallback(() => {
    const currentWinnerIdx = getRandomInt(0, peopleLimit);
    const currentWinner = get(data, currentWinnerIdx);
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
  // winner data
  const winnerName = useMemo(() => {
    const lastName = get(winner, "name.last", "") || "";
    const firstName = get(winner, "name.first", "") || "";
    if (!lastName) {
      return "";
    }
    return `${lastName} ${firstName}`;
  }, [winner]);
  const winnerPicture = useMemo(() => {
    const picture = get(winner, "picture.large") || "";
    if (!picture) {
      return "";
    }
    return picture;
  }, [winner]);

  const isAllowToPlay = useMemo(() => winnerPicture && winnerName, [winnerPicture, winnerName]);
  // timeout
  const handleTimeout = useCallback(() => {
    if (!isAllowToPlay) {
      console.error(`There is no winner data.`);
      return;
    }

    openDialog();
  }, [openDialog, isAllowToPlay]);
  
  return (
    <Layout title="Lottery Game">
      <div className="home">
        <div className="container">
          <div className="homeContent">
            <section className="homeLotteryTime">
              <HeadingTitle title="抽獎時間" type="h3"/>
              <TimerControl
                disabled={!isAllowToPlay}
                onTimeReset={genRandomWinner}
                onTimeout={handleTimeout}
              />
            </section>
            <section className="homeLotteryPeople">
              <HeadingTitle title="參與抽獎名單" type="h3"/>
              <UserList data={data}/>
            </section>
          </div>
          <WinnerDialog
            isOpen={isOpen}
            timeout={400}
            classNames="dialog-transition"
            name={winnerName}
            picture={winnerPicture}
            onCancel={closeDialog}
            onClose={closeDialog}
          />
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
        `}</style>
      </div>
    </Layout>
  )
}

export default withRedux(Home);
