const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const usuario = require("../models/usuario");

const crearUsuario = async(req, res = response) => {

  try {

    const { nombre, email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });

    if(existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'email-exist'
      })
    };

    //guardar bbdd
    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //generar el JWT

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario, 
      token
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'talk with admin'
    })
  }

  res.json({
    ok: true,
    msg: 'new', 
    nombre, 
    email, 
    password
  })
}; 

const login = async(req, res) => {

  const { email, password } = req.body;

  try {
    
    //verificamos si el correo existe o no
    const usuarioDB = await Usuario.findOne({ email });

    if(!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'email-not-found'
      });
    };

    //verificar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    
    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'password-incorrect'
      })
    }

    //generar jwt

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB, 
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'talk with admin'
    })
  }
};

const reNewToken = async(req, res) => {

  const uid = req.uid;

  //generar un nuevo JWT

  const token = await generarJWT(uid)

  //Obtener usuario

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  crearUsuario,
  login,
  reNewToken
}