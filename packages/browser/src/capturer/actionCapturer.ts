import captureUrlChange, { removeCaptureUrlChange } from './action/captureUrlChange'
import captureClick, { removeCaptureClick } from './action/captureClick'

function actionCapturer() {
  captureUrlChange()
  captureClick()
}

export function removeActionCapturer() {
  removeCaptureUrlChange()
  removeCaptureClick()
}

export default actionCapturer
