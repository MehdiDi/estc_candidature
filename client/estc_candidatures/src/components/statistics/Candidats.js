import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectOptions from "./SelectOptions";
import {
    Button,
    Checkbox,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon,
    Loader,
    Radio,
    Segment,
    Statistic
} from "semantic-ui-react";
import Filters from "./Filters";
import axios from "axios"
import Chart  from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels';

const column_choices = [
    {
        key: 0,
        text: 'Diplome',
        value: 'diplome'
    },
    {
        key: 1,
        text: 'Mention de BAC',
        value: 'mentionbac'
    },
    {
        key: 2,
        text: 'Type de BAC',
        value: 'typebac'
    },
    {
        key: 3,
        text: 'Ville',
        value: 'residence'
    },
    {
        key: 4,
        text: 'Promotion',
        value: 'anneecandidature'
    },
    {
        key: 5,
        text: 'Durée de formation',
        value: 'dureeformation'
    },
    {
        key: 6,
        text: 'Genre',
        value: 'genre'
    }

];
const styleStats = {
    textAlign: 'center !important',
    margin: '0 auto'
};

class Candidats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_columns: [],
            group_columns: [],
            count_column: null,
            count_enabled: false,
            typesbac: [],
            diplomes: [],
            filters: {},
            loading: false,
            kind: 'pie',
            chart: { chart: null, number: null }
        }
    }

    async componentDidMount() {
        console.log(this.props.token);
        // eslint-disable-next-line no-native-reassign
        const { data } = await axios({
            method: 'get',
            url: 'http://localhost:8000/filters',
            headers: { 'Authorization': `Token ${this.props.token}` }
        });
        this.setState({ typesbac: data.typesbac, diplomes: data.diplomes });
    }


    onToggle = (el, val) => {
        this.setState({ count_enabled: val.checked })

    };

    onOptionChange = (ev, el) => {

      this.setState({[el.name]: el.value},() => {

          if (el.name === 'selected_columns') {

              const options = el.options;
              const group_columns = this.state.group_columns;
              group_columns.length = 1;

              this.setState({[el.name]: el.value}, () => {

                  if (el.name === 'selected_columns') {


                      let opts = [
                          {
                              key: -1,
                              text: "Aucun",
                              value: "-1"
                          }
                      ];
                      if (this.state.selected_columns.indexOf(this.state.count_column) === -1) {
                          this.setState({count_column: null});
                      }


                      options.map(opt => {
                          if (this.state.selected_columns.indexOf(opt.value) > -1) {
                              opts.push(
                                  {
                                      key: opt.value,
                                      text: opt.text,
                                      value: opt.value
                                  }
                              );
                          }
                          return null;
                      });
                      this.setState({group_columns: opts});
                  }
              });

          }
      });
      };

    onFiltersChange = (e, el) => {

        let filters = Object.assign({}, this.state.filters);
        const val = el.value;

        if (val === "") {
            delete filters[el.name];
        }
        else
            filters[el.name] = val;

        this.setState({ filters: filters });

    };

    randomizeColors = (n) => {
        let colors = [];

        var letters = '0123456789ABCDEF'.split('');

        for (let i = 0; i < n; i++) {
            colors[i] = '#';
            for (let j = 0; j < 6; j++) {
                colors[i] += letters[Math.floor(Math.random() * 16)];

            }
        }
        return colors;
    };

    handleChange = (e, { value }) => this.setState({ kind: value });

    async onSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });
        const postData = {
            selected_columns: this.state.selected_columns,
            filters: this.state.filters,
            kind: this.state.kind

        };
        if (this.state.count_enabled) {
            postData['count_column'] = this.state.count_column;
        }

        const { data } = await axios({
            method: 'post',
            url: 'http://localhost:8000',
            data: postData,
            headers: { 'Authorization': `Token ${this.props.token}` }
        });
        //axios.post("http://localhost:8000", postData)
        const ctx = document.getElementById("chart").getContext('2d');


        let crt = this.state.chart;
        if (crt.chart !== null) {
            crt.chart.clear();
            crt.chart.destroy();

        }
        let chartData = {
            type: this.state.kind,
            data: {
                labels: data.labels,
                datasets: [{

                    data: data.counts,
                    backgroundColor: this.randomizeColors(data.counts.length)

                }]
            },

        };
        if (this.state.kind === 'pie')
            chartData['options'] = {
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;

                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value * 100 / sum).toFixed(2) + "%";

                            return percentage;
                        },
                        color: '#fff',
                    }

                },

            };

        else {
            chartData['options'] = {
                plugins: {
                    datalabels: {
                        formatter: {}
                    },

                }
            }
        }

        const chart = new Chart(ctx, chartData);

        chart.update();
        crt.chart = chart;
        crt.number = (function () {
            let n = 0;
            for (let i = 0; i < data.counts.length; i++)
                n += data.counts[i];
            return n;
        })();


        this.setState({ loading: false, chart: crt });

    };
    saveChart = () => {
        const canvas = document.getElementById("chart");
        const d = canvas.toDataURL("image/png");
        const w = window.open('about:blank', 'image from canvas');
        w.document.write("<img src='" + d + "' alt='from canvas'/>");
    };
    render() {

        return (
            <React.Fragment>
                <Dimmer active={this.state.loading}>
                    <Loader size='small'>
                        Chargement..
                    </Loader>
                </Dimmer>
                <Form>
                    <Grid stackable columns={2}>
                        <Grid.Column width={6}>
                            <Form.Group>
                                <SelectOptions onChange={this.onOptionChange.bind(this)}
                                    options={column_choices}
                                    placeholder="Choisir les colonnes" name="selected_columns"
                                    label="Choisir les colonnes" />
                            </Form.Group>

                            <Segment>
                                <Form.Group>
                                    <Checkbox onChange={this.onToggle.bind(this)} name="count_enabled" toggle label="Compter " />
                                </Form.Group>
                                <Form.Select disabled={!this.state.count_enabled} placeholder='Compter..' name="count_column" onChange={this.onOptionChange.bind(this)}
                                    selection options={this.state.group_columns} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Filters onChange={this.onFiltersChange.bind(this)}
                                typesbac={this.state.typesbac} diplomes={this.state.diplomes} />
                        </Grid.Column>
                    </Grid>

                    <Form.Group>
                        <Header as='h4'>Choisir type de graph</Header>
                    </Form.Group>
                    <Form.Field>
                        <Radio
                            label=''
                            name='chart_type'
                            value='pie'
                            checked={this.state.kind === 'pie'}
                            onChange={this.handleChange.bind(this)}

                        />{<Icon size='big' color='teal' name='pie chart' />}

                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label=''
                            name='chart_type'
                            value='bar'
                            checked={this.state.kind === 'bar'}
                            onChange={this.handleChange.bind(this)}

                        />{<Icon size='big' color='teal' name='bar chart' />}

                    </Form.Field>
                    <Form.Field>
                        <Button size='medium' color='teal' type='submit' onClick={this.onSubmit.bind(this)}>
                            Tracer le graph
                                </Button>
                    </Form.Field>
                </Form>
                <Button style={{ margin: '10px 0 0', width: '5%' }}
                    icon='download'
                    onClick={this.saveChart.bind(this)} />
                <Grid>
                    <Grid.Row>
                        <canvas id="chart">

                        </canvas>
                    </Grid.Row>
                    <Grid.Row textAlign='center'>

                        {this.state.chart.chart &&
                            <Statistic size='huge' style={styleStats}  >
                                <Statistic.Label >Total</Statistic.Label>
                                <Statistic.Value>{this.state.chart.number}</Statistic.Value>
                            </Statistic>
                        }

                    </Grid.Row>
                </Grid>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(Candidats);