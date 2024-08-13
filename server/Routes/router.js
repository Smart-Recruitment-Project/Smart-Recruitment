const express = require('express');
const router = express.Router();
const conn = require('../db/Connection');
const bcrypt = require('bcryptjs');



// Register 

router.post('/register', (req, res) => {
 const {FirstName, LastName, Email,Phone, Password,College} = req.body;
    if(!FirstName || !LastName || !Email || !Phone || !Password || !College){
        return res.status(422).json({error:"Please fill all the fields"});
    }

    try{
        conn.query('SELECT * FROM student WHERE Email = ?',Email, async (error, results) => {
            if(results.length > 0){
                return res.status(422).json({error:"Email already exists"});
            }
            else
            {
                conn.query('INSERT INTO student SET ?', {FirstName, LastName, Email,Phone, Password,College}, (error, results) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        return res.status(200).json({message:"Registered Successfully"});
                    }
                });
            }
        });
    }
    catch(err){
        console.log(err);
    }
});


//login

router.post('/login', async (req,res) => {
    const { Email, Password } = req.body;
    console.log(Email, Password);
    if (!Email || !Password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const checkUser = async (table) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM ${table} WHERE Email = ?`, [Email], (error, results) => {
                    if (error) return reject(error);
                    if (results.length > 0) return resolve(results[0]);
                    resolve(null);
                });
            });
        };
        let user = await checkUser('student');
        if (user) {
            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(422).json({ error: "Invalid Email or Password" });
            return res.status(200).json({ message: "Login Successful", redirect: "/student-dashboard" });
        }
        user = await checkUser('employee');
        if (user) {
            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(422).json({ error: "Invalid Email or Password" });
            return res.status(200).json({ message: "Login Successful", redirect: "/employee-dashboard" });
        }

        user = await checkUser('company');
        if (user) {
            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(422).json({ error: "Invalid Email or Password" });
            return res.status(200).json({ message: "Login Successful", redirect: "/company-dashboard" });
        }
        return res.status(422).json({ error: "Invalid Email or Password" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;