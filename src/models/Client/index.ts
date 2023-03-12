import { Table, Model, Column, DataType } from "sequelize-typescript";
import { User } from "../User";

@Table({
  timestamps: false,
  tableName: "client",
})
export class Client extends Model {
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
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  document!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
}