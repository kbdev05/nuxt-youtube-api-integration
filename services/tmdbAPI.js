
import { $fetch } from 'ohmyfetch/node';
import { TMDB_API_URL, TMDB_API_PARAMS } from '~/config/tmdbAPI';
import LISTS from '~/utils/constants/lists';

function fetchTMD(url, params) {
  return $fetch(url, {
    baseURL: TMDB_API_URL,
    params: { ...TMDB_API_PARAMS, ...params }
  });
}

/**
 * Get list item
 */

function getListItem(type, query) {
  if (type === 'movie') {
    return LISTS.MOVIE.find(list => list.QUERY === query);
  } else if (type === 'tv') {
    return LISTS.TV.find(list => list.QUERY === query);
  }
}

/**
 * Get movies (listing)
 */

function getMovies(query, page = 1) {
  return fetchTMD(`movie/${query}`, { page });
}

/**
 * Get movie (single)
 */

function getMovie(id) {
  return fetchTMD(`movie/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates',
    include_image_language: 'en'
  });
}

/**
 * Get movie recommended (single)
 */

function getMovieRecommended(id, page = 1) {
  return fetchTMD(`movie/${id}/recommendations`, { page });
}

/**
 * Get TV shows (listing)
 */

function getTvShows(query, page = 1) {
  return fetchTMD(`tv/${query}`, { page });
}

/**
 * Get TV show (single)
 */

function getTvShow(id) {
  return fetchTMD(`tv/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,content_ratings',
    include_image_language: 'en'
  });
}

/**
 * Get TV show recommended (single)
 */

function getTvShowRecommended(id, page = 1) {
  return fetchTMD(`tv/${id}/recommendations`, { page });
}

/**
 * Get TV show episodes from season (single)
 */

function getTvShowEpisodes(id, season) {
  return fetchTMD(`tv/${id}/season/${season}`);
}

/**
 * Get trending
 */

function getTrending(media, page = 1) {
  return fetchTMD(`trending/${media}/week`, { page });
}

/**
 * Discover media by genre
 */

function getMediaByGenre(media, genre, page = 1) {
  return fetchTMD(`discover/${media}`, {
    with_genres: genre,
    page
  });
}

/**
* Get credits
*/

function getCredits(id, type) {
  return fetchTMD(`person/${id}/${type}`, {
    params: {
      api_key: process.env.API_KEY,
      language: process.env.API_LANG
    }
  });
}

/**
 * Get genre list
 */

function getGenreList(media) {
  return fetchTMD(`genre/${media}/list`, { language: undefined }).then(res => res.genres);
}

/**
 * Get person (single)
 */

function getPerson(id) {
  return fetchTMD(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en'
  });
}

/**
 * Search (searches movies, tv and people)
 */

function search(query, page = 1) {
  return fetchTMD('search/multi', { query, page });
}

/**
 * Get YouTube video info
 */

function getYouTubeVideo(id) {
  return $fetch('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      key: process.env.API_YOUTUBE_KEY,
      id,
      part: 'contentDetails'
    }
  });
}

export {
  getListItem,
  getMovies,
  getMovie,
  getMovieRecommended,
  getTvShows,
  getTvShow,
  getTvShowRecommended,
  getTvShowEpisodes,
  getTrending,
  getMediaByGenre,
  getCredits,
  getGenreList,
  getPerson,
  search,
  getYouTubeVideo
};
