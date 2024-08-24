const express = require('express');
const router = express.Router();
const conn = require('../db/Connection');



// Register 

router.post('/register', (req, res) => {
 const {Username,Email, Password,role} = req.body;
    if(!Username || !Email || !Password || !role){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    try{
        conn.query('SELECT * FROM users WHERE Email = ?',Email, async (error, results) => {
            if(results.length > 0){
                return res.status(422).json({error:"Email already exists"});
            }
            else
            {
                conn.query('INSERT INTO users SET ?', {Username,Email,Password,role}, (error, results) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        return res.redirect(`/addRegistration?username=${Username}`);
                    }
                });
            }
        });
    }
    catch(err){
        console.log(err);
    }
});



// Add Registration

router.post('/addRegistration', (req, res) => {
    const { Firstname, Lastname, College, year_of_study, contact_info } = req.body;
    const { username } = req.query;
    const name = `${Firstname} ${Lastname}`;
    console.log(name, College, year_of_study, contact_info);
    if (!Firstname || !Lastname || !College || !year_of_study || !contact_info) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        conn.query('SELECT college_id FROM colleges WHERE college_name = ?', [College], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length === 0) {
                return res.status(422).json({ error: "College not found" });
            }

            const college_id = results[0].college_id;

            conn.query('INSERT INTO students SET ?', { username, college_id, name, year_of_study,contact_info }, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Database error" });
                } else {
                    return res.status(200).json({ message: "Registered Successfully" });
                }
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
});

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        conn.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }
            if (results.length > 0) {
                if (password === results[0].password) {
                    conn.query('SELECT role FROM users WHERE email = ?', [email], (error, results) => {
                        if (error) {
                            return res.status(500).json({ error: "Database error" });
                        }
                        if (results.length === 0) {
                            return res.status(422).json({ error: "Invalid Email or Password" });
                        }
                        const role = results[0].role;
                        if (role === 'Admin') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/admin-dashboard" });
                        } else if (role === 'Student') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/student-dashboard" });
                        } else if (role === 'CollegeEmployee') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/employee-dashboard" });
                        } else {
                            return res.status(200).json({ message: "Login Successful", redirect: "/company-dashboard" });
                        }
                    });
                } else {
                    return res.status(422).json({ error: "Invalid Email or Password" });
                }
            } else {
                return res.status(422).json({ error: "Invalid Email or Password" });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;