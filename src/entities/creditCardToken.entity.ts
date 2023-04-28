import {
  Entity,
  ObjectId,
  Column,
  OneToOne,
  JoinColumn,
  ObjectIdColumn,
} from "typeorm";
import { CreditCard } from "./creditCard.entitiy";
import { expiresDate } from "../utils/methods";

@Entity()
export class CreditCardToken {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column(() => CreditCard)
  credit_card: CreditCard;

  @Column()
  token: string;

  @Column()
  expires_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
    this.expires_at = expiresDate();
  }

  public static create(data: {
    credit_card: CreditCard;
    token: string;
  }): CreditCardToken {
    const creditCardToken = new CreditCardToken();

    Object.assign(creditCardToken, data);

    return creditCardToken;
  }
}
