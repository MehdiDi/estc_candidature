import React, {Component} from 'react';
import {Form} from "semantic-ui-react";

class Filters extends Component {


    formatOptions  = (values) => {
        let opts =  values.map(value => (

            {
                key: value,
                value: value,
                text: value
            }
        ));
        opts.splice(0, 0, {
            key: 0,
            text: "Tous",
            value: '',
        });
        return opts;
    };


    dureesformation = [
        {
            key: 0,
            text: "Tous",
            value: '',
        },
        {
            key: 1,
            text: 'Normal',
            value: 'Normale',
        },
        {
            key: 2,
            text: 'Redoublé 1 an',
            value: 'redouble 1 an'
        },
        {
            key: 3,
            text: 'Redoublé 2 ans ou plus',
            value: 'redouble 2 ans ou plus'
        }
    ];

    mentionsbac = [
        {
            key: 0,
            text: "Tous",
            value: '',
        },
        {
            key: 1,
            text: 'Passable',
            value: 'Passable'
        },
        {
            key: 2,
            text: 'Assez Bien',
            value: 'Assez Bien'
        },

        {
            key: 3,
            text: 'Bien',
            value: 'Bien'
        },
        {
            key: 4,
            text: 'Tres Bien',
            value: 'Tres Bien'
        },
    ];

    handleChange = (e, el) => {
        this.props.onChange(e, el);
    };

    render() {
        return (
            <>
                <Form.Group widths={2}>
                  <Form.Input fluid label='Année candidature' onChange={this.handleChange}
                              placeholder='Année candidature' name="anneecandidature" />
                  <Form.Input  label='Age' placeholder='Age' name='age' onChange={this.handleChange} />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Input label='Ville de naissance' placeholder='Ville de naissance' name='naissance'
                              onChange={this.handleChange}/>
                  <Form.Input label='Ville de Residence' name='residence' placeholder='Ville' onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Select label='Mention de BAC' placeholder='Mention de BAC' name='mentionbac'
                               options={this.mentionsbac} onChange={this.handleChange}/>
                  <Form.Select  label='Type de BAC' placeholder='Type de BAC' name="typebac" onChange={this.handleChange}
                                options={this.formatOptions(this.props.typesbac)} />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Select label='Diplôme Superieur' placeholder='Diplôme Superieur' name='diplome'
                               options={this.formatOptions(this.props.diplomes)} onChange={this.handleChange} />
                  <Form.Select  label='Durée de formation' placeholder='Durée de formation'
                                name="dureeformation" options={this.dureesformation} onChange={this.handleChange}/>
                </Form.Group>

            </>
        );
    }
}

export default Filters;