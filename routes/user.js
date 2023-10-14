const express = require("express");
const UserModel = require("../models/User");
const userRoutes = express.Router();
const mongoose = require("mongoose");

userRoutes.post("/signup", async (req, res) => {
    try {
        if(mongoose.connection.readyState !== 1){
            res.status(201).json({
                status: "true",
                message: "Database not connected."
            })
        }
        const newUser = new UserModel({
            ...req.body
        })
        await newUser.save();
        res.status(201).json({
            status: "true",
            message: "Account created."
        })
    } catch (error) {
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})


userRoutes.post("/login", async (req, res) => {
    try{  
        const {username, password} = req.body

        if(mongoose.connection.readyState !== 1){
            res.status(200).json({
                message: "Database not Connected",
                providedCredentials: {
                    username,
                    password
                }
            })
        }
        const user = await UserModel.findOne({username})

        if(user && user.password === password){
            res.status(200).json({
                status: "true",
                username: user.username,
                message: "User logged in successfully."
            })
        }else{
            res.status(500).json({
                status: "false",
                message: "Invalid Username or password",
            })
        }
        

    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})

module.exports = userRoutes;
