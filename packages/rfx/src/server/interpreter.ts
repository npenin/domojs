// import * as di from '@akala/server';
// import { KeywordInterpreter, KeywordContext, Interpreter } from '@domojs/chat/dist/server/language';
// import { Context } from '@domojs/chat';
// import * as rfx from './protocols'

// export type KeywordWithTimeContext = KeywordContext & Context;

// export class RfxInterpreter extends KeywordInterpreter
// {
//     actions = { "up": ["ouvre", "lève", "ouvrir", "lever"], "down": ["baisse", "ferme", "baisser", "fermer"] };
//     keywords = { "shutters": ["les volets", "le volet"] };
//     others = { "Tous": ["", "de la maison"], "Volets chambre": ["de la chambre"], "Voldets salon": ["du salon"], "Volets Salle": ["de la salle"], "Volets cuisine": ["de la cuisine"] };

//     public execute(context: KeywordWithTimeContext, next: (error?: any) => void, callback: (answer: string) => void)
//     {
//         switch (context.keyword)
//         {
//             case 'up':

//                 break;
//         }
//     }

//     public understand(context: KeywordWithTimeContext)
//     {
//         super.understand(context);
//         if (context.keyword)
//             context.deferred = false;
//     };
// }

// new RfxInterpreter().register();