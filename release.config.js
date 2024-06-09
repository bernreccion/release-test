const fs = require('fs');

const Handlebars = require('handlebars')

Handlebars.registerHelper('eq', (a, b) => a == b)

module.exports = Handlebars;

const config = {
    branches: ['main'],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    { type: "feat", release: "minor" },
                    { type: "fix", release: "patch" },
                    { type: "perf", release: "patch" },
                    { type: "docs", release: "patch" },
                    { type: "style", release: "patch" },
                    { type: "refactor", release: "patch" },
                    { type: "test", release: "patch" },
                    { type: "build", release: "patch" },
                    { type: "ci", release: "patch" },
                    { type: "chore", release: "patch" },
                    { type: "revert", release: "patch" },
                    { breaking: true, release: "major" }
                ],
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
                },
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits",
                presetConfig: {
                    types: [
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
                    ],
                    userUrlFormat: "test"
                },
                writerOpts: {
                    groupBy: "type",
                    commitGroupsSort: "title",
                    commitsSort: ["type", "scope"],
                    mainTemplate: fs.readFileSync('./mainTemplate.hbs', 'utf-8')
                }
            }
        ],
        [
            '@semantic-release/changelog', {
                changelogFile: 'docs/CHANGELOG.md'
            }
        ],
        [
            '@semantic-release/npm', {
                npmPublish: false,
            }
        ],
        [
            '@semantic-release/git', {
                assets: ['dist/*js', 'package.json', 'package-lock.json', 'docs/CHANGELOG.md'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ],
        '@semantic-release/github'
    ]
}

module.exports = config
