const Koa = require('koa')
const statics = require('koa-static')
const fs = require('fs')
const path = require('path')
const createWebSocket = require('./webSocket')

;(async () => {
  const app = new Koa()
  const staticPath = '../dist'
  app.use(statics(path.join(__dirname, staticPath)))
  const template = fs.readFileSync(path.resolve(__dirname, staticPath + '/index.html'), 'utf-8')
  app.use(async (ctx) => {
    ctx.body = template
  })

  createWebSocket()
  app.listen(8002, () => {
    console.log('server is listening in 8002')
  })
})()
