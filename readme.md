# Conventional Commits

- MAJOR.MINOR.PATCH

## Major
- `BREAKING CHANGE:` or 
- append ! after type/scope (i.e. `feat!:`, `chore!:`, `fix!:`, etc)

## Minor
- `feat:` - new feature introduced with the changes

## Patches
- `fix:` – a bug fix has occurred
- `chore:` – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- `refactor:` – refactored code that neither fixes a bug nor adds a feature
- `docs:` – updates to documentation such as a the README or other markdown files
- `style:` – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- `test:` – including new or correcting previous tests
- `revert:` – reverts a previous commit
- `perf:` – performance improvements
- `ci:` – continuous integration related
- `build:` – changes that affect the build system or external dependencies

## Commit Message Structure
<'type'>[optional scope]: <'description'> \
[optional body] \
[optional footer(s)]

# Release
- only happens if a `feat/release branch` is pushed to `main branch` and version bump occurs

## Manual Release
- after a PR is ready to be merged to main branch (approved already), version bump the project
    - `` npm version [major|minor|patch] -m version bump to `%s` ``
        - if major from `0.0.0` to `1.0.0`
        - if minor from `0.0.0` to `0.1.0`
        - if patch from `0.0.0` to `0.0.1`
    - check if version is updated in `package.json` and `package-lock.json`
    - push changes and merge the PR to main
        - select `create a merge commit` option when merging the PR
    - create a release notes manually
        - tag version should be the same with the version in `package.json` and `package-lock.json`
        - generate release notes

## Automatic Release (through Github Action using semantic release)
- **MAKE SURE TO FOLLOW CONVENTIONAL COMMITS!**
    - this will allow the plugin to analyze the commits in order to bump the version properly
    - when a PR is pushed to main, it will trigger the workflow to generate the release as well as the release notes

- How will the plugin know which is which to version bump from MAJOR.MINOR.PATCH?
    - **the order of commits will not matter but the degree/level of type used to commit**. 
    - It analyzes all the commits from the PR and for the example below, the highest degree/level is `feat:`, which is a MINOR version bump.

    - ``` 
        1st commit: chore: <commit message> (oldest commit)
        2nd commit: feat: <commit message>
        3rd commit: fix: <commit message> (latest commit)
        ```

    - If there any `BREAKING CHANGE:` or commits with `!`, a major version bump is triggered regardless of order of the commits.

### Release Notes
```
{ type: 'feat', section: 'Features', hidden: false },
{ type: 'fix', section: 'Bug Fixes', hidden: false },
{ type: 'chore', section: 'Miscellaneous Chores', hidden: false },
{ type: 'ci', section: 'Continuous Integration', hidden: false },
{ type: 'build', section: 'Build System', hidden: false },
{ type: 'test', section: 'Tests', hidden: false },
{ type: 'docs', section: 'Documentation', hidden: false },
{ type: 'perf', section: 'Performance Improvements', hidden: false },
{ type: 'refactor', section: 'Code Refactoring', hidden: false },
{ type: 'style', section: 'Styles', hidden: false },
{ type: 'revert', section: 'Reverts', hidden: false },
```
- currently, this is the config of what will be shown in the release notes
- we can control what should be shown in the release notes by setting the value of hidden to `true` 