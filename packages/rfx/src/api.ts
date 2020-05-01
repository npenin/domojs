import * as akala from '@akala/core'
import { devices } from '@domojs/devices'

export var api = new akala.Api()
    .clientToServer<void, devices.DeviceType[]>()({
        types: {
            rest: {
                method: 'get', url: '/types'
            }
        }
    })