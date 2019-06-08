import React, {Component} from 'react';
import Chart from "chart.js";
import ReactDOM from "react-dom";

class ChartComp extends Component {
    state = {
        chart: null
    };
    randomizeColors = (n) =>{
        let colors = [];
        const letters = '0123456789ABCDEF'.split('');
        for(let i = 0; i< n; i++) {
            colors[i] = '#';
            for (let j = 0; j < 6; j++ ) {
                colors[i] += letters[Math.floor(Math.random() * 16)];
            }
        }
        return colors;
    };
    getChart() {
        const canvas = ReactDOM.findDOMNode(this.refs.chartCanvas);
        const ctx = canvas.getContext('2d');
        const kind = this.props.kind;

        const chartData = {
        type: this.props.kind,
        data: {
            labels: this.props.data.labels,
            datasets: [{
                data: this.props.data.data,
                backgroundColor: (this.props.randomize ? this.randomizeColors(this.props.data.data.length):
                        ['#f1c40f', '#16a085', '#e74c3c', '#2ecc71', '#9980FA', '#D980FA', '#833471', '#ED4C67'])
            }]
        },

    };
        Chart.defaults.global.defaultFontSize = 16;

        chartData['options'] = {
            plugins: {
             p1: !this.props.hideLabel
            },
            legend: {display: this.props.legend}
        };

        const data = this.props.data.data;
        Chart.plugins.clear();


        Chart.plugins.register({
            id: 'p1',
  afterDatasetsDraw: function(chartInstance, easing) {

    var ctx = chartInstance.chart.ctx;
    chartInstance.data.datasets.forEach(function(dataset, i) {
      var meta = chartInstance.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {

          ctx.fillStyle = kind === 'pie'? '#f1f1f1' : 'black';
          const fontSize = 16;
          const fontStyle = 'bold';
          const fontFamily = 'Lato';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          let dataString;
          if(kind === 'pie') {
            let total = 0;
            data.forEach(el => total += el);

            const val = (dataset.data[index] / total) * 100;
            dataString = val.toFixed().toString() + '%';

          }
          else {
              dataString = dataset.data[index].toString();
          }
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const padding = 5;
          const position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
});
        const chart = new Chart(ctx, chartData);

        chart.update();

        return chart;
    }
    componentDidMount() {
        const chart = this.getChart();

        this.setState({chart})
    }

    updateChart = () => {

        let chart = this.state.chart;
        chart.clear();
        chart.destroy();

        chart = this.getChart();

        this.setState({chart});
    };

    render() {

        return (
            <>
                <canvas ref='chartCanvas'></canvas>
            </>
        );
    };
}

export default ChartComp;