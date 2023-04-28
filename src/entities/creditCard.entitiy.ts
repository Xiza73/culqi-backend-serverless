import { Entity, ObjectIdColumn, ObjectId, Column, OneToOne } from "typeorm";
import { CreditCardRequest } from "../utils/interfaces";

@Entity()
export class CreditCard {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  card_number: string;

  @Column()
  expiration_month: string;

  @Column()
  expiration_year: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static create(data: CreditCardRequest): CreditCard {
    const creditCard = new CreditCard();

    Object.assign(creditCard, data);

    return creditCard;
  }
}
