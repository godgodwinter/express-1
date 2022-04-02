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
db.siswa = require('./siswa.model')(mongoose);
db.mapel = require('./mapel.model')(mongoose);
db.banksoal = require('./banksoal.model')(mongoose);

module.exports = db;
