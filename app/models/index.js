const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.posts = require('./post.model')(mongoose);
db.users = require('./user.model')(mongoose);
db.tapels = require('./tapel.model')(mongoose);
db.kelas = require('./kelas.model')(mongoose);

module.exports = db;
