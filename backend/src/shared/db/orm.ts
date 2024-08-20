import { MikroORM } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import dotenv from 'dotenv';
dotenv.config();

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.MYSQL_DATABASE,
  driver: MySqlDriver,
  clientUrl: process.env.MYSQL_PUBLIC_URL,
  highlighter: new SqlHighlighter(),
  debug: true,

  // <<Descomentar si se trabaja en un entorno local => localhost>>

  // schemaGenerator: {
  //   // never in production
  //   disableForeignKeys: true,
  //   createForeignKeyConstraints: true,
  //   ignoreSchema: [],
  // },
});

// <<Descomentar si se trabaja en un entorno local => localhost>>

// export const syncSchema = async () => {
//   const generator = orm.getSchemaGenerator();
//   /*
//   await generator.dropSchema()
//   await generator.createSchema()
//   */
//   await generator.updateSchema();
// };
