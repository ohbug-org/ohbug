import createIssue from './createIssue'
import collector from './collector'
import { MESSAGE } from './types'

type Detail = string

function captureMessage(detail: Detail) {
  const wrappedIssue = createIssue<Detail>(MESSAGE, detail)
  collector(wrappedIssue)
}

export default captureMessage
