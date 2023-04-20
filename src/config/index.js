import dotenv from 'dotenv'
dotenv.config()
const config = {
    ALLOWED_ORIGIN: process.env.NODE_ENV==="development"
        ?"http://localhost:3000"
        :"https://akdev.onrender.com",
    PORT: 4000,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}

export default config
