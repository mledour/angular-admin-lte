import { Component, ContentChild, OnInit, ViewChild, ElementRef } from '@angular/core';
import type { TemplateRef } from '@angular/core';

import { FooterService } from './footer.service';


@Component({
  selector: 'mk-layout-footer-left',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class FooterLeftComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-layout-footer-right',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class FooterRightComponent {
  @ViewChild('templateRef', { static: true }) public templateRef!: TemplateRef<ElementRef>;
}


@Component({
  selector: 'mk-layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ContentChild(FooterLeftComponent) public footerLeftComponent?: FooterLeftComponent;
  @ContentChild(FooterRightComponent) public footerRightComponent?: FooterRightComponent;

  constructor(
    private elementRef: ElementRef,
    private footerService: FooterService
  ) {}

  ngOnInit(): void {
    this.footerService.elementRef = this.elementRef;
  }
}
