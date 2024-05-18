const mongoose = require('mongoose');
require("dotenv").config({ path: "../config/config.env" });

const connectDb = async () => {
  try {
    
    const connector = await mongoose.connect('mongodb+srv://circuloponto:Cor_01_Tez@cluster0.ntexneq.mongodb.net/?retryWrites=true&w=majority', { dbName: 'NodePlus' });
    const dbName = connector.connection?.db?.databaseName;
    console.log('db connected to', dbName)
  } catch (error) {

    console.log('db error: ', error)
  }
}

exports.connectDb = connectDb;