(function(global) {

    global.viz.charts.resizableCartesian = function(){

        var chart = global.viz.charts.cartesian();

        chart.stepone = function(selection){
            selection.each(function(data){
                chart._draw(this,data);

                var scope = this;
                var resize = global.viz.utils.debounce(function(e){
                    chart._resize(scope, data);
                }, 200);
                window.addEventListener("resize", resize, false);
            });
        };

        chart._resize = function(selection, data){
            var width = selection.clientWidth,
                height = selection.clientHeight;

            this._svg.attr("width", width)
                .attr("height", height);

            this._backgroundRect
                .attr('width', width - this._margin.left - this._margin.right)
                .attr('height', height - this._margin.top - this._margin.bottom);

            var scope = this;
            this._displays.forEach(function(s){
                var yScale = d3.scale.linear()
                    .domain([0, s.maxValue(data)])
                    .range([height - scope._margin.top - scope._margin.bottom, 0]);

                s.resize(scope._xScale(width, data), yScale, data);
            });
        };

        return chart;
    };

}(window));