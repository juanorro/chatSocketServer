const mongoose = require('mongoose');

const mongoConnection = async () => {
  try {

    await mongoose.connect('mongodb://localhost/chatSocket', {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true
    })
    
    console.log('DB conectada');

  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos - vea logs');
  }
}

module.exports = mongoConnection;