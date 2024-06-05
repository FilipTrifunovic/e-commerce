import { trigger, transition, style, animate } from "@angular/animations";

export const cardHoverStateTrigger=trigger('cardState',[
    transition('void => *',[
        style({
            opacity:0
        }),
        animate(500)
    ]),
    transition('* => void',animate(500,style({
        opacity:0
    })))
    ])