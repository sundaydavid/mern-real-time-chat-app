import { Container, Stack } from "react-bootstrap";
import { useChatsContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserCard";
import { useAuthContext } from "../context/AuthContext";
import PotentialChat from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useAuthContext();
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useChatsContext();

  return (
    <Container>
      <PotentialChat />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="flex-grow-0 messages-box pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}

            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
            <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
