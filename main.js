// Zmiana kolorów
var el = document.getElementById("Tecza");
var colors = ['blue', 'red', 'orange', 'green'];
function delay(x, i) {
    el.style.backgroundColor = colors[i];
    setTimeout(function () { return delay(x, (i + 1) % colors.length); }, x);
}
delay(1000, 0);
// Wyświetlanie danych autora najnowszego commitu w repozytorium
function displayImageFromSrc(src) {
    var imgPlace = document.getElementById("zdjecie");
    imgPlace.innerHTML = '<img src="' + src + '">';
}
function displayRepos(src) {
    fetch(src)
        .then(function (resp) {
        if (resp.ok) {
            return resp.json();
        }
        else {
            console.log("Błąd w fetch");
        }
    })
        .then(function (data) {
        var repos = data;
        var names = new Array();
        for (var i = 0; i < data.length; i++) {
            names.push(repos[i].name.toLowerCase());
        }
        names.sort(function (one, two) { return (one < two ? -1 : 1); });
        console.log(names);
    });
}
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then(function (resp) {
    if (resp.ok) {
        return resp.json();
    }
    else {
        console.log("Błąd w fetch");
    }
})
    .then(function (data) {
    var commits = data;
    displayImageFromSrc(commits[0].author.avatar_url);
    displayRepos(commits[0].author.repos_url);
});
