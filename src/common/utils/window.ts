const events = {
  'win-maximize': () => electron.send('win-maximize', 'some data'),
  'win-restore': () => electron.send('win-restore', 'some data'),
  'win-minimize': () => electron.send('win-minimize', 'some data'),
  'win-close': () => electron.send('win-close', 'some data'),
  'open-dev': () => electron.send('open-dev', 'some data'),
  'open-directory': () => electron.send('open-directory', 'some data')
}
export default events
