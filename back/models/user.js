const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(45),
      allowNull: false, //  IS NOT NULL (필수),
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false, //  IS NOT NULL (필수)
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, //  IS NOT NULL (필수)
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });

  User.associate=(db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like' , as: 'LikedPost'});
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' })
  };
  return User;
}

export default UserModel;