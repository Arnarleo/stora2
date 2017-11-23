'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoContent = function () {
  function VideoContent() {
    _classCallCheck(this, VideoContent);

    this.url = 'videos.json';
    this.videos = null;
    this.categories = null;
    this.message = null;
  }

  _createClass(VideoContent, [{
    key: 'showLoad',
    value: function showLoad() {
      this.message.innerHTML = 'Hleð gögnum...';
      this.message.classList.remove('hidden');
    }
  }, {
    key: 'hideLoad',
    value: function hideLoad() {
      this.message.innerHTML = null;
      this.message.classList.add('hidden');
    }
  }, {
    key: 'showError',
    value: function showError(e) {
      this.message.innerHTML = e;
      this.message.classList.remove('hidden');
    }
  }, {
    key: 'displayCategory',
    value: function displayCategory(id) {
      var h = document.createElement('h1');
      var container = document.querySelector('main');
      var s = document.createElement('section');
      h.classList.add('category__header');
      h.innerHTML = this.categories[id].title;
      var v = document.createElement('div');
      v.classList.add('videos');
      s.appendChild(h);

      for (var i = 0; i < this.categories[id].videos.length; i += 1) {
        var k = this.categories[id].videos[i] - 1;
        this.displayVideo(k, v);
      }
      s.appendChild(v);
      var cs = document.createElement('div');
      cs.classList.add('content-seperator');
      s.appendChild(cs);
      container.appendChild(s);
    }
  }, {
    key: 'displayVideo',
    value: function displayVideo(id, container) {
      var video = document.createElement('div');
      video.classList.add('video');

      var a = document.createElement('a');
      a.href = 'videopage.html?id=' + this.videos[id].id;

      var vimg = document.createElement('a');
      vimg.classList.add('video__img');

      var img = document.createElement('img');
      img.src = this.videos[id].poster;
      img.alt = this.videos[id].title;

      var vd = document.createElement('div');
      vd.classList.add('video__duration');
      vd.innerHTML = this.duration(this.videos[id].duration);
      vimg.appendChild(img);
      vimg.appendChild(vd);

      var vinfo = document.createElement('div');
      vinfo.classList.add('video__info');

      var h = document.createElement('h2');
      h.innerHTML = this.videos[id].title;

      var p = document.createElement('p');
      p.innerHTML = this.howLong(this.videos[id].created);

      vinfo.appendChild(h);
      vinfo.appendChild(p);

      a.appendChild(vimg);
      a.appendChild(vinfo);

      video.appendChild(a);

      container.appendChild(video);
    }
  }, {
    key: 'duration',
    value: function duration(x) {
      var dur = x;
      var mins = Math.floor(dur / 60);
      dur %= 60;
      var secs = Math.floor(dur);

      if (secs < 10) {
        return mins + ':0' + secs;
      }
      return mins + ':' + secs;
    }
  }, {
    key: 'howLong',
    value: function howLong(x) {
      var s = (Date.now() - x) / 1000;
      var years = Math.floor(s / (365 * 24 * 60 * 60));
      s %= 365 * 24 * 60 * 60;
      var months = Math.floor(s / (30 * 24 * 60 * 60));
      s %= 30 * 24 * 60 * 60;
      var weeks = Math.floor(s / (7 * 24 * 60 * 60));
      s %= 7 * 24 * 60 * 60;
      var days = Math.floor(s / (24 * 60 * 60));
      s %= 24 * 60 * 60;
      var hours = Math.floor(s / (60 * 60));
      s %= 60 * 60;

      if (years > 1) {
        if (this.lastDigit(years) === 1) {
          return 'Fyrir ' + years + ' \xE1ri';
        }
        return 'Fyrir ' + years + ' \xE1rum';
      }
      if (months > 1) {
        if (this.lastDigit(months) === 1) {
          return 'Fyrir ' + months + ' m\xE1nu\xF0i';
        }
        return 'Fyrir ' + months + ' m\xE1nu\xF0um';
      }
      if (weeks > 1) {
        if (this.lastDigit(weeks) === 1) {
          return 'Fyrir ' + weeks + ' viku';
        }
        return 'Fyrir ' + weeks + ' vikum';
      }
      if (days > 1) {
        if (this.lastDigit(days) === 1) {
          return 'Fyrir ' + days + ' degi';
        }
        return 'Fyrir ' + days + ' d\xF6gum';
      }
      if (this.lastDigit(hours) === 1) {
        return 'Fyrir ' + hours + ' klukkustund';
      }
      return 'Fyrir ' + hours + ' klukkustundum';
    }
  }, {
    key: 'lastDigit',
    value: function lastDigit(x) {
      var str = x.toString();
      str = str.slice(-1);
      return parseInt(str, 10);
    }
  }, {
    key: 'getJSON',
    value: function getJSON() {
      var _this = this;

      var request = new XMLHttpRequest();

      this.showLoad();
      request.open('GET', this.url, true);
      request.onload = function () {
        _this.hideLoad();
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.response);
          var _ref = [data.categories, data.videos];
          _this.categories = _ref[0];
          _this.videos = _ref[1];

          for (var i = 0; i < _this.categories.length; i += 1) {
            _this.displayCategory(i);
          }
        } else {
          _this.showError('Villa! ' + request.status);
        }
      };
      request.onerror = function () {
        _this.showError('Óþekkt villa');
      };
      try {
        request.send();
      } catch (e) {
        this.showError(e);
      }
    }
  }, {
    key: 'load',
    value: function load() {
      this.message = document.createElement('p');
      this.message.classList.add('message');
      document.querySelector('main').append(this.message);
      this.getJSON();
    }
  }]);

  return VideoContent;
}();

function onIndex() {
  return document.getElementById('myndbandaleigan') != null;
}

document.addEventListener('DOMContentLoaded', function () {
  if (onIndex()) {
    var videoContent = new VideoContent();
    videoContent.load();
  }
});

//# sourceMappingURL=script-compiled.js.map