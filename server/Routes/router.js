const express = require('express');
const router = express.Router();
const conn = require('../db/Connection');
const avatarUrl = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/jwtauth');
const secretKey="manoj"



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
            if (results.length > 0) {
                const us_name = results[0].username;
                if (password === results[0].password) {
                    const role = results[0].role;
                    const token = jwt.sign({ email, role, username: us_name }, secretKey, { expiresIn: '1h' });
                    console.log(token);

                    let redirectUrl = '';
                    if (role === 'Admin') {
                        redirectUrl = "/admin-dashboard";
                    } else if (role === 'Student') {
                        redirectUrl = "/student-dashboard";
                    } else if (role === 'CollegeEmployee') {
                        redirectUrl = "/college-dashboard";
                    } else {
                        redirectUrl = "/company-dashboard";
                    }

                    return res.status(200).json({ message: "Login Successful", token, redirect: redirectUrl, username: us_name });
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

// Get all colleges
router.get('/colleges', (req, res) => {
    conn.query('SELECT college_name FROM colleges', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ colleges: results });
    });
});

// Get all feeds
router.get('/feeds', authenticateJWT, (req, res) => {
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
                return res.status(200).json({ feeds: data });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ error: "Database error" });
            });
    });
});

// Get student skills
router.get('/getstudentskills', authenticateJWT, (req, res) => {
    const username = req.query.username;
    const query = 'SELECT skills, 12_marks, CGPA FROM students WHERE username = ?';
    conn.query(query, [username], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ skills: results });
    });
});

// Get eligible companies
router.post('/getcompanies', authenticateJWT, (req, res) => {
    const { cgpa, skills, marks } = req.body;
    const skillArray = skills.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const skillConditions = skillArray.map(skill => `skill LIKE '%${skill}%'`).join(' OR ');

    const query = `
        SELECT company_id, job_title, job_description, posting_date, application_deadline 
        FROM jobs 
        WHERE CGPA <= ? 
        AND 12_marks <= ? 
        AND (${skillConditions})
    `;

    conn.query(query, [cgpa, marks], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(200).json({ companies: [] });
        }

        const companyIds = results.map(job => job.company_id);
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


//feed post
router.post('/postfeed',(req,res)=>{
    const {headline,feed,username}=req.body;
    if ((!headline || !feed)) {
        return res.status(422).json({ error: "Fill all data" });
    }
    try{
    conn.query('SELECT employee_id FROM collegeemployees WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Database error" });
        }
        const employee_id = results[0].employee_id;
        const feed_date=new Date();
        conn.query(
            'INSERT INTO feeds (employee_id, feed_date, feed_content, feed_headline) VALUES (?, ?, ?, ?)', 
            [employee_id, feed_date, feed, headline], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Database error" });
            } else {
                return res.status(200).json({ message: "PostedSuceesfully" });
            }
        });
    });}
    catch (error) {
        res.status(500).json("Internal Server Error");
    }
    
});

//add Companies
router.post('/addcompany', authenticateJWT, async (req, res) => {
    const { username, company_name, industry_type } = req.body;
    if (!username || !company_name || !industry_type) {
        return res.status(422).json({ error: "Fill all data" });
    }

    try {
        const getCollegeAndEmployeeId = (username) => {
            return new Promise((resolve, reject) => {
                conn.query('SELECT college_id, employee_id FROM collegeemployees WHERE username = ?', [username], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.length > 0) {
                        const { college_id, employee_id } = results[0];
                        resolve({ college_id, employee_id });
                    } else {
                        resolve(null);
                    }
                });
            });
        };

        const result = await getCollegeAndEmployeeId(username);
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        const { college_id, employee_id } = result;

        const checkCompanyExists = (college_id, company_name) => {
            return new Promise((resolve, reject) => {
                const q = "SELECT * FROM companies WHERE college_id = ? AND company_name = ?";
                conn.query(q, [college_id, company_name], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0);
                });
            });
        };

        const companyExists = await checkCompanyExists(college_id, company_name);
        if (companyExists) {
            return res.status(409).json({ error: "Company already exists" });
        }

        const addCompany = (college_id, employee_id, company_name, industry_type) => {
            return new Promise((resolve, reject) => {
                const q = "INSERT INTO companies (college_id, added_by_employee_id, company_name, industry_type) VALUES (?, ?, ?, ?)";
                conn.query(q, [college_id, employee_id, company_name, industry_type], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        };

        await addCompany(college_id, employee_id, company_name, industry_type);
        return res.status(200).json({ message: "Company Added Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

//view Companies
router.get('/viewcompanies', authenticateJWT, async (req, res) => {
    try {
        const getCompanies = () => {
            return new Promise((resolve, reject) => {
                const q = "SELECT * FROM companies";
                conn.query(q, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        };

        const companies = await getCompanies();
        return res.status(200).json({ companies });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// add CompanyEmployee By College
router.post('/addcompanyemployee', authenticateJWT, async (req, res) => {
    const { username, company_id, name, email, password } = req.body;
    if (!username || !company_id || !name || !email || !password ) {
        return res.status(422).json({ error: "Fill all data" });
    }
    try {
        const checkUserExists = (username) => {
            return new Promise((resolve, reject) => {
                conn.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.length > 0);
                });
            });
        };
        const addUser = (username, email, hashedPassword) => {
            return new Promise((resolve, reject) => {
                const q = "INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, 'CompanyEmployee', NOW())";
                conn.query(q, [username, email, hashedPassword], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        };

        const addEmployee = (username, company_id, name, email) => {
            return new Promise((resolve, reject) => {
                const q = "INSERT INTO companyemployees (company_id, username, name, contact_info) VALUES (?, ?, ?, ?)";
                conn.query(q, [company_id, username, name, email], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        };
        const userExists = await checkUserExists(username);
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = password;
        await addUser(username, email, hashedPassword);
        await addEmployee(username, company_id, name, email);
        return res.status(200).json({ message: "Employee Added Successfully" });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;