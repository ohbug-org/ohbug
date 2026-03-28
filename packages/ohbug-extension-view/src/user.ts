import { addDays, isAfter, isBefore, startOfDay } from "date-fns";

import { sendUserView } from "./create-event";

const NAME = "OhbugExtensionViewUV";

const EXPIRES = 30;
function getItem(key: string, value: string, defaultValue: any = null) {
  let item: { value: unknown; expiry: string } | null;
  try {
    item = JSON.parse(value);
  } catch {
    // Corrupted data — remove and return default
    // 数据损坏 — 移除并返回默认值
    localStorage.removeItem(key);
    return defaultValue;
  }
  if (item) {
    const now = new Date();
    if (isAfter(now, new Date(item.expiry))) {
      localStorage.removeItem(key);
      return defaultValue;
    }
    return item.value;
  }
  return defaultValue;
}
export const LocalStorageWithExpires = {
  getItem(key: string) {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return null;

    return getItem(key, storedValue);
  },
  setItem(key: string, value: unknown) {
    const now = new Date();
    const item = {
      value,
      expiry: addDays(now, EXPIRES).toISOString(),
    };
    return localStorage.setItem(key, JSON.stringify(item));
  },
  removeItem(key: string) {
    return localStorage.removeItem(key);
  },
};

/**
 * initial page view 触发时同时触发
 * 先从 storage 内取值
 * 没有值     => 创建 storage 并记一次 uv
 * 有值(当天) => 不动
 * 有值(昨天) => 更新 storage 并记一次 uv
 * 有值(明天) => 不动 (不应出现这个情况)
 */
function createUserView(path: string) {
  const value = LocalStorageWithExpires.getItem(NAME);

  // 没有值 => 创建 storage 并记一次 uv
  if (!value) {
    LocalStorageWithExpires.setItem(NAME, new Date().toISOString());
    sendUserView(path);
  } else {
    const parsedValue = new Date(value);
    // 有值(昨天) => 更新 storage 并记一次 uv
    if (isBefore(startOfDay(parsedValue), startOfDay(new Date()))) {
      LocalStorageWithExpires.setItem(NAME, new Date().toISOString());
      sendUserView(path);
    }
  }
}

export default createUserView;
