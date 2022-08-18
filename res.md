[video : Ecommerce MERN Playlist](https://www.youtube.com/watch?v=eGK91NZbTgo&list=PLFcwiScIb5d9aGKb-_F8nBfjGs9WQzWxV)

# Class - 1 [Preview & Initial Setup](https://www.youtube.com/watch?v=eGK91NZbTgo&list=PLFcwiScIb5d9aGKb-_F8nBfjGs9WQzWxV)

#### Tasks:
- [ ] Folder Structure
	- [ ] Make directory `server` 
	- [ ] Go to server and open VS Code
	- [ ] Make another directory `server > config` 
	- [ ] make file `server > config > server.js`
- [ ] npm initialization & setup some required package (by `yarn add`) initially
	- [ ] express
	- [ ] dotenv
	- [ ] morgan
	- [ ] cors
- [ ] coding: server. js
- [ ] Setup `nodemon` command in `package.json`
	```
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"nodemon": "npx nodemon server.js"
	},
	```

###### Command:
`mkdir server && cd server && code. `

###### create
	config directory
		- server.js

###### command:
```
 npm init -y
- yarn add express dotenv morgan cors
```
----
###### Start Coding:
	server.js
###### Command for run server.js with nodemon
```
- npx nodemon server.js
```
> morgan for development give info about each request
---
---
# Class - 2: [Register User](https://www.youtube.com/watch?v=gkyLFG3nFy8&list=PLFcwiScIb5d9aGKb-_F8nBfjGs9WQzWxV&index=2)

###### create:
	models > user.js
###### install mongoose by command:
> yarn add mongoose
###### Start Coding: 
- [ ] Schema:  `models > user.js`	
	- [X] create schema `UserSchema`
	- [X] create model `User`
	- [X] module.exports
- [ ] Routing: `routes > auth.route.js`
	- [ ] import & get all the required, npm packages for authenticate
		- [ ] express
			- [ ] router
		- [ ] jsonwebtoken
		- [ ] bcryptjs 
			> yarn add jsonwebtoken bcryptjs
		- [ ] express-validator
			- [ ] check & validationResult
		- [ ] gravatar
			> yarn add express-validator gravatar
	- [ ] require or import user model from `models > User.js`
	- [ ] `register` post method
		- [ ] `check()` the request
		- [ ] get all the data/info from `req.body`
		- [ ] `try-catch` 
			- [ ] try: check if the user already exist or not. If not then
				- [ ] get the image by `gravatar`
				- [ ] encrypt password by `bcryptjs`
				- [ ] Create User Object and save it to `database`
				- [ ] generate token by `jwt` with `payload` of user id
	- [ ] export `router`
- [ ] add/use `auth.route.js` to `server.js`
	`app.use('/api/user/',require('./routes/auth.route'));`
- [ ] make mongodb connection `config > db.js`
	```
	const mongoose = require('mongoose');
	const connectDb = async () => {
		try {
			const connect = await mongoose.connect(process.env.MONGO_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			console.log(`MongoDb connected: ${connect.connection.host}`);
		} catch (error) {
			console.log(error.message)
		}
	}

	module.exports = connectDb;
	```
- [ ] lets try to sign up user by the help of `postman`
---
