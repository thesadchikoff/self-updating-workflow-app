// TitleBar.js
import Logo from '@renderer/assets/logo.svg'
import config from '@renderer/shared/config'
import './TitleBar.scss'
const TitleBar = () => {
  const minimizeWindow = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  const maximizeWindow = () => {
    window.electron.ipcRenderer.send('maximize-window')
  }

  const closeWindow = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="titlebar">
      <div className="flex items-center gap-2">
        <img src={Logo} width={16} height={16} />
        <span>{config.applicationName}</span>
      </div>
      <div className="buttons">
        <button onClick={minimizeWindow}>Свернуть</button>
        <button onClick={maximizeWindow}>Full Screen</button>
        <button onClick={closeWindow}>Close</button>
      </div>
    </div>
  )
}

export default TitleBar
