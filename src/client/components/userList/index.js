import { useMemo } from "react";
import UserListItem from "./userListItem";
const defaultPeopleData = new Array(6).fill({});

const UserList = ({
  data = defaultPeopleData,
}) => {

  const usersData = useMemo(() => data || defaultPeopleData, [data]);
  return (
    <ul className="userList">
      {
        usersData.map(({ name, picture }, idx) => {

          return (
            <UserListItem key={idx} name={name} picture={picture}/>
          );
        })
      }

      <style jsx>{`
        .userList {
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 10px;
          list-type: none;
          height: 550px;
          overflow: auto;
        }
      `}</style>
    </ul>
  );
};

export default UserList;
