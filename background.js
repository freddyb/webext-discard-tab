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

const discardTab = async (tab) => {
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
}

browser.menus.onClicked.addListener(async (info, tab) => {
  // A highlighted tab is a selected tab.
  // If the tab is not highlighted, the user clicked on a tab that is neither selected nor the active tab.
  // If the tab is highlighted it might be the active tab or one of multiple selected tabs.
  if (tab.highlighted) {
    const tabs = await browser.tabs.query({windowId: tab.windowId, active: false, discarded: false, highlighted: true});
    tabs.forEach(async (it) => await discardTab(it));
  } else {
    discardTab(tab);
  }
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.prependSnowflake) {
    prependSnowflake = changes.prependSnowflake.newValue;
  }
});
browser.storage.local.get("prependSnowflake", (items) => {
  prependSnowflake = !!items.prependSnowflake;
});
