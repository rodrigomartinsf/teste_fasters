import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table
export class Price extends Model<Price> {
  
  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  ticker: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  year: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  month: string;

  @Column({
    type: DataType.DECIMAL(10,6),
    allowNull: false
  })
  open_price: number;

  @Column({
    type: DataType.DECIMAL(10,6),
    allowNull: false
  })
  highest_price: number;

  @Column({
    type: DataType.DECIMAL(10,6),
    allowNull: false
  })
  lowest_price: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  volume: number;

  @Column({
    type: DataType.DECIMAL(10,6),
    allowNull: false
  })
  close_price: number;

}