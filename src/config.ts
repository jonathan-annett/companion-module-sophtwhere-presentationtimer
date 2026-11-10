import type { SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	/** The Companion link copied from the timer's share panel (Companion mode), or just the part after '#' */
	link: string
	/** Pairing server override (normally taken from the link; default from the timer host: wss://<host>:8443/ on sophtwhere.com, else wss://<host>/ws) */
	server: string
	/** Accept a self-signed certificate on the pairing server (local testing only) */
	insecure: boolean
	/** Token from a PIN approval, kept here so a restart needs no new PIN (written by the module) */
	token: string
	/** Ask GitHub daily whether a newer version of this module is out (update.ts); missing = on */
	updates?: boolean
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'How to connect',
			value:
				'On the timer, click <b>share</b>, choose <b>Companion</b> and copy the link shown under the code (<b>Copy link</b>). Paste it below. ' +
				'The first time, this connection shows a 3-digit number in its status (and log): type it into the timer’s share panel to let it in.',
		},
		{
			type: 'textinput',
			id: 'link',
			label: 'Companion link from the timer',
			width: 12,
			default: '',
		},
		{
			type: 'textinput',
			id: 'server',
			label: 'Pairing server (leave empty to use the one in the link)',
			width: 8,
			default: '',
		},
		{
			type: 'checkbox',
			id: 'insecure',
			label: 'Accept a self-signed certificate (testing only)',
			width: 4,
			default: false,
		},
		{
			type: 'checkbox',
			id: 'updates',
			label: 'Check for a newer version of this module (daily, on GitHub)',
			width: 12,
			default: true,
		},
	]
}
