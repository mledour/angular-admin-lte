import { Component, ContentChild, ViewChild, TemplateRef } from '@angular/core';

/**
 * Footer Left
 */
@Component({
  selector: 'mk-layout-footer-left',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class FooterLeftComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}

/**
 * Footer Right
 */
@Component({
  selector: 'mk-layout-footer-right',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>'
})
export class FooterRightComponent {
  @ViewChild('templateRef') public templateRef: TemplateRef<any>;
}

@Component({
  selector: 'mk-layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @ContentChild(FooterLeftComponent) public footerLeftComponent: FooterLeftComponent;
  @ContentChild(FooterRightComponent) public footerRightComponent: FooterRightComponent;
}
