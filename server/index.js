import Koa from 'koa'
import koalogger from 'koa-logger'
import logger from './logger'
import routes from './routes'

const app = new Koa()
app.keys = ['this is raspcon', 'created by takuya']
app.use(koalogger())
routes(app)

const port = process.env.PORT || 3003
logger('Server starting on port', port)
app.listen(port)

// Tell parent process koa-server is started
if (process.send) process.send('online')
