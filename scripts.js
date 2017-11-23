class VideoContent {
  constructor() {
    this.url = 'videos.json';
    this.videos = null;
    this.categories = null;
    this.message = null;
  }
  showLoad() {
     this.message.innerHTML = 'Hleð gögnum...';
     this.message.classList.remove('hidden');
   }
   hideLoad() {
     this.message.innerHTML = null;
     this.message.classList.add('hidden');
   }
   showError(e) {
     this.message.innerHTML = e;
     this.message.classList.remove('hidden');
   }

   displayCategory(id) {
     const head = document.createElement('h1');
     const container = document.querySelector('main');
     const s = document.createElement('section');
     head.classList.add('category__header');
     head.innerHTML = this.categories[id].title;
     const v = document.createElement('div');
     v.classList.add('videos');
     s.appendChild(h);

     for (let i = 0; i < this.categories[id].videos.length; i += 1) {
       const k = this.categories[id].videos[i] - 1;
       this.displayVideo(k, v);
     }
     s.appendChild(v);
     const cs = document.createElement('div');
     cs.classList.add('content-seperator');
     s.appendChild(cs);
     container.appendChild(s);
   }
   displayVideo(id, container) {
    const video = document.createElement('div');
    video.classList.add('video');

    const a = document.createElement('a');
    a.href = `videopage.html?id=${this.videos[id].id}`;

    const vimg = document.createElement('a');
    vimg.classList.add('video__img');

    const img = document.createElement('img');
    img.src = this.videos[id].poster;
    img.alt = this.videos[id].title;

    const vd = document.createElement('div');
    vd.classList.add('video__duration');
    vd.innerHTML = this.duration(this.videos[id].duration);
    vimg.appendChild(img);
    vimg.appendChild(vd);

    const vinfo = document.createElement('div');
    vinfo.classList.add('video__info');

    const h = document.createElement('h2');
    h.innerHTML = this.videos[id].title;

    const p = document.createElement('p');
    p.innerHTML = this.howLong(this.videos[id].created);

    vinfo.appendChild(h);
    vinfo.appendChild(p);

    a.appendChild(vimg);
    a.appendChild(vinfo);

    video.appendChild(a);

    container.appendChild(video);
  }
  duration(x) {
    let dur = x;
    const mins = Math.floor(dur / 60);
    dur %= 60;
    const secs = Math.floor(dur);

    if (secs < 10) {
      return `${mins}:0${secs}`;
    }
    return `${mins}:${secs}`;
  }
  howLong(x) {
    let s = (Date.now() - x) / 1000;
    const years = Math.floor(s / (365 * 24 * 60 * 60));
    s %= (365 * 24 * 60 * 60);
    const months = Math.floor(s / (30 * 24 * 60 * 60));
    s %= (30 * 24 * 60 * 60);
    const weeks = Math.floor(s / (7 * 24 * 60 * 60));
    s %= (7 * 24 * 60 * 60);
    const days = Math.floor(s / (24 * 60 * 60));
    s %= (24 * 60 * 60);
    const hours = Math.floor(s / (60 * 60));
    s %= (60 * 60);

    if (years > 1) {
      if (this.lastDigit(years) === 1) {
        return `Fyrir ${years} ári`;
      }
      return `Fyrir ${years} árum`;
    }
    if (months > 1) {
      if (this.lastDigit(months) === 1) {
        return `Fyrir ${months} mánuði`;
      }
      return `Fyrir ${months} mánuðum`;
    }
    if (weeks > 1) {
      if (this.lastDigit(weeks) === 1) {
        return `Fyrir ${weeks} viku`;
      }
      return `Fyrir ${weeks} vikum`;
    }
    if (days > 1) {
      if (this.lastDigit(days) === 1) {
        return `Fyrir ${days} degi`;
      }
      return `Fyrir ${days} dögum`;
    }
    if (this.lastDigit(hours) === 1) {
      return `Fyrir ${hours} klukkustund`;
    }
    return `Fyrir ${hours} klukkustundum`;
  }

  lastDigit(x) {
    let str = x.toString();
    str = str.slice(-1);
    return parseInt(str, 10);
  }

  getJSON() {
    const request = new XMLHttpRequest();

    this.showLoad();
    request.open('GET', this.url, true);
    request.onload = () => {
      this.hideLoad();
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.response);
        [this.categories, this.videos] = [data.categories, data.videos];
        for (let i = 0; i < this.categories.length; i += 1) {
          this.displayCategory(i);
        }
      } else {
        this.showError(`Villa! ${request.status}`);
      }
    };
    request.onerror = () => {
      this.showError('Óþekkt villa');
    };
    try {
      request.send();
    } catch (e) {
      this.showError(e);
    }
  }

  load() {
    this.message = document.createElement('p');
    this.message.classList.add('message');
    document.querySelector('main').append(this.message);
    this.getJSON();
  }
}

function onIndex() {
  return document.getElementById('myndbandaleigan') != null;
}

document.addEventListener('DOMContentLoaded', () => {
  if (onIndex()) {
    const videoContent = new VideoContent();
    videoContent.load();
  }
});
