const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuItemLinks = $$('.menu-item-link');

menuItemLinks.forEach((item,index) => {
    item.onclick = function () {
        $('.menu-item-link.menu-item__active').classList.remove('menu-item__active');
        this.classList.add('menu-item__active');
    }
});

const slideFilmBtnRight = $('.film-hot-btn__right');
const slideFilmBtnLeft = $('.film-hot-btn__left');
const filmListElement = $('.film-list-hot');

const filmListHotWidth = filmListElement.offsetWidth;
var x = 0;

slideFilmBtnRight.onclick = function() {
    x = x - filmListHotWidth;
    if ( x < (-filmListHotWidth * 2)) x = 0;
    filmListElement.style.marginLeft = `${x}px`;
}
slideFilmBtnLeft.onclick = function() {
    x = x + filmListHotWidth;
    if ( x > 0) x = (-filmListHotWidth * 2);
    filmListElement.style.marginLeft = `${x}px`;
}

setInterval(function() {
    x = x - filmListHotWidth;
    if ( x < (-filmListHotWidth * 2)) x = 0;
    filmListElement.style.marginLeft = `${x}px`;
}, 5000);


const titleBoxTabs = $$('.title-box__tab');
const filmTabItems = $$('.film__tab-item');

titleBoxTabs.forEach((title,index) => {
    title.onclick = function () {
        $('.title-box__tab.title-box__tab--active').classList.remove('title-box__tab--active');
        $('.film__tab-item.db').classList.remove('db');
        this.classList.add('title-box__tab--active');
        filmTabItems[index].classList.add('db');
    }
});


const filmRightItems = $$('.film-item-right');

filmRightItems.forEach((item,index) => {
    if(index % 2 === 1) {
        item.style.backgroundColor = '#181818';
    }
});