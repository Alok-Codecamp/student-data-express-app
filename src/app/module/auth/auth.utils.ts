import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '../user/user.interface';


export const createToken = (jwtPayload: {}, secret: string, expiresIn: string) => {

    return jwt.sign(jwtPayload, secret, { expiresIn })

}



export const verifyToken = (token: string, secret: string) => {

    return jwt.verify(token, secret) as JwtPayload

}