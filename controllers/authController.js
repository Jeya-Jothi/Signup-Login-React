const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This is a shortcut in CommonJS to export a "function" named "signup" from our file (authController.js).
exports.signup = async (req, res) => {
  const { name, email, password, country } = req.body;
  try {
    const existing = await pool.query("SELECT * FROM people WHERE email=$1",[email]);
// Exisiting check
    if(existing.rows.length>0){return res.status(400).json({msg:"Email already exists"});}
// Insert data into DB
    const hashed = await bcrypt.hash(password, 10);
    const newPeople = await pool.query(
      "INSERT INTO people (name, email, password, country) VALUES ($1, $2, $3, $4) RETURNING *",[name, email, hashed, country]
    );
    const token = jwt.sign({ id: newPeople.rows[0].id }, process.env.JWT_SECRET,{expiresIn:"2h"});
    res.status(201).json({ token, user: newPeople.rows[0] });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
  // res.status(201).json({ name, email, password, country });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM people WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const validPass = await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token, user: user.rows[0] });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
  // res.status(200).json({ email, password }, "Login successful");
};

exports.deleteAccount = async (req,res)=>{
  const { email, password } = req.body;
  try{
    const user = await pool.query("SELECT * FROM people WHERE email = $1",[email]);
    if(user.rows.length===0){return res.status(400).json({msg: "Account unavilable for that user and password"});}
    const validPass = await bcrypt.compare(password, user.rows[0].password);
    if (!validPass) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    await pool.query("DELETE FROM people WHERE email=$1",[email]);
    res.status(201).json({ msg: "Account deleted"});
  }catch(err){
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}
