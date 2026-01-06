import { supabase } from './server.js';
import { insertUserData, insertAdminData } from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "e752751f5b6b5e0cf70d4666e0fcd3d242f6b3bf5b034cdcb87de0852c3a134e";
export const registerUser = async (req,res) =>{
    try{
        const { email, number, firstName, lastName, password, address_street, address_city, address_state, address_country } = req.body;
        
        if (!email || !number || !firstName || !lastName || !password) {
            return res.status(400).json({ message: "Please provide all required fields: email, number, firstName, lastName, and password." });
        }

        const {data,error} = await supabase.from("users")
                                    .select("email")
                                    .eq("email",email)
        if (error) throw error;
        if(data.length < 1){
            const hashedPassword = await bcrypt.hash(password,10);
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
                bookings: []
            };
            console.log("User data for registration:", userData);
            const success = await insertUserData(userData);
            if(success == true){
                return res.status(200).json({ message: "User Successfully Registered" });
            } else {
                throw "Error Inserting Data";
            };
        }
        else{
            return res.status(401).json({message: "user already registered"})
        }
    }    
    catch(error){
        console.log(error);
        return res.status(500).json( {message: "Internal Server Error"} );
    }
}

export const registerAdmin = async (req,res) =>{
    try{
        const { email, number, firstName, lastName, password, adminCode } = req.body;
        const {data,error} = await supabase.from("admins")
                                    .select("email")
                                    .eq("email",email)
        console.log(data);
        if (error) throw error;
        if(data.length < 1){
            const hashedPassword = await bcrypt.hash(password,10);
            const adminData = {
                email: email,
                number: number,
                firstName: firstName,
                password: hashedPassword,
                lastName: lastName
            };
            console.log(adminData);
            const success = await insertAdminData(adminData);
            if(success == true){
                return res.status(200).json({ message: "Admin Successfully Registered" });
            } else {
                throw "Error Inserting Data";
            };
        }
        else{
            return res.status(401).json({message: "user already registered"})
        }
    }    
    catch(error){
        console.log(error);
        return res.status(500).json( {message: "Internal Server Error"} );
    }
}

export const loginUserGuest = async(req,res)=>{
    try{
        const { email,password,remember } = req.body
        const { data } = await supabase.from("users")
                                       .select("*")
                                       .eq("email",email)
                                       .single();
        console.log(email)
        console.log(data)
        if(!data) throw "Invalid Credentials";
        const userPassword = data.password;
        const isMatch = await bcrypt.compare(password, userPassword);
        if(!isMatch){
            throw "Invalid Credentials"
        }
        var duration = '1d';
        if(remember){
            duration = '7d'
        }else{
            duration = '1d'
        }
        const token = jwt.sign(
			{ userId: data.id, email: email },
			JWT_SECRET,
			{ expiresIn: duration }
		);
        console.log("login successfully")
		return res.status(200).json({
			token,
			user: { name: data.firstName, email: email }
		});
    }
    catch (error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error"})
    }
}

export const loginUserAdmin = async(req,res)=>{
    try{
        const { email,password,remember } = req.body;
        const { data } = await supabase.from("admins")
                                       .select("*")
                                       .eq("email",email)
                                       .single();
        if(!data) throw "Invalid Credentials";
        const userPassword = data.password;
        const isMatch = await bcrypt.compare(password, userPassword);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Credentials"})
        }
        var duration = '1d';
        if(remember){
            duration = '7d'
        }else{
            duration = '1d'
        }
        const token = jwt.sign(
			{ userId: data.id, email: email },
			JWT_SECRET,
			{ expiresIn: duration }
		);
		return res.status(200).json({
			token,
			user: { name: data.firstName, email: email },
            message: "Login Successful, Welcome."
		});
    }
    catch (error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error"})
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
    return res.status(401).json({ message: 'Invalid Token' });
  }
};