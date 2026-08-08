import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";


export const signup = async (req: Request, res: Response) => {

    try{

        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required!"}); 
        }

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({message: "User already exists!"}); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName, 
            email, 
            password: hashedPassword
        })

        const token = generateToken(user._id.toString());

        res.status(201).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }


}


export const login = async (req: Request, res: Response) => {

    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required!"}); 
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({message: "Invalid credentials"}); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id.toString());

        res.status(201).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}


// FORGOT PASSWORD (basic placeholder)
export const forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Will add the real implementation - TO-DO
      res.status(200).json({
        message: "Password reset link sent (mock)",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};