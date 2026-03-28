import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { type Component } from "solid-js";

import { Close } from "./assets";
import { setStore, store } from "./store";

const Selector: Component = () => {
  const [lastSelectedElement, setLastSelectedElement] = createSignal<HTMLElement | null>();
  let dimmerTop: HTMLDivElement;
  let dimmerRight: HTMLDivElement;
  let dimmerBottom: HTMLDivElement;
  let dimmerLeft: HTMLDivElement;
  let selector: HTMLDivElement;

  const PADDING = 2;

  function handleSelecting(element?: Element | null) {
    if (!element) return;
    if (element.tagName === "HTML") return;

    const { width, height, top, right, bottom, left } = element.getBoundingClientRect();

    selector?.setAttribute(
      "style",
      `
      width: ${width + PADDING * 2}px;
      height: ${height + PADDING * 2}px;
      top: ${top - PADDING}px;
      left: ${left - PADDING}px;
    `,
    );
    dimmerTop?.setAttribute(
      "style",
      `
      height: ${top}px;
      top: 0;
      right: 0;
      left: 0;
    `,
    );
    dimmerRight?.setAttribute(
      "style",
      `
      top: ${top}px;
      right: 0;
      bottom: 0;
      left: ${right}px;
    `,
    );
    dimmerBottom?.setAttribute(
      "style",
      `
      width: ${width + left}px;
      top: ${bottom}px;
      bottom: 0;
      left: 0;
    `,
    );
    dimmerLeft?.setAttribute(
      "style",
      `
      width: ${left}px;
      height: ${height}px;
      top: ${top}px;
      left: 0;
    `,
    );
  }

  function handleSelected(element?: HTMLElement | null) {
    if (!element) return;
    if (element.tagName === "HTML") return;

    const { width, height, top, left } = element.getBoundingClientRect();
    setStore({ selectedElement: element });

    selector?.setAttribute(
      "style",
      `
      width: ${width + PADDING * 2}px;
      height: ${height + PADDING * 2}px;
      top: ${top - PADDING}px;
      left: ${left - PADDING}px;
    `,
    );
  }

  function handleMoveListener(e: MouseEvent) {
    setStore({ working: true });

    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

    if (target?.dataset?.ohbugSelector !== undefined || target.tagName === "HTML") {
      return false;
    }

    handleSelecting(target);
  }
  function addMoveListener() {
    document.addEventListener("mousemove", handleMoveListener);
  }
  function removeMoveListener() {
    document.removeEventListener("mousemove", handleMoveListener);
  }
  function handleClickListener(e: MouseEvent) {
    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (target?.dataset?.ohbugSelector !== undefined || target.tagName === "HTML") {
      return false;
    }
    if (store.selectedElement && store.working) {
      return false;
    }
    setLastSelectedElement(target);
    handleSelected(lastSelectedElement());
    removeMoveListener();
  }
  function addClickListener() {
    document.addEventListener("mousedown", handleClickListener);
  }
  function removeClickListener() {
    document.removeEventListener("mousedown", handleClickListener);
  }
  function handleClose() {
    setLastSelectedElement(null);
    removeMoveListener();
    removeClickListener();
    setStore({
      working: false,
      selectedElement: null,
    });
  }
  function handleChange() {
    setStore({
      working: true,
      selectedElement: null,
    });
    setLastSelectedElement(null);
    addMoveListener();
  }

  createEffect(() => {
    if (store.working) {
      addMoveListener();
      addClickListener();
    } else {
      removeMoveListener();
      removeClickListener();
    }
  });

  onCleanup(handleClose);

  return (
    <>
      <div data-ohbug-selector class="fixed -z-1">
        <Show when={!store.selectedElement && store.working}>
          <div
            data-ohbug-selector
            class="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-10 border-4 border-solid border-blue-500 bg-none transition"
          >
            <div data-ohbug-selector class="tips">
              Select element on the page
              <button class="btn-stop" type="button" onClick={handleClose}>
                <Close />
              </button>
            </div>
          </div>
        </Show>
        <div
          ref={(el) => {
            dimmerTop = el;
          }}
          data-ohbug-selector
          class="pointer-events-none fixed -z-1 bg-black/40 transition"
        />
        <div
          ref={(el) => {
            dimmerRight = el;
          }}
          data-ohbug-selector
          class="pointer-events-none fixed -z-1 bg-black/40 transition"
        />
        <div
          ref={(el) => {
            dimmerBottom = el;
          }}
          data-ohbug-selector
          class="pointer-events-none fixed -z-1 bg-black/40 transition"
        />
        <div
          ref={(el) => {
            dimmerLeft = el;
          }}
          data-ohbug-selector
          class="pointer-events-none fixed -z-1 bg-black/40 transition"
        />

        <div
          ref={(el) => {
            selector = el;
          }}
          data-ohbug-selector
          class={`pointer-events-none fixed -z-1 box-border cursor-pointer rounded-sm border-4 bg-black/20 transition ${
            lastSelectedElement() ? "border-solid border-red-500" : "border-dashed border-blue-500"
          }`}
        >
          <Show when={store.selectedElement ? store.working : null}>
            <button
              data-ohbug-selector
              class="pointer-events-auto absolute -top-3 -right-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-red-500"
              type="button"
              onClick={handleClose}
            >
              <Close />
            </button>

            <button
              data-ohbug-selector
              class="pointer-events-auto absolute right-0 -bottom-full cursor-pointer border-4 border-solid border-red-500 bg-red-500 font-semibold text-white"
              type="button"
              style={{ transform: "translate(4px, -8px)" }}
              onClick={handleChange}
            >
              Change
            </button>
          </Show>
        </div>
      </div>
    </>
  );
};

export default Selector;
