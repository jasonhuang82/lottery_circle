import { useCallback, useEffect } from "react"
// components
import Layout from "components/layout";
import HeadingTitle from "components/headingTitle";
import UserList from "components/userList";
import TimerControl from "components/timerControl";
// hook
import useGetPeople from "hooks/useGetPeople";
// redux
import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
import { setWinnerInfo } from "lib/redux/action";
import withRedux from "lib/redux/withRedux";
// utils
import getRandomInt from "utils/getRandomInt";
function Home() {
  const peopleLimit = 15;
  const { loading, data, error } = useGetPeople({ limit: peopleLimit });
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
    setWinnerToStore(currentWinner);
  }, [data]);

  useEffect(() => {
    if (!loading && data) {
      genRandomWinner();
    }
  }, [loading, data, genRandomWinner]);

  const handleTimeout = useCallback(() => {
    alert(`lastName:${winner?.name.last} ${winner?.name.first}`);
  }, [winner]);

  
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
