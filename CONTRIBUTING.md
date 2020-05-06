# Contributing to Discard Tab

## This
I consider this extension mostly "done".
I do not intend to add features.
I'm unlikely to accept pull requests, unless the extension becomes broken.
Examples of acceptable patches:
- Firefox Web Extension APIs change. The add-on won't work with a new version of Firefox
- Adding new localizations (see below)
Examples of inacceptable pull requests:
- new features, especially those that require new permissions


## Localization & Translations
These are the steps if you want to contribute messages for a new language:
- Figure out short name for your language (e.g., `es`)
- copy directory `en` into the directory with the short name (e.g., `es`)
- modify the `message` fields in `messages.json`, but leave the descriptions intact
- file a pull request with the new folder and modified messages.json file
- Done!
