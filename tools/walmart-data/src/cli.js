const cliProgress = require('cli-progress');
const colors = require('ansi-colors');


class ProgressBar {
    multibar = new cliProgress.MultiBar({
        clearOnComplete: false,
        hideCursor: true,
        format: '{task} \t |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Tasks',
        fps: 60    
    }, cliProgress.Presets.shades_grey);


    createbar(maxItems, task) {
        return this.multibar.create(maxItems, 0, {task});
    }

    stop() {
        this.multibar.stop();
    }
}

exports.ProgressBar = ProgressBar
