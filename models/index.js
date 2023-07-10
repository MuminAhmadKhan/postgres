const Blog = require('./blog')
const User = require('./user')
const UserBlog = require('./user_blogs')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through :UserBlog, as: 'listed_blogs'})
Blog.belongsToMany(User,{through: UserBlog, as:'intrested_users'})

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {Blog, User, UserBlog, Session}