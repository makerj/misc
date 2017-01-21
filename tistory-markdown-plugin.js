// Tistory Markdown Plugin by makerj(ohenwkgdj@gmail.com)
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    console.log('Tistory Markdown Plugin by makerj(ohenwkgdj@gmail.com)');
    var CONTAINER_SELECTOR = "";
    var CONTENTS_SELECTOR = "";

    function _find_container() {
        var tryAt = ['div.tt_article_useless_p_margin', 'div.area_view', 'div.article'];
        var elem = null;
        for (var i = 0; i < tryAt.length; ++i) {
            elem = document.querySelector(tryAt[i]);
            if (elem) break;
        }
        return elem;
    }

    function _find_contents() {
        var tryAt = ['div.tt_article_useless_p_margin > p', 'div.area_view > p', 'div.article > p'];
        var elem = null;
        for (var i = 0; i < tryAt.length; ++i) {
            elem = document.querySelectorAll(tryAt[i]);
            if (elem) break;
        }
        return elem;
    }

    // Extract markdown lines
    var container = CONTAINER_SELECTOR ? document.querySelector(CONTAINER_SELECTOR) : _find_container();
    var contents = CONTENTS_SELECTOR ? document.querySelectorAll(CONTENTS_SELECTOR) : _find_contents();
    contents = Array.from(contents);
    var firstline = contents[0].innerText.trim();
    if (firstline != '@markdown' && firstline != '@마크다운') {
        console.log("Contents must be starts with '@markdown' or '@마크다운' but was '" + firstline + "'");
        console.log("Skip converting");
        return;
    }
    container.removeChild(contents.shift())

    // Preprocess extracted lines
    var lines = [];
    contents.forEach(function(e) {
        if (e.children && e.children.length) lines.push(e.innerText + '\n');
        else if (e.innerText == '_') lines.push('<br>\n');
        else lines.push(e.innerText + '\n\n');
        container.removeChild(e);
    });
    lines = lines.join('');

    // Convert markdown to html
    var converter = new showdown.Converter();
    var doc = converter.makeHtml(lines);

    // Render converted html
    console.log(lines);
    console.log(doc);
    container.innerHTML = doc + container.innerHTML;
});
