(function(global) {
    global.viz.displays.line = function(){

        var display = function(){};

        display.draw = function(svgEl, margin, xScale, yScale, xValue, data){
            _xValue = xValue;

            var g = svgEl.append("g")
                .attr("class", this._lineContainerClass)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            this._path = g.selectAll(this._lineClass)
                .data([data])
                .enter()
                    .append("path")
                    .attr("class", this._lineClass)
                    .attr("d", this._line(xScale, yScale));

            this.isDrawn = true;
        };

        display.resize = function(xScale, yScale, data){
            this._path
                .data([data])
                .attr("d", this._line(xScale, yScale));
        };

        display.maxValue = function(data){
            return d3.max(data, this._yValue);
        };

        display._line = function(xScale, yScale){
            var scope = this;
            return d3.svg.line()
                .x(function(d,i) {return xScale(scope._xValue(d,i));})
                .y(function(d,i) {return yScale(scope._yValue(d,i));})
        };

        display._path = {};
        display.isDrawn = false;
        display._yValue = function(d) {return d;};
        display._xValue = function(d,i) {return i;};
        display._lineContainerClass = viz.cssNamespace + "-line_container";
        display._lineClass = viz.cssNamespace + "-line";

        display.yValue = function(_){
            this._yValue = _;
            return this;
        };

        display.class = function(name){
            this._lineClass = viz.cssNamespace + "-line " + name;
            return this;
        };

        return display;
    };

}(window));