import { Stack } from "react-bootstrap";
import { usefetchRecipientUser } from "../../hooks/useFetchReciepient";
import avatar from "../../assets/avatar.svg";
import { useChatsContext } from "../../context/ChatContext";
import { unreadNotificationFunc } from "./../../utils/unreadNotifications";
import { usefetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = usefetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useChatsContext();
  const { latestMessage } = usefetchLatestMessage(chat);

  const unreadNotification = unreadNotificationFunc(notifications);

  const thisUserNotification = unreadNotification?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncatetext = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card 
      align-items-center 
      p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotification?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotification, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="36px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncatetext(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotification?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotification?.length > 0 ? thisUserNotification?.length : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
