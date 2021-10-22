const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  try {

    const token = req.header('x-token');

    if(!token) {
      return res.status(401).json({
        ok: false,
        msg: 'token-not-exist'
      });
    };

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next()

  } catch (error) {
    res.status(401).json({
      ok: false, 
      msg: 'token-invalid'
    });
  }
}

module.exports = {
  validarJWT
}