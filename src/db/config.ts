import { Sequelize } from "sequelize-typescript";

import { User } from "../models/User";
import { Schedule } from "../models/Schedule";
import { Client } from "../models/Client";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "238462",
    database: "agendaonline",
    logging: false,
    models: [
      User,
      Schedule,
      Client
    ],
  });



export default connection


