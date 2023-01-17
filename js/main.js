var $ulManga = document.querySelector('.all-manga');
var $searchInput = document.querySelector('.input');
var clearButton = document.querySelector('.clear-search');

function apiList(result) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/manga?q=$' + result);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (e) {
    var dataObj = xhr.response.data;
    domReload(dataObj);
  });

  xhr.send();
}

function oneTwo(e) {
  var value = e.target.value;
  if (value.length > 0) {
    // console.log(value);
    apiList(value);
  }

}
$searchInput.addEventListener('input', oneTwo);

function renderTree(result) {
  var $li = document.createElement('li');
  $li.classList.add('start-left');
  var $img = document.createElement('img');
  $img.setAttribute('src', result.images.jpg.image_url);
  $li.prepend($img);
  var $title = document.createElement('h3');
  $title.textContent = result.title;
  $li.appendChild($title);
  $ulManga.appendChild($li);

  return $li;
}

function clearList(ok) {
  while ($ulManga.firstChild) {
    $ulManga.removeChild($ulManga.firstChild);
    $searchInput.value = '';
  }
}
clearButton.addEventListener('click', clearList);

function domReload(data) {
  for (var i = 0; i < data.length; i++) {

    var wow = data[i].title;
    if (wow) {
      renderTree(data[i]);
    } // else {

    // }

  }
  return wow;
}
document.addEventListener('DOMContentLoaded', domReload);
