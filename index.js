const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.get("/", (req,res) => {
	res.send("Hello from space ! ");
});

app.listen(port, () => {
	console.log("App running");
});

