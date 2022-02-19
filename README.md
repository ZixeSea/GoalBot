<h1>GoalBot</h1>
<strong>Creating and managing goals made easy!</strong><br>
<a href="https://discord.com/invite/bZt8WkS">
  <img src="https://discord.com/api/guilds/98834803738054656/embed.png" alt="discord server"/>
</a>
<a href="https://www.npmjs.com/package/eris">
  <img src="https://img.shields.io/badge/Eris-v0.16.1-blue.svg" alt="Eris Badge"/>
</a>
<a href="https://github.com/ZixeSea/GoalBot">
  <img src="https://img.shields.io/badge/Version-1.0.1-green.svg" alt="Version Badge"/>
</a>
<a href="https://github.com/ZixeSea/SteamIdler/blob/master/LICENSE.md">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="Version Badge"/>
</a>

---

## **General information**
### **Author**
**ZixeSea#1234** - *Lead developer* - github: [ZixeSea](https://github.com/ZixeSea)

### **The project**
This project has been created after a request from [Brasscoin](https://www.youtube.com/channel/UCQxfgIP_IFGiQhdSbpyBk_w), he needed a simple to use goal bot that working without linking platforms like Patreon. The requirements for the bot were that people could create, update and delete goals, there would also be a show command that can show the process of a goal including a progress bar.

### **Required dependencies**
[eris](https://www.npmjs.com/package/eris) - A Node.js wrapper for interfacing with Discord.\
[mongoose](https://www.npmjs.com/package/mongoose) - A MongoDB object modeling tool designed to work in an asynchronous environment.\
[asciiart-logo](https://www.npmjs.com/package/asciiart-logo) - renders a splash screen in text console with logo from ASCII characters.

### **Optional dependencies**
[bufferutil](https://www.npmjs.com/package/bufferutil) - Makes ws requests faster and adds some utilities to efficiently perform.\
[eventemitter3](https://www.npmjs.com/package/eventemitter3) - it's a high performance EventEmitter.\
[pako](https://www.npmjs.com/package/pako) - zlib port to javascript, very fast!

### **License**
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ZixeSea/GoalBot/blob/main/LICENSE) file for details (deleting and/or modifying the license file after forking isn't allowed).

---

## **Table of contents**
**1\.** [Preparations](#preparations)\
&nbsp;&nbsp;&nbsp;&nbsp;**1\.1.** [Requirements](#requirements)\
&nbsp;&nbsp;&nbsp;&nbsp;**1\.2.** [Get code](#get-code)
<br>

**2\.** [Config](#config)\
&nbsp;&nbsp;&nbsp;&nbsp;**2\.1.** [Bot config](#bot-config)\
&nbsp;&nbsp;&nbsp;&nbsp;**2\.2.** [PM2 config](#pm2-config)
<br>

**3\.** [Linux](#linux)\
&nbsp;&nbsp;&nbsp;&nbsp;**3\.1.** [Update system (L)](#update-system-l)\
&nbsp;&nbsp;&nbsp;&nbsp;**3\.2.** [Install Node.js (L)](#install-nodejs-l)\
&nbsp;&nbsp;&nbsp;&nbsp;**3\.3.** [Install PM2 (L)](#install-pm2-l)\
&nbsp;&nbsp;&nbsp;&nbsp;**3\.4.** [Install MongoDB (L)](#install-mongodb-l)\
&nbsp;&nbsp;&nbsp;&nbsp;**3\.5.** [Start the bot (L)](#start-the-bot-l)
<br>

**4\.** [Windows](#windows)\
&nbsp;&nbsp;&nbsp;&nbsp;**4\.1.** [Install Node.js (W)](#install-nodejs-w)\
&nbsp;&nbsp;&nbsp;&nbsp;**4\.2.** [Install PM2 (W)](#install-pm2-w)\
&nbsp;&nbsp;&nbsp;&nbsp;**4\.3.** [Install MongoDB (W)](#install-mongodb-w)\
&nbsp;&nbsp;&nbsp;&nbsp;**4\.4.** [Start the bot (W)](#start-the-bot-w)

---

## **Preparations**
### **Requirements**
`git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac))\
`node` version 14.17.3 or higher (**expained later**)\
`mongodb` DB used by the bot (**expained later**)\
`token` required to start the bot [get here](https://discord.com/developers/applications/)

The bot also only requests minimal permissions, this means you can use [84992](https://discordapi.com/permissions.html#84992) and that should be enough.\
Example link: https://discord.com/oauth2/authorize?client_id=(bot-ID)&permissions=84992&scope=bot+applications.commands\
<br>

> ⚠️ WARNING ⚠️<br>MongoDB and Node.js are **required** to run the bot but the installation of them are explained under ["Linux"](##Linux) and ["Windows"](##Windows).

### **Get code**
Run the following command in a CMD/terminal window in the location where you want the folder to be.
```
git clone https://github.com/ZixeSea/GoalBot.git
```
<br>

> ⚠️ WARNING ⚠️<br>Remember to change the config file after getting the code otherwise, it won't work ([more info here](###Config)).

---

## **Config**
### **Bot config**
You can find the config file in the folder that was created in the previous step (["this one"](###Get-code)), it should be in the folder "config" and there change the file "production.json".\

In the bot config file, there are 5 really important things that must be changed first, here is what they mean\
`token` The token you got from the discord dashboard\
`modRole` A list of role IDs that can create, update and delete goals\
`showForEveryone` If you set this to false, only mod roles can use **/show**\
`guild` The guild ID you're going to use the bot in\
`db` Any lower case name (**can't be changed afterward**)\
`host` IP or hostname where the Mongo DB is hosted (**if on the same system use 127.0.0.1**)\
`mongoOptions` Don't change stuff here (**it will break stuff if you do**)\

Hereunder is an example config:
```
{
	"bot": {
		"token": "123",
		"modRole": [ "123", "123" ],
		"showForEveryone": true,
		"guild": "123"
	},
	"db": {
		"db": "goalbot",
		"host": "127.0.0.1",
		"mongoOptions": {
			"useNewUrlParser": true,
			"useUnifiedTopology": true
		}
	}
}
```

### **PM2 config**
You can find the config file in the folder that was created in the previous step (["this one"](###Get-code)).\

In the PM2 config file there are only 2 things you should change to make sure PM2 can find the code and does are\
`script` Should be the path to "src/index.js" (in windows use something like this: "c:\\GoalBot\\src\\start.js")\
`cwd` Should be the path to "src" folder (in windows use something like this: "c:\\GoalBot\\src")\

Hereunder is an example config:
```
{
	"apps": [
		{
			"name": "GoalBot",
			"script": "/root/GoalBot/src/start.js",
			"cwd": "/root/GoalBot/src",
			"instances": "1",
			"exec_mode": "fork",
			"max_memory_restart": "1G",
			"autorestart": true
		}
	]
}
```

---

## **Linux**
> ⚠️ WARNING ⚠️<br>Everything in this section is based on a server running **Ubuntu 18.04 without GUI**, this bot and all commands mentioned here can be performed on another distro but the commands or steps may be slightly different.

### **Update system (L)**
To make you get the most recent versions of any software you download, update your system first with the following command in a terminal window.
```
sudo apt update && sudo apt upgrade -y
```

### **Install Node.js (L)**
Run the following 2 commands in a terminal window to install **Node.js**.
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### **Install PM2 (L)**
Run the following 2 commands in a terminal window to install **PM2**.
```
sudo npm i pm2 -g
pm2 startup
```

### **Install MongoDB (L)**
Run the following 5 commands in a terminal window to install **MongoDB** and autostart it on reboot.
```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable mongod
```

### **Start the bot (L)**
Open the folder you downloaded in the previous step (["this one"](###Get-code)), and open a terminal window there and run the following 3 commands.
```
npm i
pm2 start pm2.json
pm2 save
```

---

## **Windows**
> ⚠️ WARNING ⚠️<br>Everything in this section is based on a server running **Windows 10**, this bot and all commands mentioned here can be performed on another Windows version but the commands or steps may be slightly different.

### **Install Node.js (W)**
Installing **Node.js** on windows is really easy, they have a normal installer for it and you can download it on their  website (so it's simply clicking "next" and "ok").\
**Link:** https://nodejs.org/en

### **Install PM2 (W)**
Run the following 2 commands in a CMD window to install **PM2**.
```
npm i pm2 -g
```

### **Install MongoDB (W)**
Installing **MongoDB** on windows is really easy again, it's also a normal installer like Node.js (so it's simply clicking "next" and "ok").\
**Link:** https://www.mongodb.com/try/download/community
<br><br>

> ⚠️ WARNING ⚠️<br>Make sure you install "MongoDB Community Server", the version is less important so pick the default selected one.

### **Start the bot (W)**
Open the folder you downloaded in the previous step (["this one"](###Get-code)), and open a CMD window there and run the following 3 commands.
```
npm i
pm2 start pm2.json
pm2 save
```

---
