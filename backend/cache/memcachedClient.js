const Memcached = require("memcached");
const memcached = new Memcached("172.27.84.35:11211");

module.exports = memcached;
