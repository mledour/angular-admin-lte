export var adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'Start', route: '/', iconClasses: 'fa fa-th'},
    /*{label: 'MAIN NAVIGATION', separator: true},
    {label: 'Dashboards', iconClasses: 'fa fa-dashboard', children:[
      {label: 'Dashboard v1', route: '/dashboards/v1'},
      {label: 'Dashboard v2', route: '/dashboards/v1/v2'},
    ]},
    {label: 'Layout Options', iconClasses: 'fa fa-files-o', children:[
      {label: 'Top Navigation', route: '/top-navigation'},
      {label: 'Boxed', route: '/boxed'},
      {label: 'Fixed', route: '/fixed'},
      {label: 'Collapsed Sidebar', route: '/collapsed-sidebar'},
    ]},*/
    {label: 'Accordion', route: 'accordion', iconClasses: 'fa fa-th'},
    {label: 'Alert', route: 'alert', iconClasses: 'fa fa-th'},
    {label: 'Boxs', iconClasses: 'fa fa-files-o', children: [
      {label: 'Default Box', route: 'boxs/box'},
      {label: 'Info Box', route: 'boxs/info-box'},
      {label: 'Small Box', route: 'boxs/small-box'}
    ]},
    {label: 'Dropdown', route: 'dropdown', iconClasses: 'fa fa-th'},
    {label: 'Tabs', route: 'tabs', iconClasses: 'fa fa-th'},
  ]
};
