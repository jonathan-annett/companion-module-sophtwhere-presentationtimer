/** An option or message value as text: strings and numbers as they are, anything else empty */
export function str(v: unknown): string {
	return typeof v === 'string' ? v : typeof v === 'number' || typeof v === 'boolean' ? String(v) : ''
}
