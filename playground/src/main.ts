import 'virtual:windi.css'

import reactURL from './react/index.html?url'
import vueURL from './vue/index.html?url'

window.addEventListener('load', () => {
  const react = document.querySelector('#react') as HTMLIFrameElement
  if (react)
    react.src = reactURL

  const vue = document.querySelector('#vue') as HTMLIFrameElement
  if (vue)
    vue.src = vueURL
})
