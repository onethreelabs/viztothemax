(function(global) {
    var viz = {
        VERSION: '0.0.1',
        cssNamespace: 'viz',
        displays: {},
        axis: {},
        utils: {},
        models: {},
        charts: {}
    };

    // attach viz to the global space
    if (global.viz) {
        throw new Error('viz has already been defined');
    } else {
        global.viz = viz;
    }
})(window);