export const enum EventTypes {
  // error
  UNCAUGHT_ERROR = 'uncaughtError', // 意料之外的错误
  RESOURCE_ERROR = 'resourceError', // 资源加载错误
  UNHANDLEDREJECTION_ERROR = 'unhandledrejectionError', // unhandledrejection 错误，可能包含 Promise, react render 等错误
  AJAX_ERROR = 'ajaxError', // ajax 错误
  FETCH_ERROR = 'fetchError', // fetch 错误
  WEBSOCKET_ERROR = 'websocketError', // websocket 错误
  UNKNOWN_ERROR = 'unknownError', // 未知错误
  // message
  MESSAGE = 'message', // 主动上报的信息
  // feedback
  FEEDBACK = 'feedback', // 反馈
  // view
  VIEW = 'view', // 用于计算 PV/UV
  // react
  REACT = 'react',
  // vue
  VUE = 'vue',
  // angular
  ANGULAR = 'angular',
  // miniapp
  MINIAPP_ERROR = 'miniappError',
  MINIAPP_UNHANDLEDREJECTION_ERROR = 'miniappUnhandledrejectionError',
  MINIAPP_PAGENOTFOUND_ERROR = 'miniappPagenotfoundError',
  MINIAPP_MEMORYWARNING_ERROR = 'miniappMemorywarningError',
}
