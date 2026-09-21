const express = require("express");
const path = require("path");
const characters = require("./data/characters");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { characters });
});

app.get("/characters/:slug", (req, res) => {
  const character = characters.find((c) => c.slug === req.params.slug);

  if (!character) {
    return res.status(404).render("404");
  }

  res.render("detail", { character });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
