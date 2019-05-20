import React, { Component } from 'react'
import { Button, Grid, Form, Select } from 'semantic-ui-react'

const algo = [
    { key: 'a', text: 'Arbre de décision', value: 'Arbre de décision' },
]
const cible = [
    { key: 'm', text: 'Moyenne', value: 'Moyenne' },
    { key: 'mn', text: 'Mention Année', value: 'Mention Année' }
]

export default class MachineLearning extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Grid >
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Form>
                            <Form.Group>
                                <Form.Field control={Select} label='choisire Votre Algorithme :' options={algo} placeholder='Algorithme' />
                                <Form.Field control={Select} label='choisire Votre Cible :' options={cible} placeholder='Cible' />                                           
                            </Form.Group>
                            <Form.Field control={Button} color='teal'>Rechercher</Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
