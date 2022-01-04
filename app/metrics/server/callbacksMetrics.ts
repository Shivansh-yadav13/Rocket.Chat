import { metrics } from './lib/metrics';
import StatsTracker from './lib/statsTracker';
import { callbacks } from '../../callbacks/lib/callbacks';

const { run: originalRun, runItem: originalRunItem } = callbacks;

callbacks.run = function (hook, item, constant): unknown {
	const rocketchatHooksEnd = metrics.rocketchatHooks.startTimer({
		hook,
		// eslint-disable-next-line @typescript-eslint/camelcase
		callbacks_length: callbacks.length,
	});

	const result = originalRun.call(callbacks, hook, item, constant);

	rocketchatHooksEnd();

	return result;
};

callbacks.runItem = function ({ callback, result, constant, hook, time = Date.now() }): unknown {
	const rocketchatCallbacksEnd = metrics.rocketchatCallbacks.startTimer({
		hook,
		callback: callback.id,
	});

	const newResult = originalRunItem.call(callbacks, { callback, result, constant });

	StatsTracker.timing('callbacks.time', Date.now() - time, [`hook:${hook}`, `callback:${callback.id}`]);

	rocketchatCallbacksEnd();

	return newResult;
};