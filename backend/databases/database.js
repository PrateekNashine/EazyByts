import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Portfolio",
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((error) => {
      console.log(`Database connection error${error}`);
    });
};

export default databaseConnection;
