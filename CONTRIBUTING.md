# Contributing to Freeze Tab

## Localization & Translations
These are the steps if you want to contribute messages for a new language:
- Figure out short name for your language (e.g., `es`)
- copy directory `en` into the directory with the short name (e.g., `es`)
- modify the `message` fields in `messages.json`, but leave the descriptions intact
- file a pull request with the new folder and modified messages.json file
- Done!


### Roadmap and future plans
I'm thinking of adding a feature that automatically goes through tabs and
freezes those that haven't been used in a long while.
The steps towards that are:
- Figuring out how to identify a tab's last usage.
- Store tab's last use time in the add-on and keep it updated, when the user clicks a tab.
- Every X minutes (5? 10?), go through tabs and discard.

### Other contributions
I'm open to other contributions, please file an issue to start a discussion!