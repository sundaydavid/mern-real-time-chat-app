const express = require('express')
const {createChat, findUserChat, findChat} = require("../controllers/chatController")

const router = express.Router();

router.post('/', createChat)
router.get('/:userId', findUserChat)
router.get('/find/:sender/:reciever', findChat)

module.exports = router