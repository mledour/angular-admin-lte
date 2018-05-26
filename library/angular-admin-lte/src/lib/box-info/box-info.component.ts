import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { BoxInfoContentDirective, BoxInfoFooterDirective, BoxInfoHeaderDirective } from './box-info.directive';

/*
 *
 */
@Component({
  selector: 'mk-box-info',
  styleUrls: ['./box-info.component.css'],
  templateUrl: './box-info.component.html'
})
export class BoxInfoComponent implements OnInit {
  public progressBarBg: string;

  @Input() public backgroundColor: string;
  @Input() public contentStyleClass = 'info-box-number';
  @Input() public contentColor: string;
  @Input() public footer: string;
  @Input() public footerColor: string;
  @Input() public footerStyleClass = 'progress-description';
  @Input() public header: string;
  @Input() public headerColor: string;
  @Input() public headerStyleClass = 'info-box-text';
  @Input() public iconBackgroundColor: string;
  @Input() public iconColor = '#fff';
  @Input() public iconStyleClass = 'ion ion-bag';
  @Input() public progressWidth: number;
  @Input() public styleClass = 'info-box';

  @ContentChild(BoxInfoHeaderDirective) public boxInfoHeaderDirective: BoxInfoHeaderDirective;
  @ContentChild(BoxInfoFooterDirective) public boxInfoFooterDirective: BoxInfoFooterDirective;
  @ContentChild(BoxInfoContentDirective) public boxInfoContentDirective: BoxInfoContentDirective;

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    if (!this.backgroundColor) {
      this.progressBarBg = this.iconBackgroundColor;
    }
  }
}
