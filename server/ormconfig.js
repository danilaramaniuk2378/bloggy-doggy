const {
  POSTGRES_USER,
  CODE_FOLDER,
  FILE_EXTENSION,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

module.exports = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [`${CODE_FOLDER}/entities/**/*.${FILE_EXTENSION}`],
  migrations: [`${CODE_FOLDER}/migration/**/*.${FILE_EXTENSION}`],
  subscribers: [`${CODE_FOLDER}/subscriber/**/*.${FILE_EXTENSION}`],
  cli: {
    entitiesDir: `${CODE_FOLDER}/entities`,
    migrationsDir: `${CODE_FOLDER}/migration`,
    subscribersDir: `${CODE_FOLDER}/subscriber`,
  },
};
