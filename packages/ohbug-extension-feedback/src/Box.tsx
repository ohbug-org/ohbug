import { getOhbugObject, getSelector } from "@ohbug/utils";
import { Show, createEffect, createSignal } from "solid-js";
import { type Component } from "solid-js";

import { Close, Screen } from "./assets";
import Selector from "./Selector";
import { setStore, store } from "./store";

const Box: Component = () => {
  const [visible, setVisible] = createSignal(false);
  const [feedback, setFeedback] = createSignal("");
  function handleStartWork() {
    setStore({ working: true });
  }

  const [loading, setLoading] = createSignal(false);
  async function handleFinish() {
    setLoading(true);

    let selector: string;
    let outerHTML: string;
    const ohbugClient = getOhbugObject().client;
    if (store.selectedElement) {
      const event = { target: store.selectedElement } as unknown as Event;

      selector = getSelector(event);
      outerHTML = store.selectedElement.outerHTML;
      const ohbugEvent = ohbugClient.createEvent({
        category: "feedback",
        type: "feedback",
        detail: { selector, outerHTML, feedback: feedback() },
      });
      await ohbugClient.notify(ohbugEvent);
    } else {
      const ohbugEvent = ohbugClient.createEvent({
        category: "feedback",
        type: "feedback",
        detail: { feedback: feedback() },
      });
      await ohbugClient.notify(ohbugEvent);
    }

    // clear
    setVisible(false);
    setFeedback("");
    setStore({ working: false, selectedElement: null });

    setLoading(false);
  }

  createEffect(() => {
    if (store.working === false && store.selectedElement === null) {
      setVisible(false);
    } else if (store.working && !store.selectedElement) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <div data-ohbug-selector class="z-max relative">
      <Show when={store.working}>
        <Selector />
      </Show>

      <div>
        <Show when={!(store.working && !store.selectedElement)}>
          <button
            data-ohbug-selector
            class="btn-main"
            type="button"
            onClick={() => setVisible((v) => !v)}
          >
            {visible() ? "😆" : "🙂"}
          </button>
        </Show>

        <Show when={visible()}>
          <div
            data-ohbug-selector
            class="z-max fixed right-8 bottom-20 flex h-60 w-80 flex-col bg-white shadow"
          >
            <div data-ohbug-selector class="bg-gray-300 p-4">
              <textarea
                autofocus
                data-ohbug-selector
                class="w-full resize-none border-none bg-transparent outline-none"
                maxLength="1000"
                placeholder="Tell me how you feel..."
                rows="4"
                value={feedback()}
                onInput={(e) => setFeedback(e.currentTarget.value)}
              />
              <button
                data-ohbug-selector
                class="cursor-pointer border-none bg-transparent"
                type="button"
                style={{ "--color": store.selectedElement ? "blue" : "gray" }}
                onClick={handleStartWork}
              >
                <Screen />
              </button>
            </div>

            <div data-ohbug-selector class="flex flex-1 items-center justify-between p-4">
              <span data-ohbug-selector class="text-sm">
                Try
                <a
                  data-ohbug-selector
                  class="ml-1 underline"
                  href="https://ohbug.net"
                  rel="noreferrer"
                  target="_blank"
                >
                  Ohbug
                </a>
                ?
              </span>
              <button
                data-ohbug-selector
                class="btn-send"
                disabled={!feedback() || loading()}
                type="button"
                onClick={handleFinish}
              >
                {loading() ? "Sending..." : "Send"}
              </button>
            </div>

            <button
              data-ohbug-selector
              class="absolute -top-2 -right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-blue-500"
              type="button"
              onClick={() => setVisible((v) => !v)}
            >
              <Close />
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Box;
