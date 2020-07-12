# nodejs-docker-test

#### Overview
   - [Express](https://expressjs.com/) app running in [Node.js](https://nodejs.org/) container serves index.js
   - Default route increments a key 'visits' in Redis
   - Maps cd to \usr\app excluding node_modules, so can edit files and rebuild

#### Use
Clone repo to $PWD
```bash
$ docker-compose up
```
Output will appear from both Redis (redis-server) and Node.js (node-app).
Listens on port 10000.

### To do
  - Consider setting port from environmental ariable
  - Expand message/text on default route '/'