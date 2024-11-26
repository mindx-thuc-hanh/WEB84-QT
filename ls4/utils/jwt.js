import jwt from "jsonwebtoken"

const secretKey = 'mat-khau-bi-mat'

// Tao token (Gen token)
export const generateToken = (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
    return token
}

// Tao refresh token (Gen token)
export const generateRefreshToken = (data) => {
    const token = jwt.sign(data, secretKey, { expiresIn: '365d' });
    return token
}

// Giai ma token (Decode token)
export const decodeToken = (token) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('JWT verification failed:', err.message);
        } else {
            return decoded
        }
    });
}