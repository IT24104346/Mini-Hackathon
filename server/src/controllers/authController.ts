import { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword, verifyPassword, generateToken } from '../utils/authUtils';

// Seed default Admin & Citizen accounts into MongoDB Atlas
export const seedDefaultUsers = async (): Promise<void> => {
  try {
    const adminExists = await User.findOne({ email: 'admin@floodsafe.lk' });
    if (!adminExists) {
      const { salt, hash } = hashPassword('Admin@123');
      await User.create({
        name: 'Disaster Management Officer (DMC)',
        email: 'admin@floodsafe.lk',
        passwordHash: hash,
        passwordSalt: salt,
        role: 'admin',
        district: 'Colombo',
        phone: '+94 11 213 6136',
        organization: 'Sri Lanka Disaster Management Centre'
      });
      console.log('[Auth Seeder]: Seeded default Admin account (admin@floodsafe.lk)');
    }

    const citizenExists = await User.findOne({ email: 'citizen@floodsafe.lk' });
    if (!citizenExists) {
      const { salt, hash } = hashPassword('Citizen@123');
      await User.create({
        name: 'Kasun Perera (Community Volunteer)',
        email: 'citizen@floodsafe.lk',
        passwordHash: hash,
        passwordSalt: salt,
        role: 'user',
        district: 'Gampaha',
        phone: '+94 77 123 4567',
        organization: 'Kelani Valley Youth Volunteer Brigade'
      });
      console.log('[Auth Seeder]: Seeded default Citizen account (citizen@floodsafe.lk)');
    }
  } catch (err: any) {
    console.warn('[Auth Seeder Notice]:', err.message);
  }
};

// @desc    Register a new community citizen
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, district, phone, organization } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must contain at least 6 characters.'
      });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login instead.'
      });
      return;
    }

    const { salt, hash } = hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hash,
      passwordSalt: salt,
      role: 'user', // Default role is community citizen
      district: district || 'Colombo',
      phone: phone?.trim(),
      organization: organization?.trim() || 'Community Member'
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    });

    res.status(201).json({
      success: true,
      message: 'Citizen account created successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        phone: user.phone,
        organization: user.organization
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// @desc    Login user or admin
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
      return;
    }

    const isMatch = verifyPassword(password, user.passwordSalt, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
      return;
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}! Logged in as ${user.role.toUpperCase()}.`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        phone: user.phone,
        organization: user.organization
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -passwordSalt');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error.message
    });
  }
};
