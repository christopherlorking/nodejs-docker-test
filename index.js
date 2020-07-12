const express = require('express');
const redis = require('redis');

// lib.js holds single basic math function
const lib = require('./lib'); 

const app = express();
const port = 8080

// Connect to Redis server created in docker-compose.yml via default port
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

// Confirm Redis connection working
client.on('connect', function() {
  console.log('Redis client connected');
});

// Initialise visits key to 0 in Redis if null
client.get('visits', (err, visits) => {
  console.log('Website visits is currently: ' + visits)
    if (visits == null){
      console.log('Visits key not found (value is null) - creating and setting value to 0')
      client.set('visits', 0);
    } else {
      console.log('Visits key has a value other than null - no need to reset to 0')
  }
});

//
// ROUTES
//

// Default: Get current visits and increment the number by 1
app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

// Get current visits and increment the number by 1
app.route('/visits').get(function(req, res) {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

// Same as above but shorter form
app.get('/visits2', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

// Test for calling a simple function from another .js file
app.route('/ispositive').get(function(req, res) {
  res.write('Is 3 positive??   ' + lib.isPositive(3) + '\n\n')
  res.write('Is -7 positive??   ' + lib.isPositive(-7) + '\n\n')
  res.write('Is 0 positive??   ' + lib.isPositive(0) + '\n\n')
  res.send()
});


//
// END
//

app.listen(port, () => {
console.log('Listening on port ' + port);
});