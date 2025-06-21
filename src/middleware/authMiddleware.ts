import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    ;(req as any).user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user
  if (user?.role !== 'admin')
    return res.status(403).json({ message: 'Admin only' })
  next()
}
