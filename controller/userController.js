
import User from '../model/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const fetch = async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        if (!users.length) {
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json(users);
    } catch {
        res.status(500).json({ error: "Internal server error" })
    }

}
export const create = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch {
        res.status(500).json({ error: "Internal server error" })
    }

}
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const UpdateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json(UpdateUser)
    } catch {
        res.status(500).json({ error: "User Not Found" })
    }

}
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found" })
        }
        await User.findByIdAndDelete(id)
        res.status(201).json({ message: "Deleted Succesfully" })
    } catch {
        res.status(500).json({ error: "User Not Found" })
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};