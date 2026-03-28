import type { OhbugEventWithMethods } from "./event";

// eslint-disable-next-line typescript-eslint/no-redundant-type-constituents
export type OhbugNotifier = <D = any>(event: OhbugEventWithMethods<D>) => Promise<any> | any;
