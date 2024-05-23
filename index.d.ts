type Callback = (matches: string[], event: any, api: any) => void;
type Listener = (event: any, api: any, args?: []) => void;
type Options = {
  name: string;
  command: string;
  description: string;
};
type Next = (
  matches: string[],
  event: any,
  api: any,
  extra: any,
) => Promise<void>;

type Middleware = (next: Next) => Promise<void>;

export function add(callback: Callback, options: Options): number;
export function init(option?: {}): void;
export function list(): Options[];
export function addMiddleware(middleware: Middleware): number;
export function addEventMiddleware(middleware: Middleware): number;
export function on(event: string, listener: Listener, args?: []): void;
