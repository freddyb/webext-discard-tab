"use strict";
const SNOWFLAKE = "\u2744 ️";


browser.menus.create({
  id: "discard",
  type: "normal",
  title: browser.i18n.getMessage("menuItemDiscard"),
  contexts: ["tab"]
});

// eslint fails to realize that the param of an arrow function cant be blank/undefined, so ignore warning below
// eslint-disable-next-line no-unused-vars
browser.menus.onClicked.addListener((info, tab) => {
   browser.tabs.discard(tab.id);
   browser.tabs.update(tab.id, { title: SNOWFLAKE + tab.title });

});
