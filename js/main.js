var $ulManga = document.querySelector('.all-manga');
var $searchInput = document.querySelector('.input');
// var $searchButton = document.querySelector('.search-button');
var clearButton = document.querySelector('.clear-search');
var $form = document.querySelector('form');
function apiList() {
  var value = $searchInput.value.toLowerCase();
  // console.log(value);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/manga?q=$' + value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (e) {
    var apiObj = xhr.response.data;
    dataLoop(apiObj);
    // var sack = document.querySelectorAll('li');
    // for (var i = 0; i < sack.length; i++) {
    //   var sackH3 = sack[i].querySelectorAll('h3')[0];
    //   var txt = sackH3.textContent;
    //   console.log(sackH3);
    //   if (txt.toLowerCase().indexOf(value) > -1) {
    //     sack[i].setAttribute('class', 'go');

    //   } else {
    //     sack[i].remove();
    //   }
    // }
    // renderTree(value, apiObj);
  });

  xhr.send();

}
// $searchInput.addEventListener('input', apiList);

$form.addEventListener('submit', function (eve) {
  eve.preventDefault();

  $searchInput.addEventListener('input', apiList);
});

function clearList(ok) {
  while ($ulManga.firstChild) {
    $ulManga.removeChild($ulManga.firstChild);
    $searchInput.value = '';
  }
}
clearButton.addEventListener('click', clearList);

// function renderTree(value, obj) {
//   for (var q = 0; q < obj.length; q++) {
//     if (value && value.trim() === obj[q].title.toLowerCase()) {
//       var $li = document.createElement('li');
//       var newTitle = document.createElement('h3');
//       newTitle.textContent = obj[q].title;
//       $li.appendChild(newTitle);
//       var newImg = document.createElement('img');
//       newImg.setAttribute('src', obj[q].images.jpg.image_url);
//       $li.prepend(newImg);
//       $ulManga.appendChild($li);
//     }
//   }
// }
function renderAll(result) {
  var $li = document.createElement('li');
  var newTitle = document.createElement('h3');
  newTitle.textContent = result.title;
  $li.appendChild(newTitle);
  var newImg = document.createElement('img');
  newImg.setAttribute('src', result.images.jpg.image_url);
  $li.prepend(newImg);
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
