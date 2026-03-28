#!/usr/bin/env node

import { accessSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import chalk from "chalk";
import type { PromptObject } from "prompts";
import prompts from "prompts";

import { DEFAULT_ENDPOINT } from "../lib/constants";
import uploadSourceMap from "../lib/uploadSourceMap";

const __dirname = dirname(fileURLToPath(import.meta.url));

type PromptKeys = "path" | "apiKey" | "appVersion" | "appType" | "endpoint";

function switchCommand(command: string) {
  if (command === "uploadSourceMap") {
    const questions: PromptObject<PromptKeys>[] = [
      {
        type: "text",
        name: "path",
        message: "Your source map file path",
        validate(value: string) {
          if (!value) return false;
          const path = resolve(process.cwd(), value);
          try {
            accessSync(path);
            return true;
          } catch {
            return false;
          }
        },
        format(value: string) {
          return resolve(process.cwd(), value);
        },
      },
      {
        type: "text",
        name: "apiKey",
        message: "Your project API key (apiKey)",
        validate: (value: string) => Boolean(value),
      },
      {
        type: "text",
        name: "appVersion",
        message: "The version number of your app (appVersion)",
        validate: (value: string) => Boolean(value),
      },
      {
        type: "text",
        name: "appType",
        message: "The type of your app (appType)",
      },
      {
        type: "text",
        name: "endpoint",
        message: "The url of the upload server (endpoint)",
        initial: DEFAULT_ENDPOINT,
      },
    ];

    return prompts<PromptKeys>(questions).then((answers) => {
      if (Object.keys(answers).length === questions.length) {
        return uploadSourceMap(answers);
      }
      return null;
    });
  }

  return null;
}

async function prompt() {
  const pkgPath = resolve(__dirname, "../package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
    version: string;
  };

  console.log(chalk.bold.green(`Ohbug CLI v${pkg.version}`));

  const { command } = (await prompts({
    type: "select",
    name: "command",
    message: "Which command do you want to execute?",
    choices: [
      {
        title: "uploadSourceMap",
        description: "Upload the source map file to the server",
        value: "uploadSourceMap",
      },
    ],
  })) as { command: string };

  await switchCommand(command);
}

void prompt();
