#  (2024-01-12)


### Bug Fixes

* add device type 3ea897b
* add homekit projects to compilation a19f377
* add missing dependency 3eb49a6
* add version field e24983b
* buffer slicing in rfx e4ed1ae
* build after dependency update d55b5ca
* device init saving e728268
* enable keepalive on tcp and http sockets 34ce209
* enable keepalive on tcp and http sockets 6cdf866
* fix wrong unit in keepalive b162a24
* improve library indexing + fix akala cli support 55ddae9
* improve mdns typings 22aa389
* improve media manager f50fd43
* improvements to protocol parser d83ad03
* iscp parsing 61d30cd
* lock file 659742d
* made devdependencies using workspace reference d2024b5
* make webscrapper private 26b5752
* patch cheerio to compile as ESM 399f0fe
* recover from closed socket 4676ab4
* remove failing pubsub 2fad35b
* remove resolutions a866f1e
* remove temporary resolutions f0f1d90
* reopen on close ffc8d15
* rfx parsing 22f8014
* scrap stop crashing on not found elements fa71a2f
* support for gateway closure 847ba60
* support for tcp gateway 1703bd9
* transparent proxy inject parameters 3a3531d
* update dependencies f3a88fe
* update dependencies and checkout depth 35d588c
* update dependencies and fix devices communications bb308f5
* update dependencies to major 181380b
* update generated metadata 2ca070f
* update generated metadata 9c9def8
* update lock file e390acd
* update to proper logging d960966
* update to working akala 9853c40
* yarn files 98ec016
* yarn state 71163e0
* zigate logging d860129


### Build System

* move to yarn v3 80ad402


### chore

* update dependencies 956f9e3


### Code Refactoring

* update to ESM + update dependencies 016db4b


### Features

* add adb implementation bce54b2
* add crunchyroll media indexing 0e955ad
* add homekit controller b525ff7
* add homekit server (homebridge equivalent) 3fd9d9e
* add list folders command 3b25858
* add lots of commands 4a1cbf5
* add service discovery (not ready yet) 24a2282
* add tlv support 9e19612
* add unknown RTS message support b0ee68f
* add web scrapping support and tests f09ee3e
* enable URL support 0c875fb
* make exec on devicetype CLI compatible f882f8b
* make webscrapper public 4c8f18b
* mdns implementation 5319498
* move device management to devicetype 948145c
* shared gateway implementation 32291ed
* start a dbus implementation 93bb8b0
* start to upgrade media to container 12af69b
* various fixes and improvements ec01382


### BREAKING CHANGES

* update to ESM
* move device management to devicetype
* move zigate to @domojs/zigate-parsers
* move from rfxtrx to rfx-parsers



