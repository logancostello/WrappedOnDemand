import allGenres from "../../../../genres.json"

// Gets the top N genres for the user, based on the artists given
export function getUsersTopNGenreCounts(maxGenres, artists) {
    const artistGenres = artists.map((a) => a.genres);
    const genres = artistGenres.flat();
    const genreFrequencies = genres.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1; 
        return acc;
      }, {});
    const genresFrequenciesSorted = Object.entries(genreFrequencies).sort((a, b) => b[1] - a[1]);
    const slicedGenres = genresFrequenciesSorted.slice(0, maxGenres);
    const genresAlphabeticalOrder = slicedGenres.sort((a, b) => {
        if (a[0] < b[0]) return -1; 
        if (a[0] > b[0]) return 1;
        return 0;
    });
    return genresAlphabeticalOrder;
};

// Gets the % for the all general genres (see genres.json), based on the artists given
export function getUsersGeneralGenrePercentage(artists) {
    const genres = ["Pop", "Electronic", "Hip-Hop", "R&B", "Latin", "Rock", "Metal",
        "Country", "Folk", "Classical", "Jazz", "Blues", "Easy-Listening", "New-Age", "World"]

    function numArtistsInThisGenre(artists, genre) {

        function isArtistInThisGenre(artist, genre) {
            const artistGenres = artist.genres
            const subgenres = allGenres[genre]

            // If any of the artist's genres are included in the target genre, then the artist has that genre
            return artistGenres.some(artistGenre => subgenres.includes(artistGenre))
        }

        return artists.filter(artist => isArtistInThisGenre(artist, genre)).length;
    }

    const artistCounts = genres.map((genre) => [genre, numArtistsInThisGenre(artists, genre)]);
    const total = artistCounts.map(artistCount => artistCount[1]).reduce((acc, val) => acc + val, 0);
    return artistCounts.map(artistCount => [artistCount[0], ((artistCount[1] / total) * 100).toFixed(1)]);
}