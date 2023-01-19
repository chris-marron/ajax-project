var $ulManga = document.querySelector('.all-manga');
var $searchInput = document.querySelector('.input');
var clearButton = document.querySelector('.clear-search');
function apiList(eve) {
  var value = $searchInput.value.toLowerCase();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/manga?q=$' + value);
  xhr.responseType = 'json';
  function tryO(e) {
    if (value === '') {
      dataLoop(xhr.response.data);
      var $rli = document.querySelectorAll('li');

      for (var i = 0; i < $rli.length; i++) {
        $rli[i].addEventListener('click', function (e) {
          // console.log(e.target);
          renderMangaInfo();
        });
        if (!$rli[i].matches('.active')) {
          $rli[i].remove();
        }
      }

    } else {
      search(value);
    }
  }
  xhr.addEventListener('load', tryO);

  xhr.send();

}
$searchInput.addEventListener('input', apiList);

function search(value) {
  if (value === '') {
    return;
  }
  var sack = document.querySelectorAll('li');
  for (var i = 0; i < sack.length; i++) {

    var sackH3 = sack[i].querySelectorAll('h3')[0];

    var txt = sackH3.textContent;
    if (txt.toLowerCase().includes(value) && value.length > 0) {
      sack[i].setAttribute('class', 'go');

    } else {
      sack[i].setAttribute('class', 'hidden');
    }
  }
  for (var j = 0; j < data.length; j++) {
    var wow = renderAll(data[j]);
  }
  return wow;

}

function clearList(ok) {
  while ($ulManga.firstChild) {
    $ulManga.removeChild($ulManga.firstChild);
    $searchInput.value = '';
  }
}
clearButton.addEventListener('click', clearList);

function renderAll(result) {
  var $li = document.createElement('li');
  var newImg = document.createElement('img');
  var newTitle = document.createElement('h3');
  newTitle.textContent = result.title;
  $li.classList.add('active');
  newImg.setAttribute('src', result.images.jpg.image_url);
  $li.prepend(newImg);
  $li.appendChild(newTitle);
  $ulManga.appendChild($li);

  return $ulManga;
}
function dataLoop(data) {
  for (var i = 0; i < data.length; i++) {
    var wow = renderAll(data[i]);
  }
  return wow;
}
var $divPic = document.querySelector('.info-view');
function renderMangaInfo(domTree) {
  var divCol = document.createElement('div');
  divCol.classList.add('column-half');
  var divCol2 = document.createElement('div');
  divCol2.classList.add('column-half');
  var imgCre = document.createElement('img');
  var title = document.createElement('h2');
  // var genres = document.createElement('h4');
  var score = document.createElement('h4');
  var published = document.createElement('h4');
  var chapters = document.createElement('h4');
  var $syn = document.createElement('h4');
  // var $syntxt = document.createElement('span');
  imgCre.setAttribute('src', domTree.images.jpg.image_url);
  imgCre.classList.add('info-img');
  title.textContent = domTree.title;
  title.classList.add('info-h2');
  score.textContent = `MAL score: ${domTree.score}`;
  score.classList.add('info-h4');
  published.textContent = `Published: ${domTree.published.string}`;
  published.classList.add('info-h4');
  chapters.textContent = domTree.chapters;
  chapters.classList.add('info-h4');
  $syn.textContent = `Synopsis: ${domTree.synopsis}`;
  divCol.prepend(imgCre);
  divCol.append(title, score, published, chapters);
  divCol2.prepend($syn);
  $divPic.prepend(divCol);
  $divPic.append(divCol2);
  return $divPic;
}
var $viewList = document.querySelectorAll('[data-view]');
function viewSwap(view) {
  for (var i = 0; i < $viewList.length; i++) {
    var viewList = $viewList[i].getAttribute('data-view');
    if (viewList === view) {
      viewList.clasName = 'on';
    } else {
      viewList.clasName = 'hidden';
    }
  }
}
viewSwap();
apiList();
