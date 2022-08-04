import * as pty from 'node-pty'
import * as os from 'os'

export const createTerminal = (url) => {
  const shell: any = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
  // @ts-ignore
  const path = url ?? process.env['HOMEDRIVE'] + '' + process.env['HOMEPATH']
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cwd: path, //process.env.INIT_CWD
    env: process.env as any
  })
  return ptyProcess
}
