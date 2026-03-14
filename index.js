const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  if (req.path === "/") res.locals.currPage = "home";
  else if (req.path === "/chats") res.locals.currPage = "allChats";
  else if (req.path === "/chats/new") res.locals.currPage = "newChat";
  else res.locals.currPage = "";

  next();
});

main()
  .then(() => {
    console.log("Conection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/chatkaro");
}

const port = 8000;

app.get("/", (req, res) => {
  console.log("Working");
  res.render("home");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find().sort({ created_at: -1});
  // console.log(chats);
  res.render("index", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;

  let chat = await Chat.findById({ _id: id });
  res.render("edit", { chat });
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((result) => {
      console.log("Chat saved!");
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
      res.send("Error saving chat");
    });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg, updated_at: new Date() },
    { runValidators: true, new: true },
  );

  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;

  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on Port ${port}`);
});
