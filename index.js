const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

//* APP INTIALIZATION
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const { DB, PORT } = require("./config/index");
const User = require("./models/User");
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
};
//* MIDDLEWARES

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Router Middleware
app.use(require("./router/route"));

const io = require("socket.io")(server, {
  cors: true,
  origins: "*",
});

// Making Build Folder as Public
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
const getUsers = async () => {
  let users = await User.find({});
  return users;
};
const startApp = async () => {
  let users = [];
  try {
    //* DB CONNECTION
    connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to DB \n${DB}`);

    //* Socket Connection
    io.sockets.on("connection", async (socket) => {
      users = await getUsers();
      socket.on("new", (data) => {
        users = [...users, data];
        io.sockets.emit("users", users);
      });
      socket.on("remove", (data) => {
        users = users.filter((user) => user.email !== data.email);
        io.sockets.emit("users", users);
      });
    });
    //* Started listening to DB
    server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err) {
    //! Error in connecting DB
    console.log({
      message: `Unable to connect with DB \n${err}`,
      badge: true,
    });
    startApp();
  }
};
startApp();
