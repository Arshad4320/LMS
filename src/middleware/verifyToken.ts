import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      role: string
    }
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
}
