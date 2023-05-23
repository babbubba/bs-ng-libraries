
export interface MenuItem {
  authorizedRoles: string[];
  code: string;
  cssClass?: string;
  iconStyle?: string;
  id?: string;
  isDefaultOpen?: boolean;
  isEnabled: boolean;
  isTreeView?: boolean;
  label: string;
  parentItemCode: string;
  parentMenuCode: string;
  path: string;
  position: number;
  requiredPermissions: string[];
  subItems?: MenuItem[];
  toolTip?: string;
}


export interface Menu {
  [key: string]: MenuItem[];
}
