(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('./iframe-load');

module.exports = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector('iframe');
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load('../' + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
              textNodes.push(node);
              console.log(node);
            } else {
              recursy(node);
            }
          });
        }

        ;
        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement('text-editor');

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = true;
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

/*eslint-disable */
HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require('./editor.js');

window.editor = new Editor();

window.onload = function () {
  editor.open('index.html');
}; // const Vue = require('vue');
// const axios = require('axios');
// new Vue({
//     el: '#app',
//     data: {
//         'pageList': [],
//         'newPageName': '',
//     },
//     methods: {
//         deletePage(page) {
//             console.log(page);
//             axios
//                 .post('./api/delete_html_page.php', {
//                     'name': page
//                 })
//                 .then( () => this.updatePageList() )
//         },
//         createPage() {
//             axios
//                 .post('./api/create_new_html_page.php', {
//                     'name': this.newPageName
//                 })
//                 .then((response) => {
//                     console.log(response)
//                     this.updatePageList();
//                 })
//         },
//         updatePageList() {
//             axios
//                 .get('./api/')
//                 .then((response) => {
//                     this.pageList = response.data
//                 })
//         }
//     },
//     created() {
//         this.updatePageList();
//     },
// });
// const $ = require('jquery');
// function get_pahes_list() {
//     $('h1').remove();
//     $.get('./api', (data) => {
//         console.log(data);
//         data.forEach( function(element, index) {
//             $('body').append(`<h1>${element}</h1>`);
//         });
//     }, 'JSON');
// };
// get_pahes_list();
// $('.btn-create').on('click', () => {
//     $.post('./api/create_new_html_page.php', {
//         'name': $('.input-create').val()
//     }, (data) => {
//         get_pahes_list();
//     })
//     .fail(() => {
//         alert('Такая страница уже есть!');
//     });
// });
// $('.btn-delete').on('click', () => {
//     $.post('./api/delete_html_page.php', {
//         'name': $('.input-delete').val()
//     }, (data) => {
//         console.log(data);
//         get_pahes_list();
//     })
//     .fail(() => {
//         alert('Такой страницы нет!');
//     });
// });

},{"./editor.js":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBRUEsTUFBTSxDQUFDLE9BQVA7QUFDSSxvQkFBYztBQUFBOztBQUNWLFNBQUssTUFBTCxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7QUFDSDs7QUFITDtBQUFBO0FBQUEseUJBS1MsSUFMVCxFQUtlO0FBQUE7O0FBQ1AsV0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixRQUFRLElBQXpCLEVBQStCLFlBQU07QUFDakMsWUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQUwsQ0FBWSxlQUFaLENBQTRCLElBQXpDO0FBRUEsWUFBSSxTQUFTLEdBQUcsRUFBaEI7O0FBRUEsaUJBQVMsT0FBVCxDQUFpQixPQUFqQixFQUEwQjtBQUN0QixVQUFBLE9BQU8sQ0FBQyxVQUFSLENBQW1CLE9BQW5CLENBQTJCLFVBQUMsSUFBRCxFQUFVO0FBRWpDLGdCQUFJLElBQUksQ0FBQyxRQUFMLEtBQWtCLE9BQWxCLElBQTZCLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUF1QixNQUF2QixFQUErQixFQUEvQixFQUFtQyxNQUFuQyxHQUE0QyxDQUE3RSxFQUFnRjtBQUM1RSxjQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWUsSUFBZjtBQUNBLGNBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsY0FBQSxPQUFPLENBQUMsSUFBRCxDQUFQO0FBQ0g7QUFDSixXQVJEO0FBU0g7O0FBQUE7QUFDRCxRQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFFQSxRQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFVBQUMsSUFBRCxFQUFVO0FBQ3hC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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwicmVxdWlyZSgnLi9pZnJhbWUtbG9hZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLmlmcmFtZS5sb2FkKCcuLi8nICsgcGFnZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dE5vZGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZWN1cnN5KGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnI3RleHQnICYmIG5vZGUubm9kZVZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3Vyc3kobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlY3Vyc3koYm9keSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0LWVkaXRvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCIvKmVzbGludC1kaXNhYmxlICovXHJcbkhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGlmcmFtZSA9IHRoaXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB1cmwgKyBcIj9ybmQ9XCIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF4VGltZSA9IDYwMDAwO1xyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAyMDA7XHJcblxyXG4gICAgbGV0IHRpbWVyQ291bnQgPSAwO1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaWZyYW1lKSByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXJDb3VudCAqIGludGVydmFsID4gbWF4VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbnRlcnZhbCk7XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgRWRpdG9yID0gcmVxdWlyZSgnLi9lZGl0b3IuanMnKTtcclxuXHJcbndpbmRvdy5lZGl0b3IgPSBuZXcgRWRpdG9yKCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgZWRpdG9yLm9wZW4oJ2luZGV4Lmh0bWwnKTtcclxufTtcclxuXHJcblxyXG4vLyBjb25zdCBWdWUgPSByZXF1aXJlKCd2dWUnKTtcclxuLy8gY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xyXG5cclxuLy8gbmV3IFZ1ZSh7XHJcbi8vICAgICBlbDogJyNhcHAnLFxyXG4vLyAgICAgZGF0YToge1xyXG4vLyAgICAgICAgICdwYWdlTGlzdCc6IFtdLFxyXG4vLyAgICAgICAgICduZXdQYWdlTmFtZSc6ICcnLFxyXG4vLyAgICAgfSxcclxuLy8gICAgIG1ldGhvZHM6IHtcclxuLy8gICAgICAgICBkZWxldGVQYWdlKHBhZ2UpIHtcclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocGFnZSk7XHJcbi8vICAgICAgICAgICAgIGF4aW9zXHJcbi8vICAgICAgICAgICAgICAgICAucG9zdCgnLi9hcGkvZGVsZXRlX2h0bWxfcGFnZS5waHAnLCB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiBwYWdlXHJcbi8vICAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4oICgpID0+IHRoaXMudXBkYXRlUGFnZUxpc3QoKSApXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBjcmVhdGVQYWdlKCkge1xyXG4vLyAgICAgICAgICAgICBheGlvc1xyXG4vLyAgICAgICAgICAgICAgICAgLnBvc3QoJy4vYXBpL2NyZWF0ZV9uZXdfaHRtbF9wYWdlLnBocCcsIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAnbmFtZSc6IHRoaXMubmV3UGFnZU5hbWVcclxuLy8gICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaXN0KCk7XHJcbi8vICAgICAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgdXBkYXRlUGFnZUxpc3QoKSB7XHJcbi8vICAgICAgICAgICAgIGF4aW9zXHJcbi8vICAgICAgICAgICAgICAgICAuZ2V0KCcuL2FwaS8nKVxyXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlTGlzdCA9IHJlc3BvbnNlLmRhdGFcclxuLy8gICAgICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSxcclxuLy8gICAgIGNyZWF0ZWQoKSB7XHJcbi8vICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlzdCgpO1xyXG4vLyAgICAgfSxcclxuLy8gfSk7XHJcblxyXG4vLyBjb25zdCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG4vLyBmdW5jdGlvbiBnZXRfcGFoZXNfbGlzdCgpIHtcclxuLy8gICAgICQoJ2gxJykucmVtb3ZlKCk7XHJcblxyXG4vLyAgICAgJC5nZXQoJy4vYXBpJywgKGRhdGEpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuLy8gICAgICAgICBkYXRhLmZvckVhY2goIGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XHJcbi8vICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYDxoMT4ke2VsZW1lbnR9PC9oMT5gKTtcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH0sICdKU09OJyk7XHJcbi8vIH07XHJcblxyXG4vLyBnZXRfcGFoZXNfbGlzdCgpO1xyXG5cclxuLy8gJCgnLmJ0bi1jcmVhdGUnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbi8vICAgICAkLnBvc3QoJy4vYXBpL2NyZWF0ZV9uZXdfaHRtbF9wYWdlLnBocCcsIHtcclxuLy8gICAgICAgICAnbmFtZSc6ICQoJy5pbnB1dC1jcmVhdGUnKS52YWwoKVxyXG4vLyAgICAgfSwgKGRhdGEpID0+IHtcclxuLy8gICAgICAgICBnZXRfcGFoZXNfbGlzdCgpO1xyXG4vLyAgICAgfSlcclxuLy8gICAgIC5mYWlsKCgpID0+IHtcclxuLy8gICAgICAgICBhbGVydCgn0KLQsNC60LDRjyDRgdGC0YDQsNC90LjRhtCwINGD0LbQtSDQtdGB0YLRjCEnKTtcclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuXHJcbi8vICQoJy5idG4tZGVsZXRlJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgICAgJC5wb3N0KCcuL2FwaS9kZWxldGVfaHRtbF9wYWdlLnBocCcsIHtcclxuLy8gICAgICAgICAnbmFtZSc6ICQoJy5pbnB1dC1kZWxldGUnKS52YWwoKVxyXG4vLyAgICAgfSwgKGRhdGEpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuLy8gICAgICAgICBnZXRfcGFoZXNfbGlzdCgpO1xyXG4vLyAgICAgfSlcclxuLy8gICAgIC5mYWlsKCgpID0+IHtcclxuLy8gICAgICAgICBhbGVydCgn0KLQsNC60L7QuSDRgdGC0YDQsNC90LjRhtGLINC90LXRgiEnKTtcclxuLy8gICAgIH0pO1xyXG4vLyB9KTtcclxuIl19
