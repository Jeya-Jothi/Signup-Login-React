$ npm install express pg dotenv jsonwebtoken bcryptjs cors

1. express 😎
   Why? It's the framework you're building the backend on.

It helps us create "routes" like /signup or /login

We use express() to create the app

We use app.post(), app.get() etc. to handle requests

🔧 Without Express, We'd have to write everything in raw Node.js — slow and complex!

2. pg 🐘
   Why? This is the PostgreSQL client — it helps Node.js talk to your Render DB (Postgres).

We use it to connect, run queries, and fetch data

Like: js
const result = await pool.query("SELECT \* FROM users");

pool is an Object from pg.

🔧 Without pg, you can't interact with our database.

3. dotenv 🗂️
   Why? It allows you to use a .env file to store secrets like:
   .env:
   DATABASE_URL=...
   JWT_SECRET=...

Then we can asccess like: process.env.JWT_SECRET

4. jsonwebtoken (JWT) 🔐
   Why? It’s used to generate login tokens after successful login.

We give a token to the user: js
jwt.sign({ id: user.id }, secret, { expiresIn: "2h" });

jwt.sign(
{ id: user.id }, // This is the "payload" (what's stored inside the token)
process.env.JWT_SECRET, // This is the secret key used to sign it securely
{ expiresIn: "2h" } // This means the token will expire after 2 hours
)

The token is then used to verify their identity for future requests

🔧 Without JWT, users can't stay logged in securely.

5. bcryptjs 🧂
   Why? It hashes the user's password before storing it in the DB.

On signup: js
const hashed = await bcrypt.hash(password, 10);

On login: js
await bcrypt.compare(input, hashedFromDB)

🔧 Without bcrypt, you'd store plain passwords — dangerous! 😱

6. cors 🔁
   Why? It allows your frontend (on one port) to talk to your backend (on another port) during development.

Example: React on localhost:3000, Express on localhost:5000

🔧 Without cors, the browser would block your frontend-backend connection.

---

| Package      | Job                                                     |
| ------------ | ------------------------------------------------------- |
| express      | Makes the backend app and handles routes                |
| pg           | Talks to PostgreSQL (pool)                              |
| dotenv       | Loads secrets from `.env`                               |
| jsonwebtoken | Gives and verifies login tokens (JWT)                   |
| bcryptjs     | Hashes and compares passwords securely                  |
| cors         | Allows frontend to talk to backend (during development) |

---

$ npm i --save-dev nodemon

This installs "nodemon" as a development-only tool.

🔧 What is nodemon?
It’s short for “Node Monitor”
It automatically restarts your backend server whenever you save a file
No need to keep stopping and restarting the server manually!

Why --save-dev?
That tells npm:
“This tool is only needed while developing the app — not when it's deployed.”
So it will be listed under "devDependencies" in your package.json, like this:
"devDependencies": {
"nodemon": "^3.0.0"
}

BUT

If We Want a Simple Shortcut:
Edit our package.json like this:

json:
"scripts": {
"dev": "nodemon index.js"
}

Then just run:
bash: npm run dev
