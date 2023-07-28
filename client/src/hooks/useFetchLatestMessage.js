import { useEffect, useState } from "react";
import { useChatsContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const usefetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useChatsContext();
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response.error) {
        return console.log("Error getting message...", error);
      }

      const lastMessage = response[response?.length - 1];

      setLatestMessage(lastMessage);
    };
    getMessage();
  }, [newMessage, notifications]);

  return { latestMessage };
};
