import React, { Component } from 'react';
import { Select,Segment,Form,Radio,Header,Button,Grid } from 'semantic-ui-react'
import SelectOptions from "../statistics/SelectOptions.js";


class MachineLearning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            target: null
        }
    }

    onChangeHundler(event) {
        event.preventDefault();
        this.setState({ show: true });
    }
    onTargetClick = (el, { name, value }) => {
        this.setState({ target: value });
    };

    render() {
        const algo = [
            { key: 'a', text: 'Arbre de décision', value: 'Arbre de décision' }
        ];
        const fields = [
            { key: 'a', text: 'Age', value: 'Age' },
            { key: 'b', text: 'Type de Bac', value: 'Type de Bac' },
            { key: 'c', text: 'Note de Concours', value: 'Note de Concours' },
            { key: 'd', text: 'Moyenne Excele', value: 'Moyenne Excele' },
        ];
        return (
            <React.Fragment>
                <Segment>
                    <Form>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Header as='h4'>Selectionner Votre Algo:</Header>
                                <Form.Group>
                                    <Select placeholder="Algorithme" options={algo} onChange={this.onChangeHundler.bind(this)} />
                                </Form.Group>
                                {this.state.show ?
                                    <Form.Group>
                                        <Form.Group>
                                            <SelectOptions onChange={this.onChangeHundler.bind(this)}
                                                options={fields}
                                                placeholder="Choisir les colonnes" name="selected_columns"
                                                label="Choisir les colonnes" />
                                        </Form.Group>
                                    </Form.Group> : null}
                            </Grid.Column>
                            {this.state.show ? <Grid.Column>
                                <Form.Field>
                                    <Header as='h4'>Target</Header>
                                    <Segment compact>
                                        <Form.Field>
                                            <Radio toggle name='target' value='moyenneannee' checked={this.state.target === 'moyenneannee'}
                                                label="Moyenne d'année" onChange={this.onTargetClick} />
                                        </Form.Field>
                                    </Segment>
                                </Form.Field>
                                <Form.Field>
                                    <Button loading={this.state.loading} color='teal' type='submit'>
                                        Envoyer
                                </Button>
                                </Form.Field>
                            </Grid.Column> : null}
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Segment>
            </React.Fragment>
        );
    }
}

export default MachineLearning;