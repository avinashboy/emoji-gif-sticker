const emoji = document.getElementById('emoji')
const gif = document.getElementById('gif')
const sticker = document.getElementById('sticker')
const demo = document.getElementById('demo')
const all = document.querySelectorAll('.emoji_dislay')

$("#open").click(function () {
  $(".modal").slideToggle();
})

$("#close").click(function () {
  $(".modal").slideToggle();
})

let list = []

// random id
function idnumber() {
  let r = Math.random().toString(36).substring(7);
  return r;
}

// emoji
function getData(d) {
  function em(gt) {
    return `<h2 class="text-emoji" id="${idnumber()}">${gt.emoji}</h2>`;
  }
  return document.getElementById('emoji_dislay').innerHTML = d.map(em).join('');
}

// sticker
function call_me(data) {
  function ch(ss) {
    return `<img class="img" id="${idnumber()}" src="${ss.photo}">`;
  }
  return document.getElementById('emoji_dislay').innerHTML = data.map(ch).join('');
}
//gif
function getdata(d) {
  function ch(ss) {
    return `<img class="img" id="${idnumber()}" src="${ss.media[0].tinygif.url}">`;
  }
  return document.getElementById('emoji_dislay').innerHTML = d.map(ch).join('');
}

// On load the page
$(document).ready(function () {
  $.getJSON(
    'https://raw.githubusercontent.com/avinashboy/sticker/master/emoji.json',
    function (result) {
      getData(result);
    }
  );
});
// event for gif
gif.addEventListener('click', () => {
  $('#gif').css("color", "#00bfa5")
  $('#emoji,#sticker').css("color", "#ffffff")
  let dat = new Date().getTime()
  all.innerHTML = ''
  const api =
    `https://api.tenor.com/v1/trending?platform=web&key=JJHDC7UK73EH&locale=en&anonid=MTg1OTA0NzQ3Mw&limit=50&pos=${dat}`
  $(document).ready(function () {
    $.getJSON(api, function (data) {
      getdata(data.results)
    });
  });
})
// event for emoji
emoji.addEventListener('click', () => {
  $('#emoji').css("color", "#00bfa5")
  $('#gif,#sticker').css("color", "#ffffff")
  all.innerHTML = ''
  $(document).ready(function () {
    $.getJSON(
      'https://raw.githubusercontent.com/avinashboy/sticker/master/emoji.json',
      function (result) {
        getData(result);
      }
    );
  });
})
// event for sticker
sticker.addEventListener('click', () => {
  $('#sticker').css("color", "#00bfa5")
  $('#gif,#emoji').css("color", "#ffffff")
  all.innerHTML = ''
  $(document).ready(function () {
    $.getJSON(
      'https://raw.githubusercontent.com/avinashboy/sticker/master/img.json',
      function (result) {
        call_me(result[0].data);
      }
    );
  });
})

function play(e) {
  let check = $(`#${e.target.id}`).attr('class')

  if (check === 'text-emoji') {
    let h2 = document.getElementById(e.target.id).textContent
    console.log(h2)
    if (list.indexOf(h2) == -1) {
      list.push(h2)
      const roomLink = document.createElement('h2')
      roomLink.innerText = h2
      let r = Math.random().toString(36).substring(7);
      roomLink.setAttribute("id", r)
      demo.append(roomLink)
    }
    var text = document.getElementById('name');
    text.value += h2
  }

  if (check === 'img') {
    let texts= $(`#${e.target.id}`).attr('src')
    let h1 = texts.split('/')
    let h2 = h1[2]
    if (list.indexOf(h2) == -1) {
      list.push(h2)
      const roomLink = document.createElement('h2')
      roomLink.innerText = h2
      let r = Math.random().toString(36).substring(7);
      roomLink.setAttribute("id", r)
      demo.append(roomLink)
    }
    var text = document.getElementById('name');
    text.value += h2
  }
  

}
all.forEach(data => data.addEventListener('click', play))