import { User, Admin } from './mongodb.js';
import { insertUserData, insertAdminData } from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

const JWT_SECRET = process.env.JWT_SECRET || "e752751f5b6b5e0cf70d4666e0fcd3d242f6b3bf5b034cdcb87de0852c3a134e";


export const registerUser = async (req, res) => {
    try {
        const { email, number, firstName, lastName, password, address_street, address_city, address_state, address_country } = req.body;

        if (!email || !number || !firstName || !lastName || !password) {
            return res.status(400).json({ message: "Please provide all required fields: email, number, firstName, lastName, and password." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            email: email,
            number: number,
            firstName: firstName,
            password: hashedPassword,
            lastName: lastName,
            address_street: address_street || null,
            address_city: address_city || null,
            address_state: address_state || null,
            address_country: address_country || null,
            loyalty_points: 0,
            member_status: 'Bronze',
            _id: uuidv4(),
            bookings: []
        };

        console.log("User data for registration:", userData);
        const success = await insertUserData(userData);
        if (success === true) {
            return res.status(201).json({ message: "User Successfully Registered" });
        } else {
            throw "Error Inserting Data";
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const registerAdmin = async (req, res) => {
    try {
        const { email, number, firstName, lastName, password, adminCode } = req.body;

        // Check admin code (you can set this to any value you want)
        //const ADMIN_SECRET_CODE = "HOTELADMIN2025"; // Change this to your desired admin code
        //if (adminCode !== ADMIN_SECRET_CODE) {
        //    return res.status(403).json({ message: "Invalid admin registration code" });
        //}

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const adminData = {
            email: email,
            number: number,
            firstName: firstName,
            password: hashedPassword,
            lastName: lastName
        };

        console.log(adminData);
        const success = await insertAdminData(adminData);
        if (success === true) {
            return res.status(201).json({ message: "Admin Successfully Registered" });
        } else {
            throw "Error Inserting Data";
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login attempt tracking
const loginAttempts = new Map();

export const loginUserGuest = async (req, res) => {
    try {
        const { email, password, remember } = req.body;

        // Check if account is locked due to too many failed attempts
        /*const attemptKey = `user_${email}`;
        const attempts = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };

        if (attempts.count >= 5 && Date.now() - attempts.lastAttempt < 15 * 60 * 1000) { // 15 minutes lockout
            return res.status(429).json({
                message: "Too many failed login attempts. Please try again later."
            });
        }*/

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal that the user doesn't exist
            loginAttempts.set(attemptKey, {
                count: attempts.count + 1,
                lastAttempt: Date.now()
            });
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            loginAttempts.set(attemptKey, {
                count: attempts.count + 1,
                lastAttempt: Date.now()
            });
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Reset login attempts on successful login
        loginAttempts.delete(attemptKey);

        var duration = '1d';
        if (remember) {
            duration = '7d'
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: email,
                role: 'user'
            },
            JWT_SECRET,
            { expiresIn: duration }
        );

        console.log("Login successful");
        return res.status(200).json({
            token,
            user: {
                name: user.firstName,
                email: email,
                id: user._id
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUserAdmin = async (req, res) => {
    try {
        const { email, password, remember } = req.body;

        // Check if account is locked due to too many failed attempts
        /*const attemptKey = `admin_${email}`;
        const attempts = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };

        if (attempts.count >= 5 && Date.now() - attempts.lastAttempt < 15 * 60 * 1000) { // 15 minutes lockout
            return res.status(429).json({
                message: "Too many failed login attempts. Please try again later."
            });
        }*/

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            // Don't reveal that the admin doesn't exist
            loginAttempts.set(attemptKey, {
                count: attempts.count + 1,
                lastAttempt: Date.now()
            });
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            loginAttempts.set(attemptKey, {
                count: attempts.count + 1,
                lastAttempt: Date.now()
            });
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Reset login attempts on successful login
        loginAttempts.delete(attemptKey);

        var duration = '1d';
        if (remember) {
            duration = '7d'
        }

        const token = jwt.sign(
            {
                userId: admin._id,
                email: email,
                role: 'admin'
            },
            JWT_SECRET,
            { expiresIn: duration }
        );

        return res.status(200).json({
            token,
            user: {
                name: admin.firstName,
                email: email,
                id: admin._id
            },
            message: "Login Successful, Welcome."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token Expired' });
        }
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

// Middleware to check if user is admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admin Privileges Required' });
        }
        next();
    });
};
