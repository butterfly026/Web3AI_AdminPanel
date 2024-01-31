import { PermissionsType } from "../typings";

/**
 * 从api获取菜单信息
 * @param childrens
 * @param first
 * @returns
 */
export const loopMenu = (
  childrens: PermissionsType[] | undefined,
  first = false
) => {
  let items = [];

  if (first) {
    items.push({
      name: "login",
      path: "/login",
      hideInMenu: true,
      headerRender: false,
      footerRender: false,
      menuRender: false,
      menuHeaderRender: false,
    });
  }

  if (childrens === undefined) {
    return items;
  }

  // eslint-disable-next-line array-callback-return
  childrens?.map((item) => {
    if (item.url === null) {
      items.push({
        name: item.title,
        children: loopMenu(item.children),
      });
    } else {
      items.push({
        name: item.title,
        path: item.url || "",
        children: loopMenu(item.children),
      });
    }
  });
  return items;
};
