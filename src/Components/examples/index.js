import React, {Component} from 'react';

export default class Example extends Component {
    constructor(props) {
        super(props);
    }

    renderChildren = (props) => {
        return React.cloneElement(this.props.children, {...props})
    }

    onChange = e => {
        this.props.onChangeProgress && 
            this.props.onChangeProgress(this.props.id, e.target.value)
    }

    render () {
        return (
            <div>
                <input className="slider" 
                    value={this.props.defaultValue}
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="100"
                    />
                    {this.renderChildren(this.props)}
            </div>

        );
    }
}