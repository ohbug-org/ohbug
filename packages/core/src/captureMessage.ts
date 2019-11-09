import createIssue from './createIssue'
import collector from './collector'
import { MESSAGE } from './types'

type Detail = string

function captureMessage<T = Window>(detail: Detail) {
  const wrappedIssue = createIssue<Detail, T>(MESSAGE, detail)
  collector<T>(wrappedIssue)
}

export default captureMessage
