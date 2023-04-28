import {
  DataSource,
  EntityTarget,
  MongoRepository,
  ObjectLiteral,
} from "typeorm";
import config from "../config";
import { CreditCard, CreditCardToken } from "../entities";

const dataSource = new DataSource({
  type: "mongodb",
  url: config.MONGODB_URL,
  entities: [CreditCard, CreditCardToken],
  // synchronize: true,
});

export const dataSourceGetRepository = async <T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Promise<MongoRepository<T>> => {
  if (dataSource.isInitialized === false) await dataSource.initialize();

  return dataSource.getMongoRepository(entity) as MongoRepository<T>;
};
