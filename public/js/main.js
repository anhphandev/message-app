'use trict';
$(document).ready(function () {
    const socket = io.connect();
    // Escape HTML
    function escape(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    // Emoji List
    const emojiList = [
        [/\(y\)/, '&#x1F44D;'],
        [/3\:\)/, '&#x1F608;'],
        [/O\:\)/, '&#x1F607;'],
        [/\:\)/, '&#x1F642;'],
        [/&gt;\:[\(O]/, '&#x1F620;'],
        [/\:\(/, '&#x1F641;'],
        [/\:D/, '&#x1F603;'],
        [/\;\)/, '&#x1F609;'],
        [/(\=\)|\^\_\^)/, '&#x1F60A;'],
        [/8\)/, '&#x1F60E;'],
        [/\:\|/, '&#x1F610;'],
        [/\-\_\-/, '&#x1F611;'],
        [/\:[\\\/]/, '&#x1F615;'],
        [/\:O/, '&#x1F62E;'],
        [/\:P/, '&#x1F61B;'],
        [/\;P/, '&#x1F61C;'],
        [/\:&#039;\(/, '&#x1F622;'],
        [/\@\@/, '&#x1F635;'],
        [/\:\*/, '&#x1F618;'],
    ];
    // Replace Emoji
    function emojiReplace(val) {
        emojiList.forEach(function (emoji) {
            val = val.replace(new RegExp(emoji[0], 'i'), emoji[1]);
        });
        return val;
    }
    // Enter Key To Submit Form
    $('.message-box textarea').keydown(function (e) {
        if (e.keyCode == '13' && !e.shiftKey) {
            $(this).parents('.message-box').submit();
            return false;
        }
    });
    // Send Message
    $('.message-box').submit(function () {
        if ($(this).children('textarea').val() !== '') {
            socket.emit('sendMessage', $(this).children('textarea').val());
            $(this).children('textarea').val('');
        }
        return false;
    });
    socket.on('sendMessage', function (msg) {
        msg = escape(msg);
        msg = emojiReplace(msg);
        $('.message-box .message-list').append($('<li>').html(msg));
        $('.message-box .message-list').scrollTop($('.message-list')[0].scrollHeight);
    });
    socket.on('showMessage', function (msg) {
        msg = escape(msg);
        msg = emojiReplace(msg);
        $('.message-box .message-list').append($('<li>').addClass('your-message').html(msg));
        $('.message-box .message-list').scrollTop($('.message-list')[0].scrollHeight);
    });
});