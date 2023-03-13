import { IProblem } from "@bugzone/shared/types";
import express from "express";
const app = express();
import { db } from "./datastore";
// Middlewares
app.use(express.json());
// Create Problems
app.post("/problems", (req, res) => {
  const problem: IProblem = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    type: req.body.type ?? "created",
    solutions: ["1234", "567"],
    likes: 2,
    dislikes: 2,
    createdAt: new Date(),
  };

  db.createProblem(problem);
  res.sendStatus(200);
});

// Get All Posts from InMemoryDB
app.get("/problems", async (_, res) => {
  res.send({ problems: await db.getAllProblems() });
});
app.listen(4040, () => {
  console.log(`Server running on port 4040`);
});
