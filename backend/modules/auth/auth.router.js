import { Router } from "express";
import User from '../users/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ROLES } from "../users/user.model.js";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION} = process.env
const router = new Router()

// MIDDLEWARE TO VALIDATE AUTHENTICATION ON PROTECTED ROUTES
export const authenticate = (request, response, next) => {
    try {
        const encodedToken  = request.header('access-token')
        const decodedToken = jwt.verify(encodedToken, ACCESS_TOKEN_SECRET)
        request.user = decodedToken
        next()
    } catch(error) {
        return response.status(401).json(error)
    }
}

// MIDDLEWARE THAT AUTHORIZE THE DEFINED ROLES
export const authorize = (...roles) => {
    return (request, response, next) => {
        if (roles.includes(request.user.role)) return next()
        return response.status(401).json({message: "Unauthorized to access this data"})
    }
}


// RETURN USER BY EMAIL FROM DATABASE
const findUserByEmail = async (email) => {
    return (await User.find({email}))[0]
}


// REGISTER NEW USERS
router.post('/register', async (request, response, next) => {

    // CHECK THAT USER DOESN'T EXIST
    const {email} = request.body
    const userExists = !!(await findUserByEmail(email))
    if (userExists) return response.status(400).json({userExists})

    // HASH THE PASSWORD
    const {password} = request.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // REGISTER USER IN DATABASE
    const user = new User({...request.body, password: hashedPassword, role:ROLES.ADMINISTRATOR})
    const document = await user.save()

    // LOGIN USER
    const payload = {id:document._id, organization: document.organization, role: document.role}
    const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION})
    response.status(200).json({accessToken})
})

router.post('/email/login/', async (request,response, next) => {

    const {email, password} = request.body
    const user = await findUserByEmail(email)
    if (!user) return response.status(401).json({userExists: false})
  
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) return response.status(401).json({passwordValid})

    const payload = {id:user._id, organization: user.organization, role: user.role}
    const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION})
    response.status(200).json({accessToken})


})

router.post('/google/login', async (request, response, next) => {
 
})

router.post('/logout', async (request, response, next) => {

})



export default router 