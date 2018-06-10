import {Component, ContentChild, Input} from '@angular/core';

import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupLabelDirective
} from './input-group.directive';

import {InputTextDirective} from '../input-text/input-text.directive';


/*
 *
 */
@Component({
  selector: 'mk-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent {

  @Input() addonLeft: string;
  @Input() addonRight: string;
  @Input() inputColor: string;
  @Input() inputFontColor: string;
  @Input() label: string;
  @Input() wrapperClasses = 'input-group';

  @ContentChild(InputGroupLabelDirective) public inputGroupLabelDirective: InputGroupLabelDirective;
  @ContentChild(InputGroupAddonLeftDirective) public inputGroupAddonLeftDirective: InputGroupAddonLeftDirective;
  @ContentChild(InputGroupAddonRightDirective) public inputGroupAddonRightDirective: InputGroupAddonRightDirective;
  @ContentChild(InputGroupContentDirective) public inputGroupContentDirective: InputGroupContentDirective;

  @ContentChild(InputTextDirective) public inputTextDirective: InputTextDirective;
}
