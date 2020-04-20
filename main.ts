// Zmiana kolorów

let el = document.getElementById("Tecza");

let colors: string[] = ['blue', 'red', 'orange', 'green'];

function delay(time : number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve("ok")}, time);
    });
}

async function colorChange() {
    let i = 0;
    while (true) {
       el.style.backgroundColor = colors[i];
       i = (i+1) % colors.length;
       await delay(1000);
    }
}

colorChange();

// Wyświetlanie danych autora najnowszego commitu w repozytorium

function displayImageFromSrc(src : string) {
    const imgPlace = document.getElementById("zdjecie");
    imgPlace.innerHTML = '<img src="' + src + '">';
}

function displayRepos(src : string) {
    fetch(src)
    .then((resp) => {
        if(resp.ok) {
           return resp.json();
        }
        else {
            console.log("Błąd w fetch");
        }
    })
    .then((data) => {
        const repos = data as JSON;
        let names = new Array<string>();
        for (let i=0; i<data.length; i++) {
            names.push(repos[i].name.toLowerCase());
        }
        names.sort((one, two) => (one < two ? -1 : 1));
        console.log(names);
    });
}

fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
.then((resp) => {
    if(resp.ok) {
       return resp.json();
    }
    else {
        console.log("Błąd w fetch");
    }
})
.then((data) => {
    let commits = data as JSON;
    displayImageFromSrc(commits[0].author.avatar_url);
    displayRepos(commits[0].author.repos_url)
});

