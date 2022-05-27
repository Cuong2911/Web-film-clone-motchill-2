
const urlNameFilm = 'https://gist.githubusercontent.com/shaikh-shahid/f29703bf7e7dc37183d5/raw/fa7666e873476c024a1851346f7ccfeb73a7cb79/movieName';
const nameFilms = [];

fetch(urlNameFilm)
  .then(response => response.json())
  .then(data => {
    const newArr = data.map(item => {
        return item.name;
    })
    nameFilms.push(...newArr);

    searchHandle();
  });

const searchHandle = () => {
    const searchInput = $('.nav-search-input input');
    searchInput.onkeyup = function(event) {
        const inputValue = event.target.value;
        $('.search-result-item__key').innerText = `"${inputValue}"`

        const resultSearchs = nameFilms.filter(nameFilm => {
            const name = nameFilm.toLowerCase();
            return name.includes(inputValue.toLowerCase());
        }).slice(0, 5);
        
        var resultHtml = resultSearchs.map(result => {
            return `
            <li class="search-result-item film-result">
                <a href="https://www.google.com/search?q=${result}" class="film-result-link">
                    <h1>${result}</h1>
                    <span>${result}(2019)</span>
                </a>
            </li>
            `
        }).join('');
        if(inputValue === '') {
            resultHtml = ''
        }
        $('.film-result-item__js').innerHTML = resultHtml;
        $('.search-result-last__js').innerHTML = `<a href="https://www.google.com/search?q=${inputValue}">Tìm tất cả kết quả từ khoá</a>`;

    };
};

$('.nav-search-input input').onfocus = function() {
    $('#search-result').classList.add('db');
}
$('.nav-search-input input').onblur = function() {
    setTimeout(function () {
        $('#search-result').classList.remove('db');
    }, 150)
}