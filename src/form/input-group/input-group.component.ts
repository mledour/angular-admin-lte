import { Component, Directive, Input, ContentChild, AfterContentInit } from '@angular/core';

import { InputGroupLabelDirective, InputGroupAddonLeftDirective, InputGroupAddonRightDirective, InputGroupContentDirective } from './input-group.directive';

import { InputTextDirective } from '../input-text/input-text.directive';

import { removeListeners } from '../../helpers';

/*
 *
 */
@Component({
  selector: 'mk-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent implements AfterContentInit {

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

  ngAfterContentInit() {
    console.log(this.inputTextDirective);
  }
}
