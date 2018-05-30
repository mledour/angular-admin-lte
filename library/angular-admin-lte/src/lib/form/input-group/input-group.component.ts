import { AfterContentInit, Component, ContentChild, Input, OnDestroy } from '@angular/core';

import { removeSubscriptions } from '../../helpers';

import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupLabelDirective
} from './input-group.directive';

import {InputTextDirective} from '../input-text/input-text.directive';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';


/*
 *
 */
@Component({
  selector: 'mk-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css']
})
export class InputGroupComponent implements AfterContentInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  @Input() addonLeft: string;
  @Input() addonRight: string;
  @Input() inputColor: string;
  @Input() inputFontColor: string;
  @Input() label: string;
  @Input() wrapperClasses = 'form-group';

  @ContentChild(InputGroupLabelDirective) public inputGroupLabelDirective: InputGroupLabelDirective;
  @ContentChild(InputGroupAddonLeftDirective) public inputGroupAddonLeftDirective: InputGroupAddonLeftDirective;
  @ContentChild(InputGroupAddonRightDirective) public inputGroupAddonRightDirective: InputGroupAddonRightDirective;
  @ContentChild(InputGroupContentDirective) public inputGroupContentDirective: InputGroupContentDirective;
  @ContentChild(InputTextDirective) public inputTextDirective: InputTextDirective;

  ngAfterContentInit() {
    this.subscriptions.push(this.inputTextDirective.onKeyup.subscribe((value: NgControl) => {
      console.log(value);
    }));
  }

  ngOnDestroy() {
    removeSubscriptions(this.subscriptions);
  }
}
