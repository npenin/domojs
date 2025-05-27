#  (2025-05-27)


### Bug Fixes

* add akala.json symlink in main folder 3b21443
* add akala.json symlink in main folder a60a4d4
* add coreutils e49b07b
* add db volume b4243ef
* add device type 53de407
* add entrypoint to trigger initial setup 5838e82
* add generics on gateway 665e107
* add homekit projects to compilation ce50c3d
* add missing DB config 94437db
* add missing dependency 60e2e49
* add missing library 28717e2
* add missing plugin a0be2f9
* add more commands on gateway 81ac0b8
* add required eudev package 76f5a13
* add version field 884db03
* akala startup 54aad40
* allow device containers to run commands a9e7831
* allow execute on entrypoint 361c464
* artificial bump 6021f3f
* artificial bump e2ba776
* artificial bump 878c059
* artificial bump 32822d5
* artificial bump fc88add
* artificial bump a1d6219
* artificial bump d4ce138
* artificial bump b08a001
* artificial patch b7ce7a7
* artificial patch f117e0b
* buffer slicing in rfx 48397c4
* build 97ab07a
* build b20c10c
* build da8b00e
* build after dependency update 75cf585
* build after switch to generic gateway aa8f298
* build after upgrade 6b66f5f
* build after upgrade bf028cc
* build after upgrade 3064e60
* busybox -S workaround dbf5433
* config file after upgrade 9b6bdfc
* configs 845de88
* configs 500a265
* default configuration b8963eb
* dependencies 8e1577c
* device init saving 5980d33
* devicetype start up + upgrade to latest sidecar 17378d1
* devicetype startup 401db92
* docker path 21d31e1
* docker setup 99e29ae
* docker warning 679077a
* dockerfile syntax 89de8c7
* enable autostart on devicetype c7a8664
* enable bin from node modules 940f54c
* enable keepalive on tcp and http sockets cd61cd8
* enable keepalive on tcp and http sockets 27fcfd2
* enable production mode 4e66bf1
* enable yarn cec2353
* entry point startup d5a0a61
* entrypoint 51411b4
* entrypoint db3d912
* file copy ordering 2ece2ca
* fix wrong unit in keepalive 58ddd94
* fix zigate start 349c0bd
* gateway resolution 5877dde
* gateway start 97998b5
* handle gateways detection 0c682a0
* handle multiple gateways or merge gateways 1f19ef8
* handle start from fork 98c8153
* improve devicetype.add documentation 0f61da2
* improve library indexing + fix akala cli support f235b43
* improve mdns typings 3a5d0f1
* improve media manager bb7f291
* improve mqtt implementation (not ready yet) a26db7d
* improvements to protocol parser 1398b5f
* iscp parsing 7eda917
* lock file 5ac40a4
* made devdependencies using workspace reference 3737032
* make dbus private cc7ded1
* make homescreen private for now b5a6c9b
* make webscrapper private f2a547f
* migrate to akala 19 and commands 9 c04f43e
* move akala config in db 8645030
* move config in existing config file from context a9b205a
* nodejs install 3ef884f
* npm registry 0d68737
* package metadata 5578d05
* packages/theme-default/package.json & packages/theme-default/yarn.lock to reduce vulnerabilities 868f5f3
* patch cheerio to compile as ESM b62f558
* PATH env 2d0af89
* permissions 7d71124
* permissions ef3d15b
* permissions 47db6e4
* permissions a99884c
* permissions on install 4ff3fb2
* permissions on install 5deccb7
* publish workflow after semantic-release upgrade 3d373e1
* recover from closed socket 0b733dd
* remove @akala/client for now 570f6fd
* remove @akala/client for now fae299f
* remove connect settings in docker e057800
* remove electron startup file cdcbfce
* remove extra logging 629ad7e
* remove failing pubsub 1f0ec9e
* remove fake env 883a7f1
* remove files from volumes 29f400f
* remove resolutions 648105b
* remove temporary resolutions 175c6c8
* remove wwwroot from git tracking 4a77d5f
* reopen on close 97206ad
* rfx parsing 09bbea5
* scrap stop crashing on not found elements 57355db
* service discovery package name 4aec8df
* set mode on rfx d043a17
* slim building 79e69e3
* slim docker file building a1dd3e8
* slim dockerfile 6d167ec
* slim entry point 2cb59b9
* slim user f605b15
* specify proper params for save c949c4b
* support for gateway closure a77d715
* support for tcp gateway 1afe68a
* switch from yarn to npm a85dbd1
* switch to esm dcb74cf
* switch to generic gateway 7d2516b
* switch to generic gateway fab4c73
* transparent proxy inject parameters d51aec6
* trying apk at first 16d00df
* trying to fix config file issue 4ccf7ac
* typo b448cdb
* update after breaking changes in akala 28983f9
* update after commands upgrade e41e30a
* update dependencies a3ea3a6
* update dependencies and checkout depth f04e50a
* update dependencies and fix devices communications b34af9c
* update dependencies to major 1292a69
* update generated metadata f24985f
* update generated metadata 675a3a7
* update home screen tailored impl 9898cb4
* update lock file 17fbd2a
* update to event emitter from akala 2bdfe95
* update to latest serial port types 77515fc
* update to proper logging 7de83c6
* update to working akala b297101
* update vite config c771226
* upgrade @akala/core from 6.0.0 to 6.0.1 4336f5a
* upgrade dependency 04c1122
* use signal to allow proper termination 7020b6c
* use signal to allow proper termination 48f4a4f
* use signal to allow proper termination 0a42077
* use signal to allow proper termination b111ef0
* use signal to allow proper termination daab3d0
* use value from cli f1b9d1e
* user and volumes 5c04a92
* various processing improvements 1984092
* web implementation f2b5bcb
* wrong work dir 617ce09
* yarn cache 856a0d8
* yarn cache 0bb7a11
* yarn files 3333988
* yarn state 7b5be0a
* zigate logging 1009a09


### Build System

* move to yarn v3 06913dd


### chore

* update dependencies aa46616


### Code Refactoring

* update to ESM + update dependencies 2370b96


### Features

* add adb implementation 48b9904
* add changelog f7b7d51
* add class to IDevice 716d8d8
* add crunchyroll media indexing 317eacc
* add homekit controller 12c620a
* add homekit server (homebridge equivalent) 4e86aa4
* add list folders command 7ac6d78
* add lots of commands b7d6e19
* add service discovery (not ready yet) 7a7a7b4
* add slim docker alternative a06e7c6
* add tlv support be185cf
* add unknown RTS message support 9cca173
* add web scrapping support and tests 62a3c61
* add yt-music 5c09d55
* create new web site from scratch using vite and akala 1492bfe
* enable debug mode 684b9cd
* enable URL support 1f5dc23
* make devices as containers c1e5c93
* make exec on devicetype CLI compatible f92bf92
* make webscrapper public 68ba711
* many new media features 7b15160
* mdns implementation 3fdc367
* move device management to devicetype 07e06d7
* shared gateway implementation d7a42a9
* start a dbus implementation 44b24d6
* start to upgrade media to container 419e5a4
* update scrapper as generic 1286958
* upgrade devices as command container 7dcd4df
* various fixes and improvements 5f6c5f1


### BREAKING CHANGES

* devices types are exported without the devices namespace
* devices have to declare commands always in the same format: the @akala/commands format
* Gateway requires typed events
* webscrapper uses generic types
* update to ESM
* move device management to devicetype
* move zigate to @domojs/zigate-parsers
* move from rfxtrx to rfx-parsers



