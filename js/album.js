/**
 * Created by hbprotoss on 5/14/16.
 */

// const ipc = require('electron').ipcRenderer;

// console.log(ipc.sendSync('choose-album-msg', 'ping'));

// 每个播放项目ID
play_id = 0;

bootbox.prompt({
    size: 'small',
    title: "What is your album id?",
    callback: function (res) {
        if (res == null) {
            $.zui.messager.show('Album empty', {placement: 'center'});
        } else {
            // $.zui.messager.show(res, {placement: 'center'});
            loadAlbum(res);
        }
    }
});

function loadAlbum(albumId) {
    url = `http://mobile.ximalaya.com/mobile/others/album/track?albumId=${albumId}&pageId=1&pageSize=20`;
    console.log(url);
    $.ajax(url, {
        dataType: 'json'
    }).success(function (res) {
            // console.log(res);
            renderAlbum(res);
        });
}

function renderAlbum(album) {
    var albumInfo = album.album;
    var tracks = album.tracks.list;

    $('#app-title').text(albumInfo.title);
    $('#img-cover').attr('src', albumInfo.coverOrigin);
    $('#title').contents().first().replaceWith(albumInfo.title);
    $('#nick-name').text(albumInfo.nickname);

    var playlistSel = $('#mini-player-list');
    playlistSel.empty();
    tracks.forEach(function (e) {
        play_id++;
        playlistSel.append(`
            <li>
                <a id="play-icon-${play_id}" class="play-button" href="javascript:;"><i class="icon icon-play"></i></a>
                <a id="play-title-${play_id}" class="title">${e.title}</a>
            </li>`);
        $(`#play-icon-${play_id}`).click(function () {
            play(e.playPathAacv224, `${albumInfo.title} - ${e.title}`);
        });
        $(`#play-title-${play_id}`).click(function () {
            play(e.playPathAacv224, `${albumInfo.title} - ${e.title}`);
        });
    });
}

function play(url, title) {
    $('#audio-player').attr('src', url).trigger('play');
    $('#app-title').text(title);
}
