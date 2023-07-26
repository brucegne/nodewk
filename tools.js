const path = require('path');

module.exports = function() { 
    this.sum = function(a,b) { return a+b };
    this.multiply = function(a,b) { return a*b };
    this.nothing = function(nPath) {
        return ( path.join(__dirname, nPath));
    }
}
