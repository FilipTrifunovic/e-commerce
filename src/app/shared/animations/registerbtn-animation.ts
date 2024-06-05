import { trigger, transition, style,animate } from "@angular/animations";


export const buttonStateTrigger= trigger('buttonState',[
    transition('invalid=>valid',[
        animate(200,style({
            transform:'scale(1.15)'
        })),
        animate(200,style({
            transform:'scale(1)'
        }))
    ])
])