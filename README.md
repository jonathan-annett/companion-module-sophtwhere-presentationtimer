# companion-module-sophtwhere-presentationtimer

A [Bitfocus Companion](https://bitfocus.io/companion) connection for the **Presentation Timer**, a browser-based countdown for talks and events ([timed-show.com](https://timed-show.com/), [timer.sophtwhere.com](https://timer.sophtwhere.com/), or your own copy from [timer-beta](https://github.com/jonathan-annett/timer-beta)).

Every timer command as an action, the timer's variables and states as variables and feedbacks, and ready-made presets. Companion joins the timer through its pairing server with the Companion link from the timer's **share** panel. See [HELP.md](./companion/HELP.md) for using it.

## Installing

Until it's included in Companion: download the `.tgz` from [Releases](https://github.com/jonathan-annett/companion-module-sophtwhere-presentationtimer/releases), then in Companion **Modules → Import module package**. The module checks for newer releases daily and says so in its log, the `module_update` variable and a feedback.

## Developing

Node 22 and Yarn 4 (`corepack enable`).

```sh
yarn install
yarn build      # dist/
yarn test       # unit tests (node --test)
yarn lint
yarn package    # sophtwhere-presentationtimer-<version>.tgz, for Import module package
```

For live development point Companion's _developer modules path_ at the folder above this one. The end-to-end test against a real timer page lives in [timer-beta](https://github.com/jonathan-annett/timer-beta) (`tests/e2e/companion_link.py`), with this repository checked out beside it.

## Releasing

Bump the version in `package.json`, `companion/manifest.json` and `src/update.ts` (`VERSION`; the tests check they agree), commit, then publish a GitHub release tagged `v<version>`. The _Release_ workflow builds the package with Bitfocus's module checks and attaches the `.tgz` to the release; installed copies see it within a day.

## License

MIT
