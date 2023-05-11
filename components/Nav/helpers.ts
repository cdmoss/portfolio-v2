export const NAV_ITEMS = ["home", "work"] as const;
export type NavItem = (typeof NAV_ITEMS)[number];
export const pageIndex = (item: NavItem) => NAV_ITEMS.indexOf(item);
