import React, {Component, PropTypes} from 'react';

class Screencast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtStatic : 'Esto es el texto del estado'
        };
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.update.bind(this)}/>
                <h1>
                    {this.state.txtStatic}, {this.props.txt} - {this.props.cat}
                </h1>  
            </div>
        );
    }
    update (e) {
        this.setState({
            txtStatic : e.target.value
        });
    }
}

Screencast.propTypes = {
    txt : PropTypes.string, 
    cat : PropTypes.number.isRequired
};

Screencast.defaultProps = {
    txt : '',
    cat : 5
};


export default Screencast;