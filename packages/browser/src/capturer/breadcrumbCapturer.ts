import captureUrlChange from './breadcrumb/captureUrlChange'
import captureClick from './breadcrumb/captureClick'

function breadcrumbCapturer() {
  captureUrlChange()
  captureClick()
}

export default breadcrumbCapturer
