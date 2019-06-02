import React, { Component } from 'react';
import { Select, Input, Segment, Form, Radio, Header, Button, Grid } from 'semantic-ui-react'
import SelectOptions from "../statistics/SelectOptions.js";


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
                });
                this.setState({ group_columns: opts });
            }
        });
    };

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

    onChangeNombreArbre = (e, { value }) => {
        this.setState({
            NombreArbre: value,
        });
    }

    onSubmit = () => {
        console.log(this.state.group_columns)
        console.log(this.state.kernel)
        console.log(this.state.NombreArbre)
        console.log(this.state.target)
    }
    render() {
        const algo = [
            { key: 'a', text: 'Arbre de décision', value: "Arbre de décision" },
            { key: 'b', text: "Forêt d'arbres décisionnels", value: "Forêt d'arbres décisionnels" },
            { key: 'c', text: 'Machine à vecteurs de support', value: 'Machine à vecteurs de support' },
            { key: 'd', text: 'Classification naïve bayésienne', value: 'Classification naïve bayésienne' },
            { key: 'e', text: 'Régression linéaire multiple', value: 'Régression linéaire multiple' },
        ];
        const kernel = [
            { key: 'a', text: 'linear', value: "linear" },
            { key: 'b', text: 'polynomial', value: "polynomial" },
            { key: 'c', text: 'gaussian', value: "gaussian" },
            { key: 'd', text: 'sigmoid', value: "sigmoid" },
        ];
        const fields = [
            { key: 'a', text: 'Genre', value: 'Genre' },
            { key: 'b', text: 'Age', value: 'Age' },
            { key: 'c', text: 'Type Bac', value: 'Type Bac' },
            { key: 'd', text: 'Mention bac', value: 'Mention bac' },
            { key: 'e', text: 'Nom ville', value: 'Nom ville' },
            { key: 'f', text: 'Durée formation', value: 'Durée formation' },
            { key: 'g', text: 'Moyenne formation', value: 'Moyenne formation' },
            { key: 'h', text: 'Moyenne préselection', value: 'Moyenne préselection' },
            { key: 'i', text: 'Moyenne concours', value: 'Moyenne nconcours' },
            { key: 'j', text: 'Moyenne année', value: 'Moyenne année' },
            { key: 'k', text: 'Mention année', value: 'Mention année' },
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