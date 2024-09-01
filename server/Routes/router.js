const express = require('express');
const router = express.Router();
const conn = require('../db/Connection');
const avatarUrl = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';



// Register
router.post('/register', (req, res) => {
    const { Username, Email, Password, role } = req.body;
    if (!Username || !Email || !Password || !role) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    conn.query('SELECT * FROM users WHERE Email = ?', [Email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Server error" });
        }
        if (results.length > 0) {
            return res.status(422).json({ error: "Email already exists" });
        } else {
            conn.query('INSERT INTO users SET ?', { Username, Email, Password, role }, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Server error" });
                } else {
                    return res.status(200).json({ message: "Registration successful" });
                }
            });
        }
    });
});




// Add Registration
router.post('/addRegistration', (req, res) => {
    const { username,FirstName, LastName, College, year_of_study, contact_info } = req.body;
    const name = `${FirstName} ${LastName}`;
    //console.log("Received username:", username);

    if (!username) {
        return res.status(422).json({ error: "Username is required" });
    }

    if (!FirstName || !LastName || !College || !year_of_study || !contact_info) {
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

            conn.query('INSERT INTO students SET ?', { username, college_id, name, year_of_study, contact_info }, (error, results) => {
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
            const username=results[0].username;
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
                        
                        console.log(results);
                        if (role === 'Admin') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/admin-dashboard" ,username:username});
                        } else if (role === 'Student') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/student-dashboard" ,username:username });
                        } else if (role === 'CollegeEmployee') {
                            return res.status(200).json({ message: "Login Successful", redirect: "/employee-dashboard" ,username:username });
                        } else {
                            return res.status(200).json({ message: "Login Successful", redirect: "/company-dashboard" ,username:username });
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


//get all colleges

router.get('/colleges', (req, res) => {
    conn.query('SELECT college_name FROM colleges', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ colleges: results });
    });
});



//get all feeds

router.get('/feeds', (req, res) => {
    conn.query('SELECT * FROM feeds', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }

        const employeeIds = results.map(feed => feed.employee_id);
        const dataPromises = results.map((feed, index) => {
            return new Promise((resolve, reject) => {
                conn.query('SELECT name FROM collegeemployees WHERE employee_id = ?', [employeeIds[index]], (error, employees) => {
                    if (error) {
                        console.log(error);
                        return reject({ error: "Database error" });
                    }
                    resolve({
                        avatarUrl: avatarUrl,
                        employeeName: employees[0].name,
                        headline: feed.feed_headline,
                        content: feed.feed_content,
                        time: feed.feed_date
                    });
                });
            });
        });

        Promise.all(dataPromises)
            .then(data => {
                console.log(Array.isArray(data));
                return res.status(200).json({ feeds: data });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ error: "Database error" });
            });
    });
});

//get all studnets cpga ,marks,skills
router.get('/getstudentskills',(req,res)=>{
    const username=req.query.username;
    const query=`SELECT skills,12_marks,CGPA FROM students where username=?`;
    conn.query(query,[username],(error,results)=>{
        if(error){
            console.log(error);
            return res.status(500).json({error:"Database error"});
        }
        return res.status(200).json({skills:results});
    });
})



//get all eligible companies
router.post('/getcompanies', (req, res) => {
    const cgpa = req.body.cgpa;
    const skills = req.body.skills;
    const marks = req.body.marks;
    const array = skills.toLowerCase().split(/[\s,]+/).filter(Boolean); 
    const skillConditions = array.map(skill => `skill LIKE '%${skill}%'`).join(' OR ');
    console.log(skillConditions);
    const query = `
    SELECT company_id,job_title,job_description,posting_date,application_deadline FROM jobs 
    WHERE CGPA <= ? 
    AND 12_marks <= ? 
    AND (${skillConditions})`;

    conn.query(query,[cgpa,marks], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            console.log("No companies found");
            return res.status(200).json({ companies: [] });
        }
        
        const eligibleJobs = results.filter(job => {
            return array.every(skill => array.includes(skill));
        });

        if (eligibleJobs.length === 0) {
            return res.status(200).json({ companies: [] });
        }

        const companyIds = eligibleJobs.map(job => job.company_id);
        const companyQuery = 'SELECT company_id, company_name FROM companies WHERE company_id IN (?)';

        conn.query(companyQuery, [companyIds], (error, companyResults) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Error fetching company names" });
            }

            const companyMap = companyResults.reduce((map, company) => {
                map[company.company_id] = company.company_name;
                return map;
            }, {});

            const changeResults = results.map(result => ({
                ...result,
                company_name: companyMap[result.company_id]
            }));

        return res.status(200).json({ companies: changeResults });
    });
});
});




module.exports = router;