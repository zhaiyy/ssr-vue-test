const Vue = require('vue')
const server = require('express')()
const serverRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const createApp = require('./main')

const templatePath = path.join(__dirname, '../public/index.template.html')

const renderer = serverRenderer.createRenderer({
    template: fs.readFileSync(templatePath, 'utf-8')
})
server.get('*', (req, res) => {
    const App = {
        data: {
          url: req.url
        },
        title: '自定义',
        template: `<div>访问的 URL 是： {{ url }}</div>`
      }
  const app = createApp(App)
  const context = {
    title: '自定义'
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)