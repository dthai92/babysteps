
  angular
    .module('baby.visual')
    .directive('linearChart', linearChart);

    function linearChart($window) {
      return {
        restrict: 'EA',
        template: "<svg width='700' height='200'></svg>",
        scope: {},
        controller: 'VisualCtrl',
        controllerAs: 'vm',
        bindToController: {
          salesDataToPlot: '='
        },
        link: function(scope, elem, attrs, controller){
          console.log('Link Running!');
          console.log('this is scope', scope);
          console.log('this is controller', controller);
           // var salesDataToPlot=scope[attrs.chartData];
           var salesDataToPlot = controller.salesData;;
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           console.log($window);
           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           function setChartParameters(){
                console.log('setChartParameters running!');
                console.log(salesDataToPlot)
               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(salesDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }

         function drawLineChart() {
              console.log('drawLineChart running!');

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
        }

           drawLineChart();
       }
      }


    }

linearChart();

