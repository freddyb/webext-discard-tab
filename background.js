"use strict";

browser.menus.create({
  id: "discard",
  type: "normal",
  title: browser.i18n.getMessage("menuItemDiscard"),
  contexts: ["tab"]
});

browser.menus.onClicked.addListener((info, tab) => {
   browser.tabs.discard(tab.id);
});
