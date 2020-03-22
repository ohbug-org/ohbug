import captureUrlChange from './action/captureUrlChange'
import captureClick from './action/captureClick'

function actionCapturer() {
  captureUrlChange()
  captureClick()
}

export default actionCapturer
