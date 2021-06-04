var api = require('./src/api.js').app;
const fs = require('fs');
const supsFilepath = './src/suplimente.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/sups', function (request, response) {
  response.json(getSups());
});

api.get('/sups/:id', function (request, response) {
  let sup = getSupById(request.params.id);
  if (sup)
    response.json(sup);

  response.json('not found');
});

api.put('/sups', function (request, response) {
  saveSup(request.body);

  response.json('Saved succesfully');
});

api.post('/sups', function (request, response) {

  let sup = request.body;
  let sups = getSups();

  for(let i=0; i < sups.length; i++) {
    if (sups[i].id === sup.id) {
      sups[i] = sup;
    }
  }

  try {
    fs.writeFileSync(supsFilepath, JSON.stringify(sups));
  } catch (err) {
    console.error(err)
  }

  response.json(' Updated succesfully');
});

api.delete('/sups/:index', function (request, response) {

    let sups = getSups();

    sups.splice(findIdInArray(request.params.index),1);

    try {
            fs.writeFileSync(supsFilepath, JSON.stringify(sups));
        } catch (err) {
            console.error(err)
        }

    response.json('Item with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getSups() {
  let sups = [];
  try {
    sups = JSON.parse(fs.readFileSync(supsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return sups;
}

function saveSup(sup) {
  let sups = getSups();
  let maxId = getMaxId(sups);
  console.log(sup);
  sup.id = maxId+1;
  sups.push(sup);
  try {
    fs.writeFileSync(supsFilepath, JSON.stringify(sups));
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(sups) {
  let max = 0;
  for (var i=0; i<sups.length;i++) {
    if(max < sups[i].id) {
      max = sups[i].id;
    }
  }
  return max;
}

function getSupById(id){
  let sups = getSups();
  let selectedSup = null;
  for(var i=0; i<sups.length; i++) {
    if(id == sups[i].id)
        selectedSup = sups[i];
  }
      return selectedSup;
}

function findIdInArray(id){
    let sups = getSups();
    for(var i=0; i<sups.length; i++) {
        if(id == sups[i].id)
            return i;
      }
    return -1;
}