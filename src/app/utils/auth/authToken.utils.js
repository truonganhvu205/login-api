const jwt = require('jsonwebtoken')
const {accessTokenSecretKey, refreshTokenSecretKey} = require('../../configs')

let generateAccessKey = payload => jwt.sign({username: payload}, accessTokenSecretKey, {expiresIn: '60s'})
let generateRefreshKey = payload => jwt.sign({username: payload}, refreshTokenSecretKey)

// const verifyRefreshKey = payload => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(payload, refreshTokenSecretKey, (err, data) => {
//             if(err) {
//                 reject(err)
//             } else {
//                 const newAccessToken = generateAccessKey(data)
//                 resolve(newAccessToken)
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
