import chat from "@xaviabot/fca-unofficial";
import { existsSync, readFileSync } from "fs";
import chalk from "chalk";
import { multilineRegex } from "./regex.js";
import pipeline from "./pipeline.js";
const { red } = chalk;

if (!existsSync(`${process.cwd()}/state.session`)) {
  console.log(
    `${red(
      "Error: ",
    )}Session has not found, please run authenticate command (yarn authenticate|npm authenticate)`,
  );
  process.exit();
}

const listenEvents = process.env.LISTEN_EVENT ? process.env.LISTEN_EVENT : true;
const selfListen = process.env.LISTEN_EVENT ? process.env.SELF_LISTEN : true;

const commands = [];
let options = {};
const middlewares = [];
const events = [];
const eventMiddlewares = [];

const addMiddleware = (...middleware) => middlewares.push(...middleware);

const on = (event, listener, ...args) => events.push({ event, listener, args });
const addEventMiddelware = (...middleware) =>
  eventMiddlewares.push(...middleware);

const add = (callback, option) => commands.push({ callback, option });
const list = () =>
  commands.map((command) => ({
    prefix: options.prefix === undefined ? "/" : options.prefix,
    ...command.option,
  }));

const init = (option = {}) => {
  options = { ...options, ...option };

  try {
    const appState = JSON.parse(
      Buffer.from(
        readFileSync(`${process.cwd()}/state.session`, "utf-8"),
        "base64",
      ),
    );

    const fbOption = JSON.parse(JSON.stringify(options));
    delete fbOption["prefix"];
    delete fbOption["handleMatches"];

    chat({ appState }, { listenEvents, selfListen, ...fbOption }, (err, fb) => {
      if (err) return console.log(`${red("Error: ")}${err}`);

      const defaultPrefix = options.prefix === undefined ? "/" : options.prefix;

      fb.listen(async (err, event) => {
        if (err) return console.log(`${red("Error: ")}${err}`);

        events.forEach((e) => {
          const eventCallback = () => {
            return async (event, fb, option) => {
              return e.listener(event, fb, option);
            };
          };

          const type = e.event;

          if (
            type
              .split("|")
              .map((e) => e.toLowerCase().trim().includes(event.type))
          ) {
            pipeline([...eventMiddlewares, eventCallback], event, fb, {
              ...e.args,
            });
          }
        });

        commands.forEach((command) => {
          const commandCallback = () => {
            return async (matches, event, fb, option) => {
              return command.callback(matches, event, fb, option);
            };
          };

          if (
            typeof command.callback === "function" &&
            event.body !== undefined
          ) {
            const prefix = event.body.substring(0, 1);

            if (command.option.name === undefined) {
              console.log(`${red("Error: ")}No command name defined.`);
              process.exit();
            }

            if (command.option.command === undefined) {
              console.log(
                `${red(
                  "Error: ",
                )}No command defined, you should put atleast one command.`,
              );
              process.exit();
            }

            const commandPrefix =
              command.option.prefix === undefined
                ? defaultPrefix
                : command.option.prefix;

            const bodyCommand = event.body.substring(1);

            const re = new RegExp(command.option.command, "gim");
            const matches = multilineRegex(re, bodyCommand);
            const handleMatches =
              command.option.handleMatches === undefined
                ? options.handleMatches === undefined
                  ? false
                  : options.handleMatches
                : command.option.handleMatches;

            if (
              (commandPrefix === prefix && matches.length !== 0) ||
              handleMatches
            ) {
              pipeline([...middlewares, commandCallback], matches, event, fb, {
                prefix: commandPrefix,
                ...command.option,
                commands: list(),
              });
            }
          }
        });
      });
    });
  } catch (err) {
    console.log(`${red("Error: ")}${err.message}`);
    process.exit();
  }
};

process.on("uncaughtException", (err) => {
  return console.log(`${red("Error: ")}${err.message}`);
});

export default {
  add,
  init,
  list,
  addMiddleware,
  addEventMiddelware,
  on,
};
