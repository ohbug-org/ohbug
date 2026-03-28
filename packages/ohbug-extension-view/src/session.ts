const DEFAULT_TIMEOUT = 30 * 60 * 1000;

class Session {
  session: number | null = null;

  timeout: number = DEFAULT_TIMEOUT;

  constructor(timeout: number = DEFAULT_TIMEOUT) {
    this.session = Date.now();
    this.timeout = timeout;
  }

  /**
   * 检查当前 session 是否过期
   *
   * @returns {boolean}
   */
  isExpired() {
    if (!this.session) {
      throw new Error("Session 没有初始化");
    }
    const now = Date.now();
    return this.session + this.timeout < now;
  }

  update() {
    if (!this.session) {
      throw new Error("Session 没有初始化");
    }
    const now = Date.now();
    this.session = now;
    return this.session;
  }
}

export default Session;
