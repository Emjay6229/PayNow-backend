import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '../src/models/User';
import { JwtPayload } from 'jsonwebtoken';
import { decodeToken } from '../src/controllers/utils/decodeToken'

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const decoded = decodeToken(req.cookies.jwt) as JwtPayload
    const user: any = await User.findOne({ _id: decoded.userId })
    // Check if the user making the request is an admin
    // If the user is an admin, allow them to proceed to the next middleware function
    if (user.role === "Admin") {
      next(); 
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "ONLY ADMIN! You are not authorized to perform this action" });
    }
  }