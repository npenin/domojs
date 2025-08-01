import { ObservableArray } from "@akala/core";
import { Cluster } from "../clients/index.js";


export type NotificationEmitter = Cluster<{ notifications: ObservableArray<Notification>; }, {
    actOnNotification: {
        inputparams: [
            notificationId: Notification['id'],
            action: 'dismiss' | 'open' | 'button1' | 'button2' | 'button3'
        ];
        outputparams: [];
    };
}, {}>;

export enum NotificationSeverity
{
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
    Critical = 'critical'
}

export interface NotificationAction
{
    action: 'button1' | 'button2' | 'button3';
    actionId?: string; // Identifier for the action (e.g., "open", "dismiss", "snooze")
    title: string; // Display title for the button
    icon?: string; // Optional icon URL
}

export interface Notification
{
    id: ReturnType<(typeof crypto)['randomUUID']>;
    title: string; // Short headline
    message: string; // Body text
    timestamp?: number; // ms since epoch
    severity?: NotificationSeverity;
    category?: string; // e.g., "system", "security", "update"
    requireAck?: boolean;

    // Rich notification fields
    icon?: string; // Icon URL (small)
    image?: string; // Large image URL
    badge?: string; // Badge icon URL
    sound?: string; // Sound file URL or name
    vibrate?: number[]; // Vibration pattern (e.g., [100, 50, 100])
    silent?: boolean; // Whether to suppress sound/vibration
    persistent?: boolean; // Whether it should stay until acknowledged
    tag?: string; // Used to group or replace notifications
    actions?: NotificationAction[]; // Action buttons

    data?: Record<string, any>; // Extra metadata for client use
}
