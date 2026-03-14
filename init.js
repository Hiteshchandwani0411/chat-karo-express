const mongoose = require("mongoose");
const Chat = require("./models/chat");

Chat.insertMany([
  {
    from: "Kunal",
    to: "Hitesh",
    msg: "Paneer ban raha hai, aaja!",
    created_at: new Date(),
  },
  {
    from: "Sneha",
    to: "Aditi",
    msg: "Did you finish the assignment yet?",
    created_at: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    from: "Manager",
    to: "Team",
    msg: "The meeting is pushed to 4 PM.",
    created_at: new Date(),
  },
  {
    from: "Hitesh",
    to: "Kunal",
    msg: "Rasta bhul gaya yaar, location bhej.",
    created_at: new Date(),
  },
  {
    from: "Rahul",
    to: "Amit",
    msg: "Game on tonight? 🎮",
    created_at: new Date(),
  },
]);

main().then(() => {
  console.log("Connection Successful");
});

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/chatkaro");
}
