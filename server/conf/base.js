module.exports = {
    serverPort: 3000,   // 服务监听端口
    origin: ["http://localhost:8080"], // Access-Control-Allow-Origin 白名单, 数组

    mongoHost: "127.0.0.1",
    mongoPort: 27017,
    mongoDatabase: "blog",

    redisHost: "127.0.0.1",
    redisPort: 6379,
    redisPassword: "asdASvaQ@adf_afdsAWD123+mfght",

    tokenSecret: "test",
    tokenExpiresIn: 60 * 60,

    adminName: "admin", // 管理员账户信息
    adminPassword: "admin",
    adminDisplayName: "admin",
    adminEmail: "",

    staticDirName: "./static",  // 静态文件目录
    uploadImgDirName: "images",  // 上传图片的存储目录名

    logDirPath: "./var/log", // 日志存储目录
    logFileName: "foo.log",  // 日志文件名

    prefix: "/api" // 接口根路由
}
