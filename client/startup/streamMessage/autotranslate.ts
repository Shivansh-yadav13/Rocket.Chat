import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { hasPermission } from '../../../app/authorization/client';
import { callbacks } from '../../../app/callbacks/lib/callbacks';
import { settings } from '../../../app/settings/client';

Meteor.startup(() => {
	Tracker.autorun(() => {
		const isEnabled = settings.get('AutoTranslate_Enabled') && hasPermission('auto-translate');

		if (!isEnabled) {
			callbacks.remove('streamMessage', 'autotranslate-stream');
			return;
		}

		import('../../../app/autotranslate/client').then(({ createAutoTranslateMessageStreamHandler }) => {
			const streamMessage = createAutoTranslateMessageStreamHandler();
			callbacks.remove('streamMessage', 'autotranslate-stream');
			callbacks.add('streamMessage', streamMessage, callbacks.priority.HIGH - 3, 'autotranslate-stream');
		});
	});
});
