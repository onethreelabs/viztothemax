(function(global) {

    global.viz.displays.circle = function(){

        var display = function(){};

        display.draw = function(svgEl, margin, xScale, yScale, xValue, data){
            _xValue = xValue;

            this._container = svgEl.append("g")
                .attr("class", this._circleContainerClass)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            this._container.selectAll("circle")
                .data(data)
                .enter()
                    .append("circle")
                    .attr("class", this._circleClass)
                    .attr("cx", this._cx(xScale))
                    .attr("cy", this._cy(yScale))
                    .attr("r", this._radius);
        };

        display.resize = function(xScale, yScale, data){
            this._container.selectAll("circle")
                .data(data)
                .attr("cx", this._cx(xScale))
                .attr("cy", this._cy(yScale));
        };

        display.maxValue = function(data){
            return d3.max(data, this._yValue);
        };

        display._cx = function(xScale){
            var scope = this;
            return function(d,i){
                return xScale(scope._xValue(d,i));
            };
        };

        display._cy = function(yScale){
            var scope = this;
            return function(d,i){
                return yScale(scope._yValue(d,i));
            };
        };

        display._container = {};
        display._radius = 3.5;
        display._yValue = function(d) {return d;};
        display._xValue = function(d,i) {return i;};
        display._circleContainerClass = viz.cssNamespace + "-circle_container";
        display._circleClass = viz.cssNamespace + "-circle";

        display.yValue = function(_){
            this._yValue = _;
            return this;
        };

        display.radius = function(r){
            this._radius = r;
            return this;
        };

        return display;
    };

}(window));