Note: Nodejs crash course

node modules ⇒ core⇒ path, fs, http

in command line 

repel⇒ read eval print loop ⇒ a sort of interpreter for nodejs or javascript

using main dir: node_crash_course

use `npm init` to start a nodejs project. packages or modules when installed is listed in package.json file.

eg. `npm install uuid` lists it in dependencies in package.json

`npm install -save nodemon or npm install -D nodemon` installs it as devdependecy. nodemon refreshes the server when changes are made. avoids manual restart of server.

can delete all files in node_modules, and when `npm install` is entered. reinstalls the node modules

# Creating files

create index.js file.

```jsx
console.log('Hello from node');
use $ node index.js or node index to run the file. 
```

we have multiple files, which are different modules usually. lets create new file person.js

```jsx
const person = {
    name: 'John Doe',
    age: 30,
}

module.exports = person;

//in index.js
const person = require('./person');

console.log(person);

//change person.js to
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`my name: ${this.name} and I am ${this.age}`);
    }
}

module.exports = Person;
```

in index.js

```jsx
const Person = require('./person');

const person1 = new Person('John',30);

person1.greeting();
```

## Module wrapper function

```jsx
//in person.js
//we dont want to run this code, since it is a module so 
//we use a module wrapper function.
//Module Wrapper Function
(function (exports, require, module, __filename, __dirname) {
    
})

console.log(__dirname, __filename);
gives the directory name of the file its run from. and the filename as well.
full path. check by node index command. 
```

why not `import Person from './person';` because node doesn’t have ES6. we need to use babel compiler to make it work. require method to use modules is CommonJS standard. not ES6(import).

# Node Core Modules

look at core nodules docs. eg. path.basename etc

## path module.

create reference/path_demo.js to run node path_demo

```jsx
//path_demo.js
const path = require('path');

//base file name
console.log(path.basename(__filename));
//=> path_demo.js
//dir name
console.log(path.dirname(__filename));
//=>C:\Users\Sandesh\demos\node_crash_course\reference
//File extension
console.log(path.extname(__filename));
//=>.js
//Create path object
console.log(path.parse(__filename).base);
//Concatenate paths
//../test/hello.html
console.log(path.join(__dirname,'test','hello.html'));
//=>C:\Users\Sandesh\demos\node_crash_course\reference\test\hello.html
```

in windows for directory ‘/’ is used for unix ‘\’ backslash or forward slash is used. so path.join puts the right one for respective os envs. 

## fs module (file system)

```jsx
const fs = require("fs");
const path = require("path");

// Create Folder
//usually async method, takes callback. mkdirSync doesn't take callback.
fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
  if (err) throw err;
  console.log("Folder created....");
});
// to createuse open, to create and write to writeFile
//Create and write to file
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello World!",
  (err) => {
    if (err) throw err;
    console.log("hello.txt file created and written to....");

    // File Append
    fs.appendFile(
      path.join(__dirname, "/test", "hello.txt"),
      "I love nodejs",
      (err) => {
        if (err) throw err;
        console.log("File appended");
      }
    );
  }
);

//Read File
fs.readFile(path.join(__dirname, "/test", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

//Rename file
fs.rename(
  path.join(__dirname, "/test", "hello.txt"),
  path.join(__dirname, "/test", "helloworld.txt"),
  (err, data) => {
    if (err) throw err;
    console.log("File renamed");
  }
);
```

uses prettier extensionin VScode for auto formatting. 

if write overwrites old file completely. to add to the file use append

## OS module

look at main github repo for complete code egs. 

```jsx
const os = require("os");
// Platform
console.log(os.cpus());
// Free memory
console.log(os.freemem()); //=>132071420
// Home dir
console.log(os.homedir());
// Uptime
console.log(os.uptime());
```

## url module

```jsx
const url = require("url");
// const URL = require('url').URL;
/* NOTE: if you are using v6 (LTS), line 1 gives errors,
 *  if you get an error saying, TypeError: URL is not a constructor,
 *  comment line 1, and uncomment line 2 */
const myUrl = new URL("http://mywebsite.com/hello.html?id=100&status=active");
// Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());
// Host (root domain)
console.log(myUrl.host); //=>mywesbite.com:8000
// Hostname (does not get port)
console.log(myUrl.hostname); //=>mywebsite.com
// Pathname
console.log(myUrl.pathname); //=>/hello.html
// Serialized query
console.log(myUrl.search); //=>?id=100&status=active
// Params object
console.log(myUrl.searchParams);
//=>URLSearchParams { 'id' => '100', 'status' => 'active' }
// Add param
myUrl.searchParams.append("abc", "123");
console.log(myUrl.searchParams);
//=>URLSearchParams { 'id' => '100', 'status' => 'active', 'abc' => '123' }
// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
//=>id: 100
// status: active
// abc: 123
```

# Events

refer to docs always. emit named events that cause Function objects(listeners) to be called.

```jsx
//create event_demo.js
const EventEmitter = require("events");
// Create class
class MyEmitter extends EventEmitter {}
// Init object
const myEmitter = new MyEmitter();
// Event listener
myEmitter.on("event", () => console.log("Event Fired!"));
// Init event
myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
```

## logger.js event example.

```jsx
//uuid gives random id uuid.v4()
const EventEmitter = require("events");
const uuid = require("uuid");

class Logger extends EventEmitter {
  log(msg) {
    // Call event
    this.emit("message", { id: uuid.v4(), msg }); //msg: msg or just msg(same)
  }
}
// module.exports = Logger; //enable this when below code is in index.js
//clear index.js and replace with
//index.js
const logger = new Logger();

logger.on("message", (data) => console.log("Called Listener", data));

logger.log("Hello World");
logger.log("Hi");
logger.log("Hello");
```

## http demo

```jsx
//create reference/http_demo.js
const http = require("http");
// Create server object
http.createServer((req, res) => { //request and response parameters. 
    // Write response 
    res.write("Hello World");
    res.end();
  }).listen(5000, () => console.log("Server running...")); //a callback function.
```

node http_demo⇒go to [localhost:5000](http://localhost:5000) to view hello world result. 

# Create actual webserver

58:13

with express framework, easy. `app.get('/about', callback_fn())` 

still good to learn to handle requests the vanilla way. 

```jsx
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => { 
	if (req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end('<h1>Homepage</h1>');
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Servr runningonport ${PORT}`));
```

if run node index, the Homepage doesn’t show when page is reloaded. have to stop the server and restart it by again doing node index. 

`nodemon index` since not installed globally, we must create script(not recommend to install globally)

```jsx
in package.json
“scripts” : {”start”: “node index”,

“dev”: “nodemon index”}, `
```

now use `npm run dev` it is running the dev script. 

add `res.writeHead(200, { 'Content-Type': 'text/html' });` 

add index.html, about.html in public folder. `! and tab` to create boilerplate html. add headings.

```jsx
//inside server = ......
if (req.url === '/') { //res.end('<h1>Home</h1>');
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    );
  }

  if (req.url === '/api/users') {
    const users = [ 
      { name: 'Bob Smith', age: 40 },
      { name: 'John Doe', age: 30 }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
```

not efficient, for every page url we have to do if... and we also need css so.

## dynamic filepath, and server

1:13:20

1. createserver req,resp
2. look in public folder, see if req.url is / or other. then index.html or other url
3. get extension name, and then set content type based on that with switch
4. if err.code is ‘ENOENT” then its 404 error, so send back a 404.html page(200protocol)
5. else 500 error. send back error code 
6. else(if err false) then it is successful.  send back res.end(content)

```jsx
//comment out old code inside server component. 
// Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file (to send the content-type in http response)
  let extname = path.extname(filePath);
  // Initial content type
  let contentType = "text/html";
  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  // Check if contentType is text/html but no .html file extension
//  if (contentType == "text/html" && extname == "") filePath += ".html";
  // log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") { 
        // Page not found, create a public/404.html 
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});
```

create public/css/style.css link in index.html,about.html,404.html.

`<link rel="stylesheet" href="./css/style.css" />`

```jsx
body {
	background: #333;
	color: $fff;
}
```

see if we’re giving correct content-type and content. 

# Deployment to Heroku

1:25:09

heroku login. we push using git. create .gitignore. add `node_modules reference logger.js person.js`

`$git init $git add . $git commit -m 'first commit'` click the given link. and in heroku go to deploy. copy command to add to remote repository.

`heroku git:remote -a limitless-meadow-87507` and paste in terminal.

then`git push heroku master` to see in site. `heroku open`
