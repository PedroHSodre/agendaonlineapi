import { Table, Model, Column, DataType, Index } from "sequelize-typescript";
import { Client } from "../Client";

@Table({
  timestamps: false,
  tableName: "user",
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cellphone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  document!: string;
}



// User.sync({ force: true })