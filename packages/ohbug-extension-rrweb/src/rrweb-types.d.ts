declare module "@rrweb/types" {
  export interface eventWithTime {
    type: number;
    data: Record<string, unknown>;
    timestamp: number;
  }
}
