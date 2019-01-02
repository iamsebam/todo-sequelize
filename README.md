# todo-sequelize

It's a server-side-rendered app I created for learning purposes. 
This classic express todo application is provided with Passport authentication system and a PostgreSQL database,
managed by the Sequelize ORM.

You can go for a live version here:
https://todo-sequelize-app.herokuapp.com/

Or if you want to run the app in your environment:
1. You need to have PostgreSQL installed on your machine
2. Create a user and a new database
3. Create .env file in root dir and set the environmental variables 
```
NODE_ENV='development'
SESSION_SECRET=YOUR_SESSION_SECRET
```
4. Create config.json file in /config dir and set it accordingly 
```
    {
      "development": {
        "url": "postgres://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
        "port": "{PORT_FOR_EXPRESS}"
      }
    }
```
