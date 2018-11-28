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

- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [ws](https://www.npmjs.com/package/ws)
- [Expressjs](https://expressjs.com/)
- react: "16.6.3"
- react-dom: "16.6.3"

### DevDependencies

- @babel/core : "^7.1.6"
- @babel/plugin-proposal-class-properties: "^7.1.0"
- @babel/preset-env: "^7.1.6"
- @babel/preset-react: "^7.0.0"
- babel-loader: "^8.0.4"
- css-loader: "^1.0.1"
- html-webpack-plugin: "^3.2.0"
- node-sass: "^4.10.0"
- sass-loader: "^7.1.0"
- style-loader: "^0.23.1"
- webpack: "^4.26.1"
- webpack-cli: "^3.1.2"
