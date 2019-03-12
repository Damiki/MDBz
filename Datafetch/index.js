const bandcamp = require('bandcamp-scraper');
const fs = require('fs');

const getAlbums = () => new Promise((resolve, reject) => {
    const params = {
        tag: "nuwrld",
        page: 1
    };

    bandcamp.getAlbumsWithTag(params, (error, tagResults) => {
        if (error) {
            reject(error);
        } else {
            resolve(tagResults);
        }
    });
});

const getAlbumInfo = album => new Promise((resolve, reject) => {
    bandcamp.getAlbumInfo(album.url, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

const getAllAlbumInfo = albums => Promise.all(albums.map(getAlbumInfo));

const run = () => {
    getAlbums()
        .then(getAllAlbumInfo)
        .then(albums => fs.writeFileSync('output.json', JSON.stringify(albums, 2)))
        .catch(console.error)
}

run();