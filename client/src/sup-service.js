function sups() {
  get = function () {
    return axios.get('http://localhost:3000/sups');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/sups/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
