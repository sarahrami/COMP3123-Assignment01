const express = require("express");
const EmpModel = require("../models/Employee")
const routes = express.Router()
const mongoose = require("mongoose");

// fetching employees
routes.get("/employees", async (req, res) => {
    try{
        if(mongoose.connection.readyState !== 1){
            res.status(200).json({
                status: "true",
                message: "Database not connected."
            })
        }

        const employees = await EmpModel.find({})
        res.status(200).json({
            status: "true",
            employees: employees
        })

    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }

})

// fetching employee data by id
routes.get("/employees/:eid", async (req, res) => {
    try{
        if(mongoose.connection.readyState !== 1){
            res.status(200).json({
                status: "true",
                message: "Database not connected."
            })
        }
        const employee_byId = await EmpModel.findById({_id: req.params.eid})
        if(!employee_byId){
            res.status(405).json({
                status: "false",
                message: "Employee id doesn't exist."
            })
        }else{
            res.status(200).json(employee_byId)
        }

    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})

// Creating employee
routes.post("/employees", async (req, res) => {
    try{
        if(mongoose.connection.readyState !== 1){
            res.status(201).json({
                status: "true",
                message: "Database not connected."
            })
        }
        const newEmployee = new EmpModel({
            ...req.body
        })
        await newEmployee.save()
        res.status(201).json({
            status: "true",
            message: "Employee added to database successfully."
        })

    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})

//updating employee by id
routes.put("/employees/:eid", async (req, res) => {
    try{
        if(mongoose.connection.readyState !== 1){
            res.status(200).json({
                status: "true",
                message: "Database not connected."
            })
        }

        const employee = await EmpModel.findByIdAndUpdate(req.params.eid, req.body)
        
        if(!employee){
            res.status(405).json({
                status: "false",
                message: "Employee doesn't exist."
            })
        }else{
            res.status(200).json({
                old_employee: employee,
                message: "Employee Updated."
            })
        }

    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})

//deleting employee by id
routes.delete("/employees/:eid", async (req, res) => {
    try{
        if(mongoose.connection.readyState !== 1){
            res.status(200).json({
                status: "true",
                message: "Database not connected."
            })
        }

        const employee = await EmpModel.findByIdAndDelete(req.params.eid)
        
        if(!employee){
            res.status(405).json({
                status: "false",
                message: "Employee doesn't exist."
            })
        }else{
            res.status(200).json({
                status: "true",
                message: "Employee has been deleted."
            })
        }


    }catch(error){
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }    
})

module.exports = routes

