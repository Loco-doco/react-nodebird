import Sequelize from 'sequelize'
// const Sequelize = require('sequelize');

import UserModel from './user';
import CommentModel from './comment';
import HashtagModel from './hashtag';
import ImageModel from './image';
import PostModel from './post';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.Comment = CommentModel(sequelize, Sequelize);
// db.Comment = require('./comment')(sequelize, Sequelize);
db.Post = PostModel(sequelize, Sequelize);
// db.Post = require('./post')(sequelize, Sequelize);
db.Image = ImageModel(sequelize, Sequelize);
// db.Image = require('./image')(sequelize, Sequelize);
db.Hashtag = HashtagModel(sequelize, Sequelize);
// db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);
// db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// export default db; 로 했을 시 object 값 그 자체를 넘김
// module.exports 로 db를 export 할 시, db의 object 내부 값을 넘김
