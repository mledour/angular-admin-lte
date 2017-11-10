import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';

export { AnimationEvent } from '@angular/animations';

export function collapseAnimation(duration = '1200ms', easing = 'ease') {
  return trigger('collapseAnimation', [
    state('true', style({
      'height': '0',
      'display': 'none'
    })),
    state('false', style({
      'height': '*'
    })),
    transition('false => true', [
        style({
          'height': '*',
          'overflow': 'hidden'
        }),
        animate(
          `${duration} ${easing}`,
          style({
            'height': '0',
            'padding-top': '0',
            'padding-bottom': '0',
            'overflow': 'hidden'
          })
        )
    ]),
    transition('true => false', [
        style({
          'height': 0,
          'overflow': 'hidden'
        }),
        animate(
          `${duration} ${easing}`,
          style({
            'height': '*'
          })
        )
    ])
  ]);
}
