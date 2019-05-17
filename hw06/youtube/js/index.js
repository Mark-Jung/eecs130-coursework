const search = (ev) => {
    let searchVal = document.querySelector('input').value;
    searchVal = searchVal.replace(' ', '+')
    
    let url = "https://www.apitutor.org/youtube/simple/?q=" + searchVal  + "+&type=video";
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    for (let each of data) {
        let title = each['title'];
        let url = each['url'];
        url = url.replace('watch?v=', 'embed/')
        let entry = `
        <div style="display:flex; flex-direction:column">
            <div style="width: 350px;">
                <p style="width=100px;overflow-wrap: break-word;">${title}</p>
            </div>
            <iframe width="420" height="315"
                src="${url}">
            </iframe>
        </div>
        `
        document.querySelector('#output').innerHTML += entry;
    }
};
    
document.querySelector('#search').onclick = search;