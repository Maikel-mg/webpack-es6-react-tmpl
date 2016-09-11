import React, {Component} from 'react';

class SumaValores extends Component {
    constructor(props) {
        super(props);
        this.onUpdate = props.onUpdate;
        this.state = {
            suma : this.props.suma
        }; 
    } 
    render() {
        return (
            <div>
                Suma de valores
                <br/>  
                <span>{this.state.suma}</span>
            </div>
        );
    }
}

export default SumaValores;