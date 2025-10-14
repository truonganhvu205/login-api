const jwt = require('jsonwebtoken')
const {accessToken, refreshToken} = require('../config')

const generateAccessKey = payload => jwt.sign({payload}, accessToken, {expiresIn: '60s'})
const generateRefreshKey = payload => jwt.sign({payload}, refreshToken)

// const verifyRefreshKey = payload => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(payload, refreshToken, (err, data) => {
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
