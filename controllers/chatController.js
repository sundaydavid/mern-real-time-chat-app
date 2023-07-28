const ChatModel = require("../models/chatModel");

//create chat
const createChat = async (req, res) => {
  const {sender, reciever} = req.body;

  try {
    const chat = await ChatModel.findOne({
      members: { $all: [sender, reciever] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new ChatModel({
      members: [sender, reciever],
    });

    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get all chat
const findUserChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//find a certain chat
const findChat = async (req, res) => {
    const {sender, reciever} = req.params;
  
    try {
      const chats = await ChatModel.findOne({
        members: { $all: [sender, reciever] },
      });
  
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  module.exports = { createChat, findUserChat, findChat };