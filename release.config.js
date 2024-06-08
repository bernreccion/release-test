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
                writerOpts: {
                    groupBy: "type",
                    commitGroupsSort: "title",
                    commitsSort: ["type", "scope"],
                    mainTemplate: "## BREAKING CHANGES\n{{#each commitGroups}}{{#if (eq this.title '⚠ BREAKING CHANGE')}}{{> commitGroup}}{{/if}}{{/each}}\n## FEATURES\n{{#each commitGroups}}{{#if (eq this.title 'feat')}}{{> commitGroup}}{{/if}}{{/each}}\n## PATCHES\n{{#each commitGroups}}{{#if (not (or (eq this.title 'BREAKING CHANGE') (eq this.title 'feat')) )}}{{> commitGroup}}{{/if}}{{/each}}",
                    commitPartial: "- {{header}}{{#if notes}}\n  {{notes}}{{/if}}{{body}}\n",
                }
            }
        ],
        [
            '@semantic-release/changelog', {
                changelogFile: 'docs/CHANGELOG.md'
            }
        ],
        [
            '@semantic-release/git', {
                assets: ['dist/*js', 'package.json', 'package-lock.json', 'docs/CHANGELOG.md'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ],
        [
            "@semantic-release/npm",
            {
                npmPublish: false,
            }
        ],
        '@semantic-release/github'
    ]
}

module.exports = config;