import React, { Component } from 'react';
import SelectOptions from "./SelectOptions";
import {Form} from "semantic-ui-react";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: [],

        }
    }

    formatOptions  = (values) => {
        return values.map(value => (

            {
                key: value.codemodule,
                value: value.codemodule,
                text: value.libellemodule
            }
        ));
    };

    handleChange = (e, el) => {
        this.props.onChange(e, el);
    };

    render() {
        return(
            <>
                <Form.Group>
                    <SelectOptions onChange={this.handleChange.bind(this)}
                                   options={this.formatOptions(this.state.modules)}
                                   placeholder="Choisir un module" name="operation_column"
                                   label="Choisir un module"/>
                </Form.Group>
                <Form.Group widths={2}>

                </Form.Group>
            </>
        )
    }

}
export default Notes;