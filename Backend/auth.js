import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    refreshToken
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

export {generateToken, verifyToken}