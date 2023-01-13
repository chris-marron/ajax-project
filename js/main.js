// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.jikan.moe/v4/top/manga');
// xhr.responseType = 'json';
// xhr.send();
// var mangaInfo = xhr.response;
// console.log(xhr);

var $ulManga = document.querySelector('.all-manga');
var $searchInput = document.querySelector('.input');
var clearButton = document.querySelector('.clear-search');
// var test = document.querySelector('.result-item');
var list = document.querySelector('#list');
// var $form = document.querySelector('.form');
// var $title = document.querySelector('.title-get');
var possibly = [];

$searchInput.addEventListener('input', function (e) {
  var value = e.target.value.toLowerCase();
  var filteredCharacters = possibly.filter(manga => {
    return (
      manga.title.toLowerCase().includes(value)
    );
  });
  // console.log(filteredCharacters);
  displayManga(filteredCharacters);
});
function clearList(ok) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
    $searchInput.value = '';
  }
}
clearButton.addEventListener('click', clearList);
function renderList(result) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/manga?q=' + result + '&limit5');
  xhr.responseType = 'json';
  function mouse(e) {
    var dataObj = xhr.response.data;
    possibly = dataObj;
    displayManga(dataObj);
  }
  xhr.addEventListener('load', mouse);

  xhr.send();
}

function displayManga(manga) {
  for (var i = 0; i < manga.length; i++) {
    var resultItem = document.createElement('li');
    var animePic = document.createElement('img');
    var title = document.createElement('h3');
    resultItem.classList.add('result-item');
    title.classList.add('title-get');
    title.textContent = manga[i].title;
    animePic.src = manga[i].images.jpg.image_url;
    resultItem.prepend(title);
    resultItem.appendChild(animePic);
    $ulManga.appendChild(resultItem);
  }
  return $ulManga;

}
renderList();
