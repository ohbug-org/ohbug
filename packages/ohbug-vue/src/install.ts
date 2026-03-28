import { EventTypes } from "@ohbug/core";
import type { OhbugBaseDetail, OhbugClient } from "@ohbug/types";

import type { Vue } from "./types";

export interface VueErrorDetail extends OhbugBaseDetail {
  name: string;
  stack?: string;
  errorInfo: string;
  component?: string;
  file?: string;
  props?: Record<string, any>;
}

const getComponent = (instance: any): { component?: string; file?: string } => {
  if (!instance) return {};

  // Vue 2: instance.$root === instance
  // Vue 3: instance.$ exists and instance.$.root === instance.$
  if (instance.$root === instance || (instance.$ && instance.$.root === instance.$)) {
    return { component: "Root" };
  }

  // Vue 3: instance.$.type holds the component definition
  const type = instance.$?.type;
  const options = instance.$options;

  // Priority: Vue 3 <script setup> __name > Vue 3 name > Vue 2 name
  const component = type?.__name || type?.name || options?.name || undefined;

  // Priority: Vue 3 __file > Vue 2 __file
  const file = type?.__file || options?.__file || undefined;

  return { component, file };
};

export function install(client: OhbugClient, Vue: Vue) {
  const prev = Vue.config.errorHandler;

  const handler = (error: Error, instance: any, info: string) => {
    const { component, file } = getComponent(instance);

    const detail: VueErrorDetail = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errorInfo: info,
      component,
      file,
      // Vue 3 uses $props, Vue 2 uses $options.propsData
      props: instance?.$props ?? instance?.$options?.propsData,
    };
    const event = client.createEvent<VueErrorDetail>({
      category: "error",
      type: EventTypes.VUE,
      detail,
    });

    void client.notify(event);

    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(error);
    }
    if (typeof prev === "function") prev(error, instance, info);
  };

  Vue.config.errorHandler = handler;
}
