(function(global) {

    global.viz.utils.randomInt = function(lowerBound, upperBound){
        return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
    };

    global.viz.utils.randomIntArray = function(length, lowerBound, upperBound) {
        var data =[];
        for(var i=0; i<length; i++){
            data.push(this.randomInt(lowerBound, upperBound));
        }
        return data;
    };

})(window);