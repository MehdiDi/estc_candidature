import React, {Component} from 'react';
import SelectOptions from "./SelectOptions";
import {Button, Dimmer, Form, Grid, Header, Icon, Loader, Radio, Segment, Statistic} from "semantic-ui-react";
import Filters from "./Filters";
import axios from "axios"
import Chart from 'chart.js'

const column_choices = [
    {
        key: -1,
        text: 'Etudiant',
        value: 'codecandidat'
    },
    {
        key: 0,
        text: 'Diplome',
        value: 'libelle'
    },
    {
        key: 1,
        text: 'Mentin de BAC',
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

class EtudiantStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_columns: [],
            group_columns: [],
            typesbac: [],
            diplomes: [],
            filters: {},
            loading: false,
            kind: 'line',
            chart: {chart: null, number: null},
            tb: 'notesmodules()',
            operation_column: null,
            modules: [],


        }
    }

    async componentDidMount() {
        const {data} = await axios.get('http://localhost:8000/filters/');

        this.setState({typesbac: data.typesbac, diplomes: data.diplomes, modules: data.modules });
    }


    onOptionChange = (ev, el) => {
      this.setState({[el.name]: el.value},() =>{

      if(el.name === 'selected_columns') {

          const options = el.options;

          this.state.group_columns.length = 1;

          let opts = [
              {
                  key: -1,
                  text: "Aucun",
                  value: "-1"
              }
          ];


          if(this.state.selected_columns.indexOf(this.state.count_column) === -1) {
              this.setState({count_column: null});
          }

          options.map(opt => {

              if(this.state.selected_columns.indexOf(opt.value)>-1){
                  opts.push(
                      {
                          key: opt.value,
                          text: opt.text,
                          value: opt.value
                      }
                  );
              }
          });
        this.setState({ group_columns: opts });
        }
      });

    };

    onFiltersChange = (e, el) => {

        let filters = Object.assign({}, this.state.filters);
        const val = el.value;

        if(val === "") {
            delete filters[el.name];
        }
        else
            filters[el.name] = val;

        this.setState({ filters: filters} );

    };

    randomizeColors = (n) =>{
        let colors = [];
        var letters = '0123456789ABCDEF'.split('');

        for(let i = 0; i< n; i++) {
            colors[i] = '#';
            for (let j = 0; j < 6; j++ ) {
                colors[i] += letters[Math.floor(Math.random() * 16)];

            }
        }

        return colors;
    };

    handleKindChange = (e, { value }) => this.setState({kind: value});

    formatOptions  = (el) => {
        if(el == null)
            return;

        return el.map(value => (
            {
                key: value.codemodule,
                value: value.codemodule,
                text: value.libellemodule
            }
        ));
    };



    async onSubmit (e)  {
        e.preventDefault();

        this.setState({loading: true});
        const postData = {
            selected_columns: this.state.selected_columns,
            filters: this.state.filters,
            kind: this.state.kind,
            table: this.state.tb,

        };
        if(this.state.operation_column) {
            postData['operation_column'] = this.state.operation_column;
        }

        const { data }= await axios.post("http://localhost:8000/etudiants/", postData);
        const ctx = document.getElementById("chart").getContext('2d');

        let crt = this.state.chart;
        if(crt.chart !== null) {
            crt.chart.destroy();
        }

        const chart = new Chart(ctx, {
            type: this.state.kind,
            data: {
                labels: data.labels,
                datasets: [{

                    data: data.values,
                    backgroundColor: this.randomizeColors(data.values.length)

                }]
            }
        });
        crt.chart = chart;
        crt.number = (function()  {
          let n = 0;
          for(let i=0; i < data.values.length; i++)
              n += data.values[i];
          return n;
        })();


        this.setState({loading: false, chart: crt});

};

    render() {

        return (
            <>
                <Segment>
                  <Dimmer active={this.state.loading}>
                    <Loader size='small'>
                        Chargement..
                    </Loader>
                  </Dimmer>
                    <Form>
                        <Grid stackable columns={1}>
                            <Grid.Column width={6}>
                                <Form.Group>
                                    <Form.Select onChange={this.onOptionChange.bind(this)}
                                                   options={this.formatOptions(this.state.modules)}
                                                   placeholder="Choisir un module" name="libellemodule"
                                                   label="Choisir un module"/>
                                </Form.Group>
                                <Form.Group>
                                    <SelectOptions onChange={this.onOptionChange.bind(this)}
                                               options={column_choices}
                                               placeholder="Choisir les colonnes" name="selected_columns"
                                                label="Choisir les colonnes"/>
                                </Form.Group>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Filters onChange={this.onFiltersChange.bind(this)}
                                         typesbac={this.state.typesbac}  diplomes={this.state.diplomes}/>
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
                                onChange={this.handleKindChange.bind(this)}

                              />{ <Icon size='big' color='teal' name='pie chart' />}

                            </Form.Field>
                            <Form.Field>
                              <Radio
                                label=''
                                name='chart_type'
                                value='bar'
                                checked={this.state.kind === 'bar'}
                                onChange={this.handleKindChange.bind(this)}

                              />{ <Icon size='big' color='teal' name='bar chart' />}

                            </Form.Field>
                            <Form.Field>
                                <Button basic size='medium' color='teal' type='submit' onClick={this.onSubmit.bind(this)}>
                                  Tracer le graph
                                </Button>
                            </Form.Field>
                    </Form>
                    <Grid>
                        <Grid.Row>
                            <canvas id="chart">

                            </canvas>
                        </Grid.Row>

                    </Grid>
                </Segment>
            </>
        )
    }
}
export default EtudiantStatistics;