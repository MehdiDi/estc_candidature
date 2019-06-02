import React, {Component} from 'react';
import Chart from "chart.js";
import ReactDOM from "react-dom";

class ChartComp extends Component {
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

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.chartCanvas);
        const ctx = canvas.getContext('2d');
        console.log(this.props.data);

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
        chartData['options'] = {
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.forEach(function (data) {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    color: '#fff',
                }
            },
            legend: {display: this.props.legend}
        };

        const chart = new Chart(ctx, chartData);
        chart.update();
    }


    render() {


        return (
            <>
                <canvas ref='chartCanvas'></canvas>
            </>
        );
    };
}

export default ChartComp;