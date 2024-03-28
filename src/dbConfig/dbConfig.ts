import mongoose from "mongoose";

export function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, please make sure mongoDB is running.  " +
          err,
      );
    });
  } catch (err) {
    console.log("Somthing goes wrong!");
    console.log(err);
  }
}
