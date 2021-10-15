const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const chatRoomsMap = new Map();

const randomMessagesArray =  [
    {
        "receivedAt": Date.now().toLocaleString(),
        "body": "incoming message!",
        "direction": "incoming"
    },
    {
        "receivedAt": Date.now().toLocaleString(),
        "body": "outgoing message!",
        "direction": "outgoing"
    }
];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const addNewMassages = (room_id) => {
    const randomOfMessages = getRandomInt(0, 3);

    for (let i = 0; i < randomOfMessages; i++) {
        const randomMessage = randomMessagesArray[getRandomInt(0, 1)];
        const chatRoom = chatRoomsMap.get(room_id);

        chatRoom.body.push(randomMessage);
        chatRoomsMap.set(room_id, chatRoom);
    }
};

/**
 * generate random chat rooms
 */
const generateChatRooms = () => {
    const numberOfChatRooms = getRandomInt(0, 9);
    for (let i = 0; i < numberOfChatRooms; i++) {
        chatRoomsMap.set(i.toString(), {
            "roomId": i.toString(),
            "fromName": `user${i}`,
            "fromNumber": `054-${i}${i}${i}${i}${i}${i}`,
            "body": []
        })

        addNewMassages(i.toString());
    }
};

app.use(cors());

/**
 * Check if the server is running
 */
app.get('/ping', (req, res) => {
  res.status(200).send('pong')
});

/**
 * Will return an array of the chat rooms
 */
app.get('/api/get_chat_rooms', (req, res) => {
    const chatRoomsArray = [ ...chatRoomsMap.keys() ]

    res.status(200).send({ 
        number_of_rooms: chatRoomsArray.length,
        chat_rooms: chatRoomsArray
    })
});

/**
 * Will return an array of messages for specific chat-room
 * this data will be mocked locally in the server (can be generated on the fly).
 */
app.get('/api/get_chat/:room_id', (req, res) => {
    const room_id = req.params.room_id
    const chatRoom = chatRoomsMap.get(room_id)

    res.status(200).send(chatRoom)
});

/**
 * Will return a new message in JSON format - the message will be taken randomly from a local
 * array of messages (as seen above) that include the chat-room-id
 * It can return randomly empty / full response - to simulate a real chat feeling
 */
app.post('/api/ping_message', (req, res) => {
    const { room_id } = req.body;
    addNewMassages(room_id);
    res.status(200).send(chatRoomsMap.get(room_id));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

generateChatRooms();
