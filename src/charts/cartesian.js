(function(global) {

    global.viz.charts.cartesian = function(){

        function chart(selection){
            chart.stepone(selection);
        };

        chart.stepone = function(selection){
            selection.each(function(data){
                chart._draw(this,data);
            });
        };

        chart._draw = function(selection, data){
            var width = selection.clientWidth,
                height = selection.clientHeight;

            this._container = selection;

            this._svg = d3.select(selection).append("svg")
                .attr("class", this._containerClass)
                .attr("width", width)
                .attr("height", height);

             this._backgroundRect = this._svg.append("g").append("rect")
                .attr("class", this._backgroundClass)
                .attr('width', width - this._margin.left - this._margin.right)
                .attr('height', height - this._margin.top - this._margin.bottom)
                .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');

            var scope = this;
            this._displays.forEach(function(d){
                var yScale = d3.scale.linear()
                    .domain([0, d.maxValue(data)])
                    .range([height - scope._margin.top - scope._margin.bottom, 0]);

                d.draw(scope._svg, scope._margin, scope._xScale(width, data), yScale, scope._xValue, data);
            });
        };

        chart.update = function(data){
            var width = this._container.clientWidth,
                height = this._container.clientHeight;

            var scope = this;
            this._displays.forEach(function(d){
                var yScale = d3.scale.linear()
                    .domain([0, d.maxValue(data)])
                    .range([height - scope._margin.top - scope._margin.bottom, 0]);

                d.resize(scope._xScale(width, data), yScale, data);
            });
        };

        chart._xScale = function(width, data){
            var scope = this;
            return d3.scale.linear()
                .domain(scope._xDomain(data))
                .range([0, width - scope._margin.left - scope._margin.right]);
        }

        chart._displays = [];
        chart._container = null;
        chart._svg = null;
        chart._backgroundRect = null;
        chart._containerClass = global.viz.cssNamespace + "-container";
        chart._backgroundClass = global.viz.cssNamespace + "-background";
        chart._margin = {top: 10, right: 10, bottom: 10, left: 10};
        chart._xValue = function(d,i){return i;};
        chart._xDomain = function(data){return [0, data.length-1]};

        chart.addDisplay = function(s){
            this._displays.push(s);
            return this;
        };

        chart.xDomain = function(_){
            if(!!(_ && _.constructor && _.call && _.apply)){
                this._xDomain = _;
                return this;
            }

            this._xDomain = function(data){return _;};
            return this;
        };

        chart.xValue = function(_){
            this._xValue = _;
            return this;
        };

        chart.margin = function(m){
            this._margin = m;
            return this;
        };

        return chart;
    };

})(window);