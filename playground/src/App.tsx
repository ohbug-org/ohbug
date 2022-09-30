import { useCallback, useState } from 'react'
import axios from 'axios'
import { client } from './ohbug'

const instance = axios.create({ timeout: 1000 })
instance.interceptors.response.use(() => {}, (error) => {
  return Promise.reject(error)
})

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
    xhr.open('get', 'http://a.com/b?foo=bar')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
  }, [])
  const onClickAbnormalFetch = useCallback(() => {
    fetch('http://a.com/b/c?foo=bar', { method: 'POST', body: JSON.stringify({ foo2: 'bar2' }) })
  }, [])
  const onClickAbnormalAxios = useCallback(() => {
    instance.post('http://a.com/b/c', { foo2: 'bar2' })
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

  if (renderError) {
    throw new Error('is Render error')
  }

  else {
    return (
      <div>
        <button onClick={onClickAbnormalXhr}>异常XHR</button>
        <button onClick={onClickAbnormalFetch}>异常Fetch</button>
        <button onClick={onClickAbnormalAxios}>异常axios</button>
        <button onClick={onClickTriggerUnhandledrejection}>Promise错误</button>
        <button onClick={onClickTriggerCodeError}>代码错误</button>
        <button onClick={onClickCustomLog}>自定义log</button>
        <button onClick={onClickRenderError}>render错误</button>
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
