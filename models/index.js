const  Blog = require('./blog')
const  User = require('./user')
const UserBlog = require('./user_blogs')
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through :UserBlog, as: 'listed_blogs'})
Blog.belongsToMany(User,{through: UserBlog, as:'intrested_users'})
module.exports = {Blog, User, UserBlog}