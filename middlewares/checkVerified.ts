import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User} from '../models/User'
import { decodeToken } from './decodeToken'
import { JwtPayload } from 'jsonwebtoken'

export async function isVerified(req: Request, res: Response, next: NextFunction) {
  try {
        const decoded = decodeToken(req.cookies.jwt) as JwtPayload
        const user: any = await User.findOne({ _id: decoded.userId })
        
        // Check if the user is verified
        // If the user is verified, allow them to proceed to the next middleware function
        if ( user.isVerified ) {
          next();
        } else {
          res.status(StatusCodes.FORBIDDEN).json({ message: "You are not verified yet" });
        }
  } catch (error: any) {
      console.error(error)
      return res.send(error)
  }
}
  