import { NotificationEmitter } from "../clusters/Notifications.js";
import { Commissionnee } from "../clusters/Commissionnee.js";

export type DomojsClusterMap =
    {
        commissionning: Commissionnee,
        richNotifications: NotificationEmitter,
    };
