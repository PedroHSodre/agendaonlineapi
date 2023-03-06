import { 
    Table, 
    Model, 
    Column, 
    DataType 
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "schedule",
})
export class Schedule extends Model {
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
  data!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userUuid!: string;
}