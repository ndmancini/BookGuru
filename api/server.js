var express = require("express");
var app = express();
const routes = require("./routes");
const db = require("./db/index");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
//require('./db/models/index')
const { Book, User, Rating } = require("./db/models");
const { seedBooks, seedUsers, seedRatings } = require("./db/seed");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

db.sync({ force: true }).then(() => {
  const userPromise = User.bulkCreate(seedUsers, { individualHooks: true });
  const bookPromise = Book.bulkCreate(seedBooks);

  Promise.all([userPromise, bookPromise]).then(() => {
    Rating.bulkCreate(seedRatings).then(() =>
      console.log("Everything created")
    );
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
