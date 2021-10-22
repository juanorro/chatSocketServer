const Mensaje = require('../models/mensaje');

const obtenerChat = async(req, res) => {

  const miId = req.uid;
  const mensajesDe = req.params.de;

  const last30 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe }, 
      { de: mensajesDe, para: miId}
    ]
  })
  .sort({ createAt: 'desc'})
  .limit(30);

  res.json({
    ok: true,
    mensajes: []
  });
};

module.exports = {
  obtenerChat
}