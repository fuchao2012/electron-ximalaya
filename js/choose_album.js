/**
 * Created by hbprotoss on 5/14/16.
 */

const ipc = require('electron').ipcRenderer;
// var remote = require('remote');

$('#submit').click(function () {
    ipc.sendSync('album-id-msg', $('#album-id').val());
    // remote.getCurrentWindow().close();
});
