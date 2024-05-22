# Fb Chat Cmd 💬 [![author/maintainer](https://img.shields.io/badge/by-itsmenewbie03-016eea.svg?logo=github&labelColor=181717&longCache=true&style=flat-square)](https://itsmenewbie03.is-a.dev)

**Fb Chat Cmd** is a wrapper to the maintained fork of [fca-unofficial](https://github.com/XaviaTeam/fca-unofficial) by [XaviaTeam](https://github.com/XaviaTeam). This project is derived from [fb-chat-command](https://github.com/jersoncarin/fb-chat-command) as it does not have the latest APIs.

Like this project? **Leave a star**! ⭐⭐⭐⭐⭐



## ✨ About the API

This API is the only way to automate chat functionalities on a user account. We do this by emulating the browser. This means doing the exact same GET/POST requests and tricking Facebook into thinking we're accessing the website normally. Because we're doing it this way, this API won't work with an auth token but requires the credentials of a Facebook account.

## 📦 Installation

```bash
npx jsr add @itsmenewbie03/fb-chat-cmd
```

## ⚙️ Configuration

You can configure the following by creating a .env file by default they are both set to true.

```bash
LISTEN_EVENT=true
SELF_LISTEN=true
```

## 💡 Example Usage

```javascript
import cmd from "@itsmenewbie03/fb-chat-cmd";

const help = async (matches, event, api) => {
  const list = cmd.list();
  let text = "";
  list.forEach((e) => {
    text += `* ${e.description}\n`;
  });
  await api.sendMessage(
    `Commands Available\n${text}`,
    event.threadID,
    event.messageID,
  );
};

cmd.init({ prefix: "/" });
cmd.add(help, {
  // NOTE: command: a regex will be used determine whether this commands gets executed or not
  command: "^\\bhelp\\b",
  name: "help",
  description: "/help: Get list of commands available",
});
```

## 📖 Documentation

See [this](https://github.com/XaviaTeam/fca-unofficial/blob/master/DOCS.md) from [fca-unofficial](https://github.com/XaviaTeam/fca-unofficial)

## 🌟 Credits

[facebook-chat-api contributors](https://github.com/XaviaTeam/fca-unofficial/graphs/contributors)

## ⚖️ License

```
The MIT License (MIT)

Copyright (c) 2015 Avery, Benjamin, David, Maude
Copyright (c) 2022 Jerson Carin
Copyright (c) 2024 itsmenewbie03

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
