#  (2024-08-18)


### Bug Fixes

* add device type 53de407
* add homekit projects to compilation ce50c3d
* add missing dependency 60e2e49
* add version field 884db03
* artificial bump 878c059
* artificial bump 32822d5
* artificial bump fc88add
* artificial bump a1d6219
* artificial bump d4ce138
* artificial bump b08a001
* buffer slicing in rfx 48397c4
* build after dependency update 75cf585
* device init saving 5980d33
* enable keepalive on tcp and http sockets cd61cd8
* enable keepalive on tcp and http sockets 27fcfd2
* fix wrong unit in keepalive 58ddd94
* improve library indexing + fix akala cli support f235b43
* improve mdns typings 3a5d0f1
* improve media manager bb7f291
* improve mqtt implementation (not ready yet) a26db7d
* improvements to protocol parser 1398b5f
* iscp parsing 7eda917
* lock file 5ac40a4
* made devdependencies using workspace reference 3737032
* make dbus private cc7ded1
* make webscrapper private f2a547f
* packages/theme-default/package.json & packages/theme-default/yarn.lock to reduce vulnerabilities 868f5f3
* patch cheerio to compile as ESM b62f558
* recover from closed socket 0b733dd
* remove @akala/client for now 570f6fd
* remove @akala/client for now fae299f
* remove extra logging 629ad7e
* remove failing pubsub 1f0ec9e
* remove resolutions 648105b
* remove temporary resolutions 175c6c8
* reopen on close 97206ad
* rfx parsing 09bbea5
* scrap stop crashing on not found elements 57355db
* specify proper params for save c949c4b
* support for gateway closure a77d715
* support for tcp gateway 1afe68a
* transparent proxy inject parameters d51aec6
* update dependencies a3ea3a6
* update dependencies and checkout depth f04e50a
* update dependencies and fix devices communications b34af9c
* update dependencies to major 1292a69
* update generated metadata f24985f
* update generated metadata 675a3a7
* update lock file 17fbd2a
* update to event emitter from akala 2bdfe95
* update to proper logging 7de83c6
* update to working akala b297101
* upgrade @akala/core from 6.0.0 to 6.0.1 4336f5a
* use signal to allow proper termination 7020b6c
* use signal to allow proper termination 48f4a4f
* use signal to allow proper termination 0a42077
* use signal to allow proper termination b111ef0
* use signal to allow proper termination daab3d0
* various processing improvements 1984092
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
* add crunchyroll media indexing 317eacc
* add homekit controller 12c620a
* add homekit server (homebridge equivalent) 4e86aa4
* add list folders command 7ac6d78
* add lots of commands b7d6e19
* add service discovery (not ready yet) 7a7a7b4
* add tlv support be185cf
* add unknown RTS message support 9cca173
* add web scrapping support and tests 62a3c61
* add yt-music 5c09d55
* enable URL support 1f5dc23
* make exec on devicetype CLI compatible f92bf92
* make webscrapper public 68ba711
* many new media features 7b15160
* mdns implementation 3fdc367
* move device management to devicetype 07e06d7
* shared gateway implementation d7a42a9
* start a dbus implementation 44b24d6
* start to upgrade media to container 419e5a4
* update scrapper as generic 1286958
* various fixes and improvements 5f6c5f1


### BREAKING CHANGES

* webscrapper uses generic types
* update to ESM
* move device management to devicetype
* move zigate to @domojs/zigate-parsers
* move from rfxtrx to rfx-parsers



