// This file is generated from DishwasherAlarm.xml - do not edit it directly
// Generated on 2025-12-22T10:19:30.149Z

import { Cluster, ClusterDefinition } from '../../server/clients/shared.js';


export enum AlarmBitmap {
	__NotSet = 0,
		/** Water inflow is abnormal */
	InflowError= 1<<0,
		/** Water draining is abnormal */
	DrainError= 1<<1,
		/** Door or door lock is abnormal */
	DoorError= 1<<2,
		/** Unable to reach normal temperature */
	TempTooLow= 1<<3,
		/** Temperature is too high */
	TempTooHigh= 1<<4,
		/** Water level is abnormal */
	WaterLevelError= 1<<5,
}

export type DishwasherAlarm = DishwasherAlarmCluster & { id: 0x005D};

export interface DishwasherAlarmCluster {
id: 0x005D;
	attributes: {
}
	commands: {
}
	events: {
	}
}

export const dishwasherAlarm: ClusterDefinition<DishwasherAlarm> = {
id: 0x005D,
	attributes: [
	] as const,
	commands: [
	] as const,
	events: [
	] as const
}

export default dishwasherAlarm;