"use strict";

function requiresPermission() {
  // As of Firefox 63, the "activeTab" unlocks access to the tab that was
  // clicked ( https://bugzilla.mozilla.org/show_bug.cgi?id=1446956 ).
  // Support for this functionality cannot easily be detected, so indirectly
  // infer support for this feature via a different change in the same release:
  // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/63#Menus

  // If we ever stop supporting Firefox 62 and earlier (including ESR 60), then
  // the "<all_urls>" optional permission can be removed from manifest.json,
  // together with the uses of the browser.permissions API in this file.
  return !browser.menus.getTargetElement;
}

var permissions = { origins: ["<all_urls>"] };
var prefPrependSnowflake = document.getElementById("prefPrependSnowflake");
prefPrependSnowflake.onchange = async () => {
  if (prefPrependSnowflake.checked && requiresPermission()) {
    prefPrependSnowflake.disabled = true;
    // Note: permissions.request only works when this page is shown in a tab,
    // i.e. when options_ui.open_in_tab=true in manifest.json.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=1382953
    prefPrependSnowflake.checked = await browser.permissions.request(permissions);
    prefPrependSnowflake.disabled = false;
  } else {
    browser.permissions.remove(permissions);
  }
  browser.storage.local.set({
    prependSnowflake: prefPrependSnowflake.checked,
  });
};

document.getElementById("i18n-toggleSnowflakePref").textContent =
  browser.i18n.getMessage("toggleSnowflakePref");

browser.storage.onChanged.addListener((changes) => {
  if (changes.prependSnowflake) {
    prefPrependSnowflake.checked = changes.prependSnowflake.newValue;
  }
});
browser.storage.local.get("prependSnowflake", (items) => {
  prefPrependSnowflake.checked = !!items.prependSnowflake;
});
