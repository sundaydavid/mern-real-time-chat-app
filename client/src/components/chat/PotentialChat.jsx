import { useAuthContext } from "../../context/AuthContext";
import { useChatsContext } from "../../context/ChatContext";

const PotentialChat = () => {
  const { potentialChat, createChat, onlineUsers } = useChatsContext();
  const { user } = useAuthContext();

  return (
    <>
      <div className="all-users">
        {potentialChat &&
          potentialChat.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChat;
