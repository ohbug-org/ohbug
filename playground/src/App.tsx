import { useCallback, useState } from 'react'
import { client } from './ohbug'

async function createCustomEvent() {
  const event = client.createEvent({
    category: 'error',
    type: 'custom',
    detail: 'im custom log',
  })
  client.notify(event)
}

function Trigger() {
  const onClickAbnormalXhr = useCallback(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://a.com/b')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
  }, [])
  const onClickAbnormalFetch = useCallback(() => {
    fetch('http://a.com/b', { method: 'GET' })
  }, [])
  const onClickTriggerUnhandledrejection = useCallback(async() => {
    // eslint-disable-next-line promise/param-names
    const promise = new Promise((_, reject) => {
      reject(new Error('this is a reject message in Promise'))
    })
    return await promise
  }, [])
  const onClickTriggerCodeError = useCallback(() => {
    const obj = {} as any
    obj.noObj.noField = 'no field'
  }, [])
  const onClickCustomLog = useCallback(() => {
    createCustomEvent()
  }, [])
  const [renderError, setRenderError] = useState(false)
  const onClickRenderError = useCallback(() => {
    setRenderError(true)
  }, [])
  const onClickTriggerRejectionWithAnNumber = useCallback(async(number: number) => {
    for (let i = 0; i < number; i++) { createCustomEvent() }
  }, [])
  if (renderError) {
    throw new Error('is Render error')
  }

  else {
    return (
      <div>
        <button onClick={onClickAbnormalXhr}>异常XHR</button>
        <button onClick={onClickAbnormalFetch}>异常Fetch</button>
        <button onClick={onClickTriggerUnhandledrejection}>Promise错误</button>
        <button onClick={onClickTriggerCodeError}>代码错误</button>
        <button onClick={onClickCustomLog}>自定义log</button>
        <button onClick={onClickRenderError}>render错误</button>

        <button onClick={() => onClickTriggerRejectionWithAnNumber(100)}>100 errors</button>
        <button onClick={() => onClickTriggerRejectionWithAnNumber(1000)}>1000 errors</button>
        <button onClick={() => onClickTriggerRejectionWithAnNumber(10000)}>10000 errors</button>
        <button onClick={() => onClickTriggerRejectionWithAnNumber(50000)}>50000 errors</button>
        <button onClick={() => onClickTriggerRejectionWithAnNumber(100000)}>100000 errors</button>
      </div>
    )
  }
}

function App() {
  return (
    <div id="react-app">
      <h2>Ohbug React Demo</h2>

      <Trigger />
    </div>
  )
}

export default App
