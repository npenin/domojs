#  (2025-08-28)


### Bug Fixes

* add abortsignal to start on gateways 16e9dfa
* add akala.json symlink in main folder 3b21443
* add akala.json symlink in main folder a60a4d4
* add coreutils e49b07b
* add cron to build 1bb748e
* add db volume b4243ef
* add debugging log be1e6c0
* add device type 53de407
* add dialout group to node 1063529
* add dialout group to node 29fe3a2
* add entrypoint to trigger initial setup 5838e82
* add gateway endpoints to fabric d878f75
* add generics on gateway 665e107
* add homekit projects to compilation ce50c3d
* add id to register adapter and name to commissionned endpoint 14f730d
* add id to register adapter and name to commissionned endpoint 819e2b4
* add id to register adapter and name to commissionned endpoint c825c92
* add missing DB config 94437db
* add missing dependency 60e2e49
* add missing export for device-commands.json in package.json f85753a
* add missing library 28717e2
* add missing libs 8c9d344
* add missing plugin a0be2f9
* add more commands on gateway 81ac0b8
* add more logs 5fcccef
* add required eudev package 76f5a13
* add start tls command support efeba58
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
* await socket.send in MqttClient.write to ensure message delivery c7a5095
* broken parsing eb3e495
* buffer reading safeguard 7a95a15
* buffer slicing in rfx 48397c4
* build 97ab07a
* build b20c10c
* build da8b00e
* build after dependency update 75cf585
* build after switch to generic gateway aa8f298
* build after upgrade 6b66f5f
* build after upgrade bf028cc
* build after upgrade 3064e60
* bump cron bd7c753
* busybox -S workaround dbf5433
* cast processor 07a479e
* cleanup useless imports 8bc7238
* client subscriptions 53ac6eb
* cluster proxy mqtt topic 91c3d7e
* ClusterMap and ClusterIds consistency 8f665be
* config file after upgrade 9b6bdfc
* configs 845de88
* configs 500a265
* crypto does not accept Uint8Array, but ArrayBuffer d1af686
* crypto does not accept Uint8Array, but ArrayBuffer 04e4cc3
* default configuration b8963eb
* dependencies 8e1577c
* device init saving 5980d33
* devices first setup 987ca3c
* devices startup dc9a6aa
* devicetype init dd87a23
* devicetype start up + upgrade to latest sidecar 17378d1
* devicetype startup 401db92
* disable endpoint proxy discovery 0995b3c
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
* endpoint command result adf4756
* endpoint proxy descriptor 95f7aae
* ensure config is initialized 31238d4
* ensure mqtt-client.net.js is imported in index.ts dea90e5
* ensure proper permissions 80f00b8
* entry point startup d5a0a61
* entrypoint 51411b4
* entrypoint db3d912
* export topic wildcard to urltemplate conversion b3a68bb
* file copy ordering 2ece2ca
* filter gateway mode endpoints 416ac45
* first version 26c738d
* first working version 325da72
* fix wrong unit in keepalive 58ddd94
* fix zigate start 349c0bd
* gateway resolution 5877dde
* gateway start 97998b5
* gateway startup 64f6af0
* gateway startup 32c2fe9
* guest permissions ba4e91f
* handle buffer read over limits 3bc14bb
* handle gateways detection 0c682a0
* handle legacy configuration migration 7c37558
* handle multiple gateways or merge gateways 1f19ef8
* handle start from fork 98c8153
* handle undefined pubsub config 233fa6d
* import cycle 48903df
* import cycle 2dd896a
* improve devicetype.add documentation 0f61da2
* improve library indexing + fix akala cli support f235b43
* improve mdns typings 3a5d0f1
* improve media manager bb7f291
* improve mqtt implementation (not ready yet) a26db7d
* improvements to protocol parser 1398b5f
* iscp parsing 7eda917
* ISCP processor 89e99b3
* lock file 5ac40a4
* made devdependencies using workspace reference 3737032
* make dbus private cc7ded1
* make homescreen private for now b5a6c9b
* make webscrapper private f2a547f
* **mdns:** build and behavior 5934661
* migrate to akala 19 and commands 9 c04f43e
* missing async methods 4b0812b
* move akala config in db 8645030
* move config in existing config file from context a9b205a
* move from require to import.meta f2e52f4
* node permissions 263b2fc
* nodejs install 3ef884f
* npm registry 0d68737
* override cron version 13cbfc9
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
* prevent committing web bundles 72a3f16
* prevent duplicate rfy endpoints 3d20a3b
* prevent import from root index 7f61c8f
* prevent infinite loop on attribute get 96011cd
* prevent overhead on descriptor cluster 4e68f18
* proper gateway closure e7eb9cd
* proper gateway remote list support c15e201
* proper support for commands result 8026fb7
* property mandatoryness 82f99fa
* provide signal to pubsub 3e0a570
* provide signal to pubsub 538c505
* publish workflow after semantic-release upgrade 3d373e1
* recover from closed socket 0b733dd
* redirectTopic value 7c77939
* remove @akala/client for now 570f6fd
* remove @akala/client for now fae299f
* remove connect settings in docker e057800
* remove debugger and fix store provider d495c98
* remove electron startup file cdcbfce
* remove extra logging 629ad7e
* remove failing pubsub 1f0ec9e
* remove fake env 883a7f1
* remove files from volumes 29f400f
* remove resolutions 648105b
* remove temporary resolutions 175c6c8
* remove unknown attribute after matter update 551a66f
* remove useless config c2bf264
* remove wwwroot from git tracking 4a77d5f
* reopen on close 97206ad
* replace CECKeyCodeEnum import with keypadInputCluster for improved modularity 74fd565
* restore all my personal shutters 4a9a0e0
* restore localhost akala config 17db37a
* rfx modeendpoint naming 5e42bb3
* rfx parsing 09bbea5
* **rfx:** init 7045c7f
* save config after first init b461378
* scrap stop crashing on not found elements 57355db
* service discovery package name 4aec8df
* set mode on rfx d043a17
* slim building 79e69e3
* slim docker file building a1dd3e8
* slim dockerfile 6d167ec
* slim entry point 2cb59b9
* slim user f605b15
* specify proper params for save c949c4b
* split buffer 4715286
* start device component selector 3fa40f9
* start gateway before creating endpoint 62bb79a
* start OTA Software Update Provider 5e532a1
* support for gateway closure a77d715
* support for tcp gateway 1afe68a
* switch from yarn to npm a85dbd1
* switch to esm dcb74cf
* switch to generic gateway 7d2516b
* switch to generic gateway fab4c73
* transparent proxy inject parameters d51aec6
* trying apk at first 16d00df
* trying to fix config file issue 4ccf7ac
* trying to fix docker permissions 756874a
* trying to improve reliability 55e75a7
* typo b448cdb
* udev permissions 8552c0a
* update AccuracyRanges to use array format in GatewayEndpoint and enable SupportsLift in RfyWindowCovering e869096
* update after breaking changes in akala 28983f9
* update after commands upgrade e41e30a
* update after devices break 1e59885
* update after devices breaking change e693405
* update after devices breaking change db3d19d
* update after jsonrpc breaking change a5d8dbf
* update codegen to provide ClusterDefinitions f191fd7
* update config 26a8d19
* update default config ed6451b
* update dependencies a3ea3a6
* update dependencies and checkout depth f04e50a
* update dependencies and fix devices communications b34af9c
* update dependencies to major 1292a69
* update generated metadata f24985f
* update generated metadata 675a3a7
* update home screen tailored impl 9898cb4
* update lock file 17fbd2a
* update parameter references from "param" to "params" in command JSON files 7634f8f
* update SocketAdapter import and use JsonRpcBrowser 065c4b9
* update terminology for rfy devices to match matter terminology 24cb712
* update to errorwithstatus cfa1344
* update to event emitter from akala 2bdfe95
* update to latest serial port types 77515fc
* update to proper logging 7de83c6
* update to working akala b297101
* update tsconfig.json to include 'web' path and remove commented 'icookin' path 648b768
* update vite config c771226
* update yarn 336a099
* upgrade @akala/core from 6.0.0 to 6.0.1 4336f5a
* upgrade dependency 04c1122
* usb permissions 0c1ef0c
* use signal to allow proper termination 7020b6c
* use signal to allow proper termination 48f4a4f
* use signal to allow proper termination 0a42077
* use signal to allow proper termination b111ef0
* use signal to allow proper termination daab3d0
* use value from cli f1b9d1e
* user and volumes 5c04a92
* various processing improvements 1984092
* web implementation f2b5bcb
* wrong cluster id being used 08bb3c5
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

* simplify endpoint and endpoint proxy typing a69a3e6
* update to ESM + update dependencies 2370b96


### Features

* add adb implementation 48b9904
* add browser index f5403b1
* add browser usage capability 980a93a
* add changelog f7b7d51
* add class to IDevice 716d8d8
* add codegen from zap clusters and devices types f68bdea
* add crunchyroll media indexing 317eacc
* add disconnect support to MqttClient and update tests for mqtt and mqtts ef451ea
* add full device enumeration fe29d1c
* add homekit controller 12c620a
* add homekit server (homebridge equivalent) 4e86aa4
* add list folders command 7ac6d78
* add lots of commands b7d6e19
* add ManualAdministration cluster 60e1960
* add name on rfxtrx modes ded3290
* add new behaviors e31e0b4
* add new components for device button selection and room card, enhance home page layout with search functionality 3295433
* add ota requestor behavior 60a6da4
* add possibility to specify version d72a139
* add reason code when disconnecting b44aa1b
* add redirectTopic f692d3e
* add service discovery (not ready yet) 7a7a7b4
* add slim docker alternative a06e7c6
* add tlv support be185cf
* add unknown RTS message support 9cca173
* add user label on gateway endpoint 87d8b51
* add web scrapping support and tests 62a3c61
* add yt-music 5c09d55
* create new web site from scratch using vite and akala 1492bfe
* enable cluster definition on remote clusters 4a1852e
* enable debug mode 684b9cd
* enable swipeable dialog 2a6e447
* enable URL support 1f5dc23
* enhance TypeScript generation with ClusterMap and default value handling 81dbad7
* expose Boolean behavior c09637b
* expose manualAdmin 1199b7f
* implement basic mqtt v5 protocol 01e31e0
* make devices as containers c1e5c93
* make exec on devicetype CLI compatible f92bf92
* make webscrapper public 68ba711
* many new media features 7b15160
* mdns implementation 3fdc367
* migrate to new device model and started device discovery implementation 7644990
* migrate to new device model and started device discovery implementation fe43443
* migrate to new device model and started device discovery implementation c2e4f36
* migrate to new device model and started device discovery implementation 1da2c5a
* migrate to new device model and started device discovery implementation 732c679
* migrate to new device model and started device discovery implementation 066177a
* move device management to devicetype 07e06d7
* move from Promise to Binding 3ff5970
* provide cluster value (not types only anymore) f7586d4
* provide fromBus to create an EndpointProxy from the bus 127e3cf
* shared gateway implementation d7a42a9
* start a dbus implementation 44b24d6
* start to upgrade media to container 419e5a4
* switch to matter like and mqtt implementation 7153114
* update guest role configuration and add ACLs for publish and subscribe 35473f8
* update scrapper as generic 1286958
* upgrade devices as command container 7dcd4df
* various fixes and improvements 5f6c5f1


### BREAKING CHANGES

* EndpointProxy provide bindings instead of Promise
* endpoints and endpointproxies do not expect ClusterMap anymore
* no more commands for now
* no more commands for now
* no more commands for now
* no more commands for now
* no more commands for now
* Everything has changed. Implementers need to rewrite their library from scratch
* devices types are exported without the devices namespace
* devices have to declare commands always in the same format: the @akala/commands format
* Gateway requires typed events
* webscrapper uses generic types
* update to ESM
* move device management to devicetype
* move zigate to @domojs/zigate-parsers
* move from rfxtrx to rfx-parsers



