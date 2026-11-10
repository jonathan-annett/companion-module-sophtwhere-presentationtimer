/**
 * Is there a newer version of this module? Until the module is in Companion's own module store
 * (which then offers updates itself), it's installed from a .tgz on the GitHub releases page, and a
 * module can't replace itself. So it asks GitHub for the latest release when it starts and once a
 * day, and if it's newer says so: a warning in the log, the module_update variable and the
 * update_available feedback. Off in the connection's settings ("Check for a newer version").
 */

/** This module's version: kept equal to package.json and companion/manifest.json (the tests check) */
export const VERSION = '0.2.0'
export const REPO = 'jonathan-annett/companion-module-sophtwhere-presentationtimer'
export const RELEASES = `https://github.com/${REPO}/releases`
const DAY = 24 * 3600 * 1000

/** 'v1.2.3' or '1.2.3' (a pre-release suffix ignored) → [1, 2, 3], or null */
export function parseVersion(v: string): number[] | null {
	const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(v || '').trim())
	return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null
}
/** Is a newer than b? */
export function isNewer(a: string, b: string): boolean {
	const x = parseVersion(a)
	const y = parseVersion(b)
	if (!x || !y) return false
	for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i]
	return false
}

export interface UpdateInfo {
	latest: string
	url: string
}

/** The latest release on GitHub ({latest: '0.3.0', url}), or null if it can't be had */
export async function latestRelease(fetchFn: typeof fetch = fetch): Promise<UpdateInfo | null> {
	try {
		const r = await fetchFn(`https://api.github.com/repos/${REPO}/releases/latest`, {
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': `companion-module-sophtwhere-presentationtimer/${VERSION}`,
			},
			signal: AbortSignal.timeout(15000),
		})
		if (!r.ok) return null
		const j = (await r.json()) as { tag_name?: string; html_url?: string }
		const v = parseVersion(j.tag_name ?? '')
		return v ? { latest: v.join('.'), url: j.html_url || RELEASES } : null
	} catch {
		return null
	}
}

/** Checks now and every day until stopped; onNewer is called with a newer release (once per version) */
export class UpdateCheck {
	private timer: NodeJS.Timeout | null = null
	private told = ''

	constructor(private onNewer: (info: UpdateInfo) => void) {}

	start(): void {
		if (this.timer) return
		void this.check()
		this.timer = setInterval(() => void this.check(), DAY)
	}

	stop(): void {
		if (this.timer) clearInterval(this.timer)
		this.timer = null
	}

	private async check(): Promise<void> {
		const info = await latestRelease()
		if (!info || !isNewer(info.latest, VERSION) || info.latest === this.told) return
		this.told = info.latest
		this.onNewer(info)
	}
}
