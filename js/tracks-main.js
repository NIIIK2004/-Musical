let trackList = document.querySelector('.tracks-main__list');
let loadMoreButton = document.getElementById('loadMoreButton');
let currentIndex = 6;

loadMoreButton.addEventListener('click', function () {
    let listItems = trackList.getElementsByClassName('tracks-main__item');
    for (let i = currentIndex; i < currentIndex + 4 && i < listItems.length; i++) {
        listItems[i].style.gridRow = 'auto';
    }

    currentIndex += 4;
    if (currentIndex >= listItems.length) {
        loadMoreButton.style.display = 'none';
    }
});