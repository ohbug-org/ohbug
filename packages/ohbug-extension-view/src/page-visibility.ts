import { getGlobal } from "@ohbug/utils";

import { sendPageView } from "./create-event";
import Session from "./session";
import createUserView from "./user";

const global = getGlobal<Window>();
const HIDDEN = "hidden";
const VISIBLE = "visible";

/**
 * 1. 页面加载时，如果页面的 visibilityState 是可见的，发送 Page View 统计
 * 2. 如果页面的 visibilityState 是隐藏的，就监听 visibilitychange 事件，并在 visibilityState 变为可见时发送 Page View 统计
 * 3. 如果 visibilityState 由隐藏变为可见，并且自上次用户交互之后已经过了“足够长”的时间，就发送新的 Page View 统计
 * 4. 如果 URL 发生变化 发送新的 Page View 统计
 */
class PageVisibility {
  visible: boolean | null = null;

  lastVisible: boolean | null = null;

  initialVisible: boolean | null = null;

  sendPageLoad = false;

  visibleThresholdTimeout = null;

  session: Session;

  static capturePageVisibility() {
    return new PageVisibility();
  }

  constructor() {
    global.addEventListener("visibilitychange", this.handleVisibleChange, true);
    this.setup();
    this.session = new Session();
  }

  setup() {
    // 页面加载时，如果页面的 visibilityState 是可见的，发送 Page View 统计
    if (!this.sendPageLoad) {
      if (document.visibilityState === VISIBLE) {
        this.initialVisible = true;
        sendPageView(global.location.href, true);
        createUserView(global.location.href);
        this.sendPageLoad = true;
      } else {
        this.initialVisible = false;
      }
    }
  }

  destroy() {
    global.removeEventListener("visibilitychange", this.handleVisibleChange, true);
  }

  handleVisibleChange = () => {
    this.lastVisible = this.visible;
    if (document.visibilityState === VISIBLE) {
      this.visible = true;
    } else if (document.visibilityState === HIDDEN) {
      this.visible = false;
    } else {
      this.visible = null;
    }

    const { visible, lastVisible, initialVisible, session } = this;

    // 如果页面的 visibilityState 是隐藏的，就监听 visibilitychange 事件，并在 visibilityState 变为可见时发送 Page View 统计
    if (initialVisible === false && visible === true) {
      sendPageView(global.location.href, true);
      createUserView(global.location.href);
      // 发送后将 initialVisible 置空 防止重复发送
      this.initialVisible = null;
    }

    // 如果 visibilityState 由隐藏变为可见，并且自上次用户交互之后已经过了“足够长”的时间，就发送新的 Page View 统计
    if (lastVisible === false && visible === true && session.isExpired()) {
      sendPageView(global.location.href);
      createUserView(global.location.href);
    }

    if (visible === false) {
      session.update();
    }
  };
}

export default PageVisibility;
