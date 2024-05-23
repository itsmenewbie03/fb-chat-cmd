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

/** This function allows you to add a command */
export function add(callback: Callback, options: Options): number;
/** This function allows you to initialize your bot setup */
export function init(option?: {}): void;
/** This function returns the list of comands currently registered */
export function list(): Options[];
/** This function allows you to register a new middleware */
export function addMiddleware(middleware: Middleware): number;
/** This function allows you to register a new event middleware */
export function addEventMiddleware(middleware: Middleware): number;
/** This function allows you to add a listener to an event */
export function on(event: string, listener: Listener, args?: []): void;
