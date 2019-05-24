import React, { Component } from 'react';
import { Select,Segment,Form,Radio,Header,Button,Grid } from 'semantic-ui-react'
import SelectOptions from "../statistics/SelectOptions.js";


class MachineLearning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithme: null,
            target: null,
            show: false
        }

    }
    onChangeAlgoHundler = (e, { value }) => {
        this.setState({
            algorithme: value,
        });
        if (value === 'Arbre de décision' || value === "Forêt d'arbres décisionnels" || value === "Machine à vecteurs de support"
            || value === "Classification naïve bayésienne")
            this.setState({ target: "Mention Année" })
        else if (value === "Régression linéaire multiple")
            this.setState({ target: "Moyenne Année" })

        this.setState({ show: true });
    };
    onChangeFieldHundler(event) {
        event.preventDefault();
    };


    render() {
        const algo = [
            { key: 'a', text: 'Arbre de décision', value: "Arbre de décision" },
            { key: 'b', text: "Forêt d'arbres décisionnels", value: "Forêt d'arbres décisionnels" },
            { key: 'c', text: 'Machine à vecteurs de support', value: 'Machine à vecteurs de support' },
            { key: 'd', text: 'Classification naïve bayésienne', value: 'Classification naïve bayésienne' },
            { key: 'e', text: 'Régression linéaire multiple', value: 'Régression linéaire multiple' },
        ];
        const fields = [
            { key: 'a', text: 'Age', value: 'Age' },
            { key: 'b', text: 'Type de Bac', value: 'Type de Bac' },
            { key: 'c', text: 'Note de Concours', value: 'Note de Concours' },
            { key: 'd', text: 'Moyenne Excele', value: 'Moyenne Excele' },
        ];
        const { algorithme } = this.state;
        let params;

        if (algorithme === 'Arbre de décision')
            params = <div>
                <h1>Arbre de décision</h1>
            </div>;
        else if (algorithme === "Forêt d'arbres décisionnels")
            params = <div>
                <h1>Forêt d'arbres décisionnels</h1>
            </div>;
        else if (algorithme === 'Machine à vecteurs de support')
            params = <div>
                <h1>Machine à vecteurs de support</h1>
            </div>;
        else if (algorithme === 'Classification naïve bayésienne')
            params = <div>
                <h1>Classification naïve bayésienne</h1>
            </div>;
        else if (algorithme === 'Régression linéaire multiple')
            params = <div>
                <h1>Régression linéaire multiple</h1>
            </div>;
        return (
            <React.Fragment>
                <Segment>
                    <Form>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Header as='h4'>Selectionner Votre Algo:</Header>
                                <Form.Group>
                                    <Form.Field>
                                        <Select placeholder="Algorithme" options={algo} onChange={this.onChangeAlgoHundler.bind(this)} />
                                    </Form.Field>
                                </Form.Group>
                                {this.state.show ?
                                    <Form.Group>
                                        <Form.Group>
                                            <SelectOptions onChange={this.onChangeFieldHundler.bind(this)}
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
                                            <Radio toggle name='target' value={this.state.target} checked={this.state.target}
                                                label={this.state.target} onChange={this.onTargetClick} />
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
                        {params}
                    </Form>
                </Segment>
            </React.Fragment>
        );
    }
}
export default MachineLearning;