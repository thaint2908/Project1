import React, {Component} from "react";
import './InputNumber.css';

class InputNumber extends Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center number-input w-100" style={this.props.style}>
                <button onClick={this.props.decrease} className="minus" disabled={this.props.value <= 1}/>
                <input
                    className="quantity"
                    name="quantity"
                    value={this.props.value ?? 1}
                    onChange={this.props.onChange}
                    type="number"
                />
                <button onClick={this.props.increase} className="plus"/>
            </div>
        );
    }
}

export default InputNumber;
