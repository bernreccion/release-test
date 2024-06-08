const fs = require('fs')
const Handlebars = require('./helper')

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
                        { type: 'build', section: 'Patches', hidden: false },
                        { type: 'chore', section: 'Patches', hidden: false },
                        { type: 'ci', section: 'Patches', hidden: false },
                        { type: 'docs', section: 'Patches', hidden: false },
                        { type: 'feat', section: 'Features', hidden: false },
                        { type: 'fix', section: 'Patches', hidden: false },
                        { type: 'perf', section: 'Patches', hidden: false },
                        { type: 'refactor', section: 'Patches', hidden: false },
                        { type: 'style', section: 'Patches', hidden: false },
                        { type: 'test', section: 'Patches', hidden: false },
                    ],
                },
                writerOpts: {
                    groupBy: "type",
                    commitGroupsSort: "title",
                    commitsSort: ["type", "scope"],
                    mainTemplate: fs.readFileSync('./mainTemplate.hbs', 'utf-8'),
                    helpers: Handlebars.helpers
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

module.exports = config;