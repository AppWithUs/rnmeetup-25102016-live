const ENDPOINT = 'https://api.meetup.com/2/open_events';
const DEFAULT_PARAMS = {
    radius: 100,
    format: 'json',
    topic: 'javascript',
    page: 20,
    sign: true,
    key: '53983a4475365b5b1366476f3b4368',
};

function findMeetups (region, done) {

  let params = Object.assign({}, DEFAULT_PARAMS, {
    lat: region.latitude,
    lon: region.longitude,
  });

  let url = buildGETUrl(ENDPOINT, params);

  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    let filtered = responseJson.results.filter(m => !!m.venue);

    return done(null, filtered);
  })
  .catch(done);
}

function buildGETUrl (endpoint, params) {
  if (!params) {
    return endpoint;
  }

  let queryString = serialize(params);

  return endpoint + '?' + queryString;
}

function serialize (obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export default {
  findMeetups,
};