let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./helper/database');
let fs = require('fs');
let config = require('./config.json');
let cors = require('cors');
var fbadmin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var winston = require('winston');
var swig = require('swig');
// var firebaseConfig = {
//     apiKey: "AIzaSyDCFNCZ83Kv9Lz5QLoR-e2PaeQDMLqmpvw",
//     authDomain: "whealthylife-ae995.firebaseapp.com",
//     databaseURL: "https://whealthylife-ae995.firebaseio.com",
//     projectId: "whealthylife-ae995",
//     storageBucket: "whealthylife-ae995.appspot.com",
//     messagingSenderId: "802033719823",
//     appId: "1:802033719823:web:495681b8fafb7c5885a17a",
//     measurementId: "G-TB767VQ4NP"
// };
// fbadmin.initializeApp(firebaseConfig);


database.initModels();
let app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

enableCORS(app);
attachBodyParser(app);
enableStaticFileServer(app, config.uploadUrl, '/static');
enableStaticFileServer(app, "/public/admin/", "/");
app.use(cors());
require('./routes')(app);
app.set('views', __dirname + '/routes/payment/views');
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
database.connect();

fbadmin.initializeApp({
    credential: fbadmin.credential.cert(serviceAccount),
    databaseURL: "https://whealthylife-ae995.firebaseio.com"
})

// Make Public And Uploads Folder If Server Have Not
if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
} else {
    if (!fs.existsSync('./public/uploads')) {
        fs.mkdirSync('./public/uploads');
    }
}

// Enable CORS
function enableCORS(expressInstance) {
    expressInstance.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        next();
    });
}

// Attach BodyParser
function attachBodyParser(expressInstance) {
    expressInstance.use(bodyParser.json());
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}

function enableStaticFileServer(expressInstance, folderName, route) {
    app.use(route, express.static(path.join(__dirname, folderName)));
}
app.io = io;
global.socketIo = io;
require('./controllers/socket.controller')(io);

server.listen(config.server.port, () => {
    console.log('App listening on port : ', config.server.port);
});