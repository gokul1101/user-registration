const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

//* APP INTIALIZATION
const app = express();
const path = require("path");
const { DB, PORT } = require("./config/index");
//* MIDDLEWARES
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Router Middleware
app.use(require("./router/route"));

// Making Build Folder as Public
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const startApp = async () => {
  try {
    //* DB CONNECTION
    connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connected to DB \n${DB}`);

    //* Started listening to DB
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
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
