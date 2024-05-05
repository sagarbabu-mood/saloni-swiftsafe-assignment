const express = require("express");
const path = require("path");
const bp = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "*",
    })
  );
  
  app.use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
  
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;

const dbPath = path.join(__dirname, "twitterClone.db");

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.og(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/register", async (request, response) => {
    const { username, password } = request.body;
  
    const selectUserQuery = `
      SELECT * FROM user_credentials
      WHERE username='${username}';`;
  
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      if (password.length < 6) {
        response.status(400);
        response.send("Password is too short");
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const createUserQuery = `
            INSERT INTO user_credentials(username, password)
            VALUES(?, ?);`;
  
          await db.run(createUserQuery, [username, hashedPassword]);
          response.send("User created successfully");
        } catch (error) {
          console.error("Error creating user:", error);
          response.status(500).send("Internal Server Error");
        }
      }
    } else {
      response.status(400);
      response.send("User already exists");
    }
});



app.post("/login/", async (req, res) => {
    const { username, password } = req.body;
  
    const selectUserQuery = `
    SELECT * FROM user_credentials
    WHERE username=?;`;
  
    const dbUser = await db.get(selectUserQuery, [username]);
    if (dbUser === undefined) {
        res.status(400);
      res.send("Invalid User");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        console.log(jwtToken);
        res.send({ jwtToken });
      } else {
        res.status(400);
        res.send("Invalid password");
      }
    }
  });

  const authenticateToken = (req, res, next) => {
    let jwtToken;
  
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
        res.status(401);
        res.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
            res.status(401);
            res.send("Invalid JWT Token");
        } else {
            req.username = payload.username;
            next();
        }
      });
    }
  };

app.get("/products", authenticateToken, async(req, res) => {
    const {category="", type="", search=""} = req.query;

    const selectTodoQuery = `
    SELECT * FROM products
    WHERE name LIKE ? AND category=? AND type=?;`;

    const dbProducts = await db.all(selectTodoQuery, [`%${search}%`, category, type]);
    res.send(dbProducts);
});

app.get("/products/:id", authenticateToken, async (req, res) => {
    const {id} = req.params;
    const selectProductDetailsQuery = `
    SELECT * FROM product_details
    WHERE id = ?;`;

    const productDetail = await db.get(selectProductDetailsQuery, [id]);
    res.send(productDetail)

})