"use strict";
const CODE_SHOW_SNOWFLAKE = "(" + function() {
  const SNOWFLAKE = "\u2744 ️";
  if (!document.title.startsWith(SNOWFLAKE)) {
    document.title = SNOWFLAKE + document.title;
    // Eventually restore the title, in case tabs.discard() does not
    // work. For instance, if a "beforeunload" event exists.
    setTimeout(() => {
      if (document.title.startsWith(SNOWFLAKE)) {
        document.title = document.title.replace(SNOWFLAKE, "");
      }
    }, 500);
  }
} + ")();";

var prependSnowflake = false;

browser.menus.create({
  id: "discard",
  type: "normal",
  title: browser.i18n.getMessage("menuItemDiscard"),
  contexts: ["tab"]
});

browser.menus.onClicked.addListener(async (info, tab) => {
  if (tab.discarded) {
    return;
  }
  if (prependSnowflake) {
    // Try to prepend a snowflake before the title,
    // before discarding the tab.
    try {
      await browser.tabs.executeScript(tab.id, {
        runAt: "document_start",
        code: CODE_SHOW_SNOWFLAKE,
      });
    } catch (e) {
      // This can happen if the tab is a privileged page, e.g. about:addons.
    }
  }
  browser.tabs.discard(tab.id);
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.prependSnowflake) {
    prependSnowflake = changes.prependSnowflake.newValue;
  }
});
browser.storage.local.get("prependSnowflake", (items) => {
  prependSnowflake = !!items.prependSnowflake;
});
