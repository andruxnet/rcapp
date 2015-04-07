var hackerschool = require('hackerschool-api');

var client = hackerschool.client();

// Get information about the currently authorized hackerschooler
client.people.me()
.then(function(me) {
  console.log(me);
});

// Get information about a specific hackerschooler
client.people.person(901)
.then(function(person) {
  console.log(person);
});

// Get a list of all batches
client.batches.list()
.then(function(batches) {
  console.log(batches);
});

// Get information about a specific batch
client.batches.batch(12)
.then(function(batch) {
  console.log(batch);
});

// Get a list of the hackerschoolers in a specific batch
client.batches.people(12)
.then(function(people) {
  console.log(peoeple);
});

