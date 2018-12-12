# todo-sequelize

It's a static website I created for learning purposes. 
This classic express todo application is provided with Passport authentication system and a PostgreSQL database,
managed by the Sequelize ORM.

To run the app in your environment:
1. You need to have PostgreSQL installed on your machine
2. Create a database
3. Create .env file in root dir and set the variables NODE_ENV='development' and your SESSION_SECRET
4. Create config.json file in /config dir and set it like this
{
  "development": {
    "url": "postgres://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
    "port": "{PORT_FOR_EXPRESS}"
  }
}
