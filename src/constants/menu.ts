export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    isTitle: false,
    icon: 'mgc_home_3_line',
    url: '/dashboard'
  },
  {
    key: 'charts',
    label: 'Charts',
    isTitle: false,
    icon: 'mgc_chart_bar_line',
    url: '/charts'
  },
  {
    key: 'gauges',
    label: 'Gauges',
    isTitle: false,
    icon: 'mgc_dashboard_2_line',
    url: '/gauges'
  },
  {
    key: 'reports',
    label: 'Reports',
    isTitle: false,
    icon: 'mgc_report_line',
    url: '/reports'
  },
  {
    key: 'exports',
    label: 'Exports',
    isTitle: false,
    icon: 'mgc_file_export_line',
    url: '/exports'
  }
];

export { MENU_ITEMS };
