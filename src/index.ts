import express from "express";
import { json, urlencoded } from "body-parser";
import cors from 'cors';

import AuthRoute from './router/auth';
import UserRoute from './router/user';
import ScheduleRoute from './router/schedule';
import ClientRoute from './router/client';

import connection from "./db/config";

const app = express();

app.use(express.json());
app.use(cors())

app.use(urlencoded({ extended: true }));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/schedule", ScheduleRoute);
app.use("/client", ClientRoute)


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

const forceDBUpdate = false;
connection
    .sync({ force: forceDBUpdate })
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err: any) => {
      console.log("Error", err);
    });

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});