import React, { Component } from 'react';
import { Select, Input, Segment, Form, Radio, Header, Button, Grid } from 'semantic-ui-react'
import SelectOptions from "../statistics/SelectOptions.js";
import axios from 'axios';


class MachineLearning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithme: null,
            target: null,
            show: false,
            selected_columns: [],
            group_columns: [],
            kernel: null,
            NombreArbre: null
        }
    }
    onKernelChange = (e, { value }) => {
        this.setState({
            kernel: value,
        });
    }
    onOptionChange = (ev, el) => {
        this.setState({ [el.name]: el.value }, () => {
            if (el.name === 'selected_columns') {
                const options = el.options;
                this.state.group_columns.length = 1;
                let opts = [
                    {
                        key: -1,
                        text: "Aucun",
                        value: "-1"
                    }
                ];
                if (this.state.selected_columns.indexOf(this.state.count_column) === -1) {
                    this.setState({ count_column: null });
                }
                options.map(opt => {
                    if (this.state.selected_columns.indexOf(opt.value) > -1) {
                        opts.push(
                            {
                                key: opt.key,
                                text: opt.text,
                                value: opt.value
                            }
                        );
                    }
                    return null;
                });
                this.setState({ group_columns: opts });
            }
        });
    };

    onChangeAlgoHundler = (e, { value }) => {
        this.setState({
            algorithme: value,
        });
        if (value === 'decision_tree' || value === "random_forest" || value === "svm"
            || value === "naive_bayes")
            this.setState({ target: "mentionannee" });
        else if (value === "Régression linéaire multiple")
            this.setState({ target: "moyenneannee" });
        this.setState({ show: true });
    };


    onChangeNombreArbre = (e, { value }) => {
        this.setState({
            NombreArbre: value,
        });
    };

    onSubmit = () => {
        const params = {};
        if(this.state.algorithme === "Forêt d'arbres décisionnels") {
            params['nb_arbres'] = this.state.NombreArbre;
        }
        else if(this.state.algorithme === "Machine à vecteurs de support") {
            params['kernel'] = this.state.kernel;
        }
        const postData = {
            algorithm: this.state.algorithme,
            features: this.state.selected_columns,
            target: this.state.target,
            params
        };
        console.log(postData);
        axios.post('http://localhost:8000/predict/', postData)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
    };
    render() {
        const algo = [
            { key: 'a', text: 'Arbre de décision', value: "decision_tree" },
            { key: 'b', text: "Forêt d'arbres décisionnels", value: "random_forest" },
            { key: 'c', text: 'Machine à vecteurs de support', value: 'svm' },
            { key: 'd', text: 'Classification naïve bayésienne', value: 'naive_bayes' },
            { key: 'e', text: 'Régression linéaire multiple', value: 'Régression linéaire multiple' },
        ];
        const kernel = [
            { key: 'a', text: 'linear', value: "linear" },
            { key: 'b', text: 'polynomial', value: "polynomial" },
            { key: 'c', text: 'gaussian', value: "gaussian" },
            { key: 'd', text: 'sigmoid', value: "sigmoid" },
        ];
        const fields = [
            { key: 'a', text: 'Genre', value: 'genre' },
            { key: 'b', text: 'Age', value: 'age' },
            { key: 'c', text: 'Type Bac', value: 'typebac' },
            { key: 'd', text: 'Mention bac', value: 'mentionbac' },
            { key: 'e', text: 'Nom ville', value: 'residence' },
            { key: 'f', text: 'Durée formation', value: 'dureeformation' },
            { key: 'g', text: 'Moyenne formation', value: 'moyformation' },
            { key: 'h', text: 'Moyenne préselection', value: 'excel' },
            { key: 'i', text: 'Moyenne concours', value: 'concours' },
            { key: 'j', text: 'Moyenne année', value: 'moyenneannee' },
            { key: 'k', text: 'Mention année', value: 'mentionannee' },
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
                <Form.Group>
                    <Header as='h4'>Entrer Votre Nombre d'arbre : </Header>
                    <Input placeholder="Nombre d'arbre"   type="number" onChange={this.onChangeNombreArbre.bind(this)} />
                </Form.Group>
            </div>;
        else if (algorithme === 'Machine à vecteurs de support')
            params = <div>
                <h1>Machine à vecteurs de support</h1>
                <Header as='h4'>Selectionner Votre Kernel:</Header>
                <Form.Group>
                    <Form.Field>
                        <Select placeholder="Kernel" options={kernel} onChange={this.onKernelChange.bind(this)} />
                    </Form.Field>
                </Form.Group>
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
                                            <SelectOptions onChange={this.onOptionChange.bind(this)}
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
                                            <Radio toggle name={this.state.target} value={this.state.target} checked={this.state.target}
                                                label={this.state.target} onChange={this.onTargetClick} />
                                        </Form.Field>
                                    </Segment>
                                </Form.Field>
                                <Form.Field>
                                    <Button loading={this.state.loading} color='teal' type='submit' onClick={this.onSubmit.bind(this)}>
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