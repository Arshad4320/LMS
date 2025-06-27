import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role })

    res.json({
      success: true,
      message: 'user created successfully',
      data: user,
    })
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err })
  }
}

const getCourseVideos = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    res.status(200).json({
      message: 'Course videos access granted',
      accessBy: user.role,
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to load videos', error: err })
  }
}

const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' })
    }

    res.status(200).json({
      message: 'Welcome to the admin dashboard',
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err })
  }
}
const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    })
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err })
  }
}

export const authController = {
  logout,
  register,
  login,
  getCourseVideos,
  getAdminDashboard,
}
