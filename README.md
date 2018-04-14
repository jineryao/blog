# blog

个人博客系统, SPA + RESTful 风格

# Demo

> 博客: [http://smcay.xyz](http://smcat.xyz)

# Contents

*   [部署](#部署)
    *   [依赖](#依赖)
    *   [应用配置](#应用配置)
    *   [server](#server)
    *   [front](#front)
    *   [admin](#admin)
*   [RESTful API](#RESTful-API)
    *   [说明](#说明)
    *   [权限验证](#权限验证)
    *   [示例](#示例)

# 部署

## 依赖

> 目前线上的环境

*   Node `v9.10.0`
*   pm2 `v2.10.1`
*   MongoDB `v3.6.3`
*   Redis `v4.0.9`
*   Nginx `v1.12.2`

## 应用配置

<details>
<summary>server基础配置</summary>  

> 基础配置文件: `/blog/server/conf/base.js` 

```javascript
{
    // node 服务配置
    serverPort: 3000    // 监听端口
    origin: [String],   // Access-Control-Allow-Origin白名单数组

    // MongoDB 配置
    mongoName: "",          // 权限用户名
    mongoPwd: "",           // 权限用户密码
    mongoHost: "127.0.0.1", // 链接地址
    mongoPort: 27017,       // 链接端口号
    mongoDatabase: "blog",  // 数据库名

    // Redis 配置
    redisHost: "127.0.0.1", // 链接地址
    redisPort: 6379,        // 链接端口号
    redisPassword: "",      // 权限密码

    // Token 配置
    tokenSecret: "",            // 生成时撒的盐
    tokenExpiresIn: 60 * 60,    // 过期设置(秒)

    // admin 管理员用户信息
    adminName: "",          // 用户名
    adminPassword: "",      // 用户密码
    adminDisplayName: "",   // 用户称呼
    adminEmail: "",         // 用户邮箱

    // 静态资源存储目录
    staticDirName: "./static",  // 总目录,以server为根目录
    uploadImgDirName: "images", // 图片的存储目录,以`staticDirName`为根目录

    // 日志
    logDirPath: "./var/log", // 存储目录
    logFileName: "foo.log",  // 文件名

    // RESTful
    prefix: "/api" // 接口根路由
}
```

</details>

<details>
<summary>nginx配置</summary>  

> nginx 配置文件: `/etc/nginx.conf`  
> `注意: nginx配置的参数对应server的配置`

```
#压缩
gzip on;  
gzip_min_length 1k;  
gzip_comp_level 2;  
gzip_types      text/plain text/css text/javascript image/jpeg image/gif image/png image/jpg;  
gzip_vary       on;  
gzip_disable    "MSIE [1-6]\.";  

server {                                    #amdin入口
    listen       80;  
    server_name admin.smcat.com;  
    location / {  
        root   /mnt/www/blog/admin/dist;    #admin打包后存储目录
        index  index.html index.htm;  
        try_files $uri $uri/ /index.html;  
    }  
}  

server {                        #front(博客)入口
    listen    80;  
    server_name smcat.xyz;      
    client_max_body_size 20M;   #上传文件大小限制
    location ~ ^/(images)/ {    #图片静态目录入口
        root  /mnt/www/blog/server/static/;  
        autoindex on;
        expires 30d;
    }
    location /api/ {
        proxy_pass     http://localhost:3000;   #RESTful请求监听
        proxy_set_header  Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location / {
        proxy_pass     http://localhost:8080;   #front监听
        proxy_set_header  Host $host;
        proxy_set_header X-Forwarded-For	$remote_addr;
        proxy_set_header X-Forwarded-Proto	$scheme;
    }
}  
```

</details>

<details>
<summary>pm2配置</summary>  

> pm2 配置文件: `/blog/pm2.js`  
> pm2 全局安装, 启动命令(blog 目录下): `pm2 startOrRestart pm2.js`

```javascript
module.exports = {
    apps: [
        {
            name: "blogServer", // server入口
            script: "server/app.js",
            cwd: "./",
            watch: true,
            max_memory_restart: "256M",
            exec_mode: "cluster",
            autorestart: true
        },
        {
            name: "blogFront", // 前端ssr入口
            script: "front/production.js",
            cwd: "./",
            watch: true,
            env: {
                NODE_ENV: "production" // 环境参数
            }
        }
    ]
}
```

</details>

## server

> 安装依赖: `npm i`  
> 启动由 **pm2** 完成  
> `注意: 静态文件目录和nginx同步`

## front

> 安装依赖: `npm i`  
> 打包程序: `npm run build`  
> 启动由 **pm2** 完成  
> `注意: favicon.ico存储在front根目录`

## admin

> 安装依赖: `npm i`  
> 打包程序: `npm run build`  
> 程序由 **ngxin** 托管  
> `注意: 打包后的dist目录的位置`

# RESTful-API

## 说明

服务器配置默认 3000 端口  
请求接口默认博客路由`/api`

> 接口示例: `http://smcat.xyz/api/xxx`

## 权限验证

> 验证数据提交方式: 头信息 header 中的`authorization`设置为服务器下发的 Token  
> 获取 Token 的方式: `http://smcat.xyz/api/admin/login` 提交 `用户名,密码`

目前`RESTful`接口需要通过验证的:

*   登录
*   user 表请求
*   所有非 get 请求

## 示例

### 已支持的动词

```
get
post
put
delete
```

### 查询

#### 查询所有文章

> GET http://smcat.xyz/api/post

#### 带有参数的查询

> GET http://smcat.xyz/api/post?limit=2&skip=0&select=%7B%22title%22:1,%22pathName%22:1%7D&conditions=%7B%22isPublic%22:true%7D&sort=%7B%22createdAt%22:-1%7D

```javascript
// 请求的参数列表:
{
    limit: 2,           // 返回值条数
    skip: 0,            // 过滤掉几条数据
    select: {           // 需要的字段(_id默认返回,不需要则添加 _id:0 )
        "title":1,
        "pathName":1
    }, 
    conditions: {       // 查询条件(公开的post)
        "isPublic":true
    },  
    sort: {             // 排序(按新建时间倒序)
        "createdAt":-1
    }          
}

// 响应值列表:
{
    "total": 1,      // 总条数
    "result": [
        {
            "_id":"5ace23d9151c1c8570574702",
            "title":"起始，记录整站构思和体验",
            "pathName":"start"
        }
    ]
}
```

### 新增

需要验证Token, body中存储需要新增的文档`(JSON格式)`  
modelName可支持的数值, 查看`/server/model/`目录下的模型key

> POST https://smcat.xyz/api/:modelName    


### 更新

需要验证Token, body中存储需要更新的文档`(JSON格式)`  
modelName可支持的数值, 查看`/server/model/`目录下的模型key  
id为被更新的文档 `_id`

> PUT https://smcat.xyz/api/:modelName/:id  


### 删除

同更新

> DELETE https://smcat.xyz/api/:modelName/:id