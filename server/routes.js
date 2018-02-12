import Router from 'koa-router'
import { spawnSync } from 'child_process'
import logger from './logger'

export default function routes(server) {
  const apiRouter = new Router()

  apiRouter.get('/', async ctx => {
    ctx.body = { ok: true }
  })

  apiRouter.put('/aircon/power', async ctx => {
    const cmd = spawnSync('/usr/bin/irsend', ['SEND_ONCE', 'aircon', 'on'])
    if (cmd.error) {
      logger('irsend error:', cmd.error)
      ctx.body = {
        ok: false,
        message: 'irsend command failed',
        result: cmd.error.toString()
      }
    } else {
      ctx.body = {
        ok: true,
        message: 'The aircon switched ON',
        result: cmd.stdout.toString()
      }
    }
  })

  apiRouter.delete('/aircon/power', async ctx => {
    const cmd = spawnSync('/usr/bin/irsend', ['SEND_ONCE', 'aircon', 'off'])
    if (cmd.error) {
      logger('irsend error:', cmd.error)
      ctx.body = {
        ok: false,
        message: 'irsend command failed',
        result: cmd.error.toString()
      }
    } else {
      ctx.body = {
        ok: true,
        message: 'The aircon switched OFF',
        result: cmd.stdout.toString()
      }
    }
  })

  server.use(apiRouter.routes())
}
