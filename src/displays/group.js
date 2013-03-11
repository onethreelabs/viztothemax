(function(global) {

    global.viz.displays.group = function(displays){

        var display = function(){};

        display.draw = function(svgEl, margin, xScale, yScale, xValue, data){
            this._svg = svgEl;
            this._margin = margin;
            this._xValue = xValue;
            var i=0;
            this._displays.forEach(function(d){
                d.draw(svgEl, margin, xScale, yScale, xValue, data[i]);
                i++;
            });
        };

        display.resize = function(xScale, yScale, data){
            var scope = this;
            var i = 0;
            this._displays.forEach(function(d){
                if(d.isDrawn){
                    d.resize(xScale, yScale, data[i]);
                }else{
                    d.draw(scope._svg, scope._margin, xScale, yScale, scope._xValue, data[i]);
                }
                i++;
            });
        };

        display.maxValue = function(data){
            var maxes = [];
            var i = 0;
            this._displays.forEach(function(d){
                maxes.push(d.maxValue(data[i]));
                i++;
            });
            return d3.max(maxes);
        };

        display.addDisplay = function(display){
            this._displays.push(display);
            return this;
        };

        display._displays = displays;
        display._svg = {};
        display._margin = {};
        display._xValue = {};

        return display;
    };

}(window));