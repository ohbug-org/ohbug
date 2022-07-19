// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
export const docCookies = {
  getItem(sKey: string): string | null {
    return (
      decodeURIComponent(document.cookie.replace(
        new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(
          /[-.+*]/g,
          '\\$&',
        )}\\s*\\=\\s*([^;]*).*$)|^.*$`),
        '$1',
      )) || null
    )
  },
  setItem(
    sKey: string,
    sValue: string,
    vEnd?: number | string | Date,
    sPath?: string,
    sDomain?: string,
    bSecure?: boolean,
  ): string | false {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false }

    let sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires
            = vEnd === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : `; max-age=${vEnd}`
          break
        case String:
          sExpires = `; expires=${vEnd}`
          break
        case Date:
          sExpires = `; expires=${(vEnd as Date).toUTCString()}`
          break
        default:
          break
      }
    }
    const value = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${
      sPath ? `; path=${sPath}` : ''
    }${bSecure ? '; secure' : ''}`
    document.cookie = value

    return value
  },
  removeItem(sKey: string, sPath?: string, sDomain?: string) {
    if (!sKey || !this.getItem(sKey)) { return false }

    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
      sDomain ? `; domain=${sDomain}` : ''
    }${sPath ? `; path=${sPath}` : ''}`
    return true
  },
}
