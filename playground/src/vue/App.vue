<template>
  <div>
    <h2>Ohbug Vue Demo</h2>

    <div>
      <button @click="onClickAbnormalXhr">
        异常XHR
      </button>
      <button @click="onClickAbnormalFetch">
        异常Fetch
      </button>
      <button @click="onClickTriggerUnhandledrejection">
        Promise错误
      </button>
      <button @click="onClickTriggerCodeError">
        代码错误
      </button>
      <button @click="onClickCustomLog">
        自定义log
      </button>
      <button @click="onClickRenderError">
        render错误
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import { client } from './ohbug'

export default {
  setup() {
    const onClickAbnormalXhr = () => {
      const xhr = new XMLHttpRequest()
      xhr.open('get', 'http://a.com/b')
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.send()
    }
    const onClickAbnormalFetch = () => {
      fetch('http://a.com/b', { method: 'GET' })
    }
    const onClickTriggerUnhandledrejection = async() => {
      // eslint-disable-next-line promise/param-names
      const promise = new Promise((_, reject) => {
        reject(new Error('this is a reject message in Promise'))
      })
      await promise
    }
    const onClickTriggerCodeError = () => {
      const obj = {} as any
      obj.noObj.noField = 'no field'
    }
    const onClickCustomLog = () => {
      const event = client.createEvent({
        category: 'error',
        type: 'custom',
        detail: 'im custom log',
      })
      client.notify(event)
    }
    const renderError = ref(false)
    const onClickRenderError = () => {
      renderError.value = true
    }
    watchEffect(() => {
      if (renderError.value) throw new Error('is Render error')
    })

    return {
      onClickAbnormalXhr,
      onClickAbnormalFetch,
      onClickTriggerUnhandledrejection,
      onClickTriggerCodeError,
      onClickCustomLog,
      onClickRenderError,
    }
  },
}
</script>
