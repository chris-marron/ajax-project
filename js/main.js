var $ulManga = document.querySelector('.all-manga');
var $searchInput = document.querySelector('.input');
// var $searchButton = document.querySelector('.search-button');
var clearButton = document.querySelector('.clear-search');
// var $form = document.querySelector('form');
function apiList(eve) {
  var value = $searchInput.value.toLowerCase();
  // console.log(value);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/manga?q=$' + value);
  xhr.responseType = 'json';
  function tryO(e) {
    if (value === '') {
      dataLoop(xhr.response.data);
      var $rli = document.querySelectorAll('.go');
      for (var i = 0; i < $rli.length; i++) {
        var ok = $rli[i].remove();
      }
      return ok;
    } else {
      search(value);
    }
  }
  xhr.addEventListener('load', tryO);

  xhr.send();

}
$searchInput.addEventListener('input', apiList);

// $form.addEventListener('submit', function (eve) {
//   eve.preventDefault();
//   console.log(eve.target);
// });

function search(value) {
  if (value === '') {
    return;
  }
  // var change = document.querySelectorAll('h3');
  var sack = document.querySelectorAll('li');
  for (var i = 0; i < sack.length; i++) {

    var sackH3 = sack[i].querySelectorAll('h3')[0];

    var txt = sackH3.textContent;
    if (txt.toLowerCase().includes(value) && value.length > 0) {
      sack[i].setAttribute('class', 'go');

    } else {
      sack[i].remove();
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

apiList();
