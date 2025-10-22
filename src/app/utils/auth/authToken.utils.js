const jwt = require('jsonwebtoken')
const {accessTokenSecretKey, refreshTokenSecretKey} = require('../../configs')

let generateAccessKey = payload => jwt.sign(
    payload,
    accessTokenSecretKey,
    {expiresIn: '15m'})

let generateRefreshKey = payload => jwt.sign(payload, refreshTokenSecretKey)

// const verifyRefreshKey = payload => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(payload, refreshTokenSecretKey, (err, data) => {
//             if(err) {
//                 reject(err)
//             } else {
//                 const accessToken = generateAccessKey(data)
//                 resolve(accessToken)
//             }
//         })
//     })
// }

const authToken = {
    generateAccessKey,
    generateRefreshKey,
    // verifyRefreshKey,
}

module.exports = authToken
