const search = (ev) => {
    let searchVal = document.querySelector('input').value;
    searchVal = searchVal.replace(' ', '+')
    //let url = 'https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=track';
    let url = "https://www.apitutor.org/spotify/simple/v1/search?q=" + searchVal + "&type=track";
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    for (let each of data) {
        let song_name = each['name'];
        let artist_name = each['artist']['name'];
        let pic_url = each['album']['image_url'];
        let entry = `
        <div style="display:flex; flex-direction:row">
            <div style="padding-right: 300px;">
                <p>${artist_name}</p>
                <p>${song_name}</p>
            </div>
            <img src="${pic_url}" style="width: 300px;height:300px;"/>
        </div>
    `
        document.querySelector('#output').innerHTML += entry;
    }
};
    
document.querySelector('#search').onclick = search;