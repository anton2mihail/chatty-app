# Chatty App

A minimal and light chatroom buit with ReactJS.

### Usage

Fork then clone the repo.

```
git clone git@github.com:{yourUsername}chatty-app/.git
cd chatty-app
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:8080
```

Open another terminal folder to start the websocket server

```
cd chatty-websocket
npm install
npm start
```

### Static Files

You can store static files like images, fonts, etc in the `dist` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:8080/dist/my_image.png`.

### Dependencies

- React
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [ws](https://www.npmjs.com/package/ws)
- [Expressjs](https://expressjs.com/)
