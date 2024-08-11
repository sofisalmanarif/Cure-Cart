import mongoose from "mongoose";
export const connectDb = (mongoURI) => {
  try {
    mongoose
  .connect(mongoURI, {
    dbName: "curecart",
  })
  .then(() => {
    console.log("database connected");
  });
  } catch (error) {
    console.log(error.message)
  }
  
}


