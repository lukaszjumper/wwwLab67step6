"use strict";
// Zmiana kolorów
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let el = document.getElementById("Tecza");
let colors = ['blue', 'red', 'orange', 'green'];
function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("ok"); }, time);
    });
}
function colorChange() {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        while (true) {
            el.style.backgroundColor = colors[i];
            i = (i + 1) % colors.length;
            yield delay(1000);
        }
    });
}
colorChange();
// Wyświetlanie danych autora najnowszego commitu w repozytorium
function displayImageFromSrc(src) {
    const imgPlace = document.getElementById("zdjecie");
    imgPlace.innerHTML = '<img src="' + src + '">';
}
function displayRepos(src) {
    fetch(src)
        .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
        else {
            console.log("Błąd w fetch");
        }
    })
        .then((data) => {
        const repos = data;
        let names = new Array();
        for (let i = 0; i < data.length; i++) {
            names.push(repos[i].name.toLowerCase());
        }
        names.sort((one, two) => (one < two ? -1 : 1));
        console.log(names);
    });
}
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then((resp) => {
    if (resp.ok) {
        return resp.json();
    }
    else {
        console.log("Błąd w fetch");
    }
})
    .then((data) => {
    let commits = data;
    displayImageFromSrc(commits[0].author.avatar_url);
    displayRepos(commits[0].author.repos_url);
});
