
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model") //dont forget to import drone.model file so mongoDB works

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const drones = [
    {
      name: "Drone 1",
      propellers: 4,
      maxSpeed: 18,
    },
    {
      name: "Drone 2",
      propellers: 3,
      maxSpeed: 10,
    },
    {
     name: "Drone 3",
     propellers: 2,
     maxSpeed: 8,
    },
  ];

  Drone.create(drones)
  .then((dronesFromDB) => {
    console.log(`Created ${dronesFromDB.length} drones`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating drones from the DB: ${err}`)
  );
