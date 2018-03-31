module.exports = {
    serverPort: 3000,

    mongoHost: "127.0.0.1",
    mongoPort: 27017,
    mongoDatabase: "blog",

    redisHost: "127.0.0.1",
    redisPort: 6379,
    redisPassword: "",

    tokenSecret: "test",
    tokenExpiresIn: 60 * 60,

    defaultAdminName: "admin",
    defaultAdminPassword: "admin",

    logDirPath: "./var/log",
    logFileName: "foo.log"
}