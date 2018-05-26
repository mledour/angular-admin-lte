/**
 *
 */
export interface AnimationEvent {
  fromState: string;
  toState: string;
  totalTime: number;
  phaseName: string;
  element: any;
  triggerName: string;
}
