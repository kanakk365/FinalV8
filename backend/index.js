
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taglineRouter from "./src/routes/taglineRoute.js";
import searchRouter from "./src/routes/searchRoute.js";
import keywordRouter from "./src/routes/keywordRoute.js";
import youtubeDataRoute from "./src/routes/youtubeDataRoute.js";
import redditRouter from "./src/routes/redditRoute.js";
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


const PORT = 3000;

app.use("/api/v1/search", searchRouter);
app.use("/api/v1/tagline", taglineRouter);
app.use("/api/v1/keyword", keywordRouter);
app.use("/api/v1/youtube", youtubeDataRoute);
app.use("/api/v1/reddit", redditRouter);


app.listen(PORT, () => {
    
    console.log(`Server running at port ${PORT}`);
  });