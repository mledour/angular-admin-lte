import { AfterContentInit, Component, ContentChild, Input, OnDestroy } from '@angular/core';

import { removeSubscriptions } from '../../helpers';

import {
  InputGroupAddonLeftDirective,
  InputGroupAddonRightDirective,
  InputGroupContentDirective,
  InputGroupLabelDirective
} from './input-group.directive';

import { InputTextDirective } from '../input-text/input-text.directive';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';


/*
 *
 */
@Component({
  selector: 'mk-input-group',
  templateUrl: './input-group.component.html'
})
export class InputGroupComponent implements AfterContentInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public currentColor: string;
  public currentFontColor: string;

  @Input() addonLeft: string;
  @Input() addonRight: string;
  @Input() inputColor = 'default';
  @Input() inputFontColor: string;
  @Input() inputErrorColor = 'danger';
  @Input() inputErrorFontColor: string;
  @Input() inputValidColor = 'success';
  @Input() inputValidFontColor: string;
  @Input() label: string;
  @Input() wrapperClasses = 'form-group';

  @ContentChild(InputGroupLabelDirective, /* TODO: add static flag */ {}) public inputGroupLabelDirective: InputGroupLabelDirective;
  @ContentChild(InputGroupAddonLeftDirective, /* TODO: add static flag */ {}) public inputGroupAddonLeftDirective: InputGroupAddonLeftDirective;
  @ContentChild(InputGroupAddonRightDirective, /* TODO: add static flag */ {}) public inputGroupAddonRightDirective: InputGroupAddonRightDirective;
  @ContentChild(InputGroupContentDirective, /* TODO: add static flag */ {}) public inputGroupContentDirective: InputGroupContentDirective;
  @ContentChild(InputTextDirective, /* TODO: add static flag */ {}) public inputTextDirective: InputTextDirective;

  ngAfterContentInit() {
    this.subscriptions.push(this.inputTextDirective.onKeyup.subscribe((value: NgControl) => {
      if (value.invalid) {
        this.currentColor = this.inputErrorColor;
        this.currentFontColor = this.inputErrorFontColor;
      } else if (!value.invalid) {
        this.currentColor = this.inputValidColor;
        this.currentFontColor = this.inputValidFontColor;
      } else {
        this.currentColor = this.inputColor;
        this.currentFontColor = this.inputFontColor;
      }
    }));
  }

  ngOnDestroy() {
    removeSubscriptions(this.subscriptions);
  }
}
