import React, { Component } from "react";
import './Counter.css';

class Counter extends Component {

    constructor() {
        super();

        this.state = {
            Counter: 0
        }

        this.Increment = this.Increment.bind(this);
        this.Decrement = this.Decrement.bind(this);
        this.Reset = this.Reset.bind(this);
    }
    render() {
        return (
            <div className="Counter">
                <CounterButton by={1} IncrementMethod={this.Increment} DecrementMethod={this.Decrement} />
                <CounterButton by={5} IncrementMethod={this.Increment} DecrementMethod={this.Decrement} />
                <CounterButton by={10} IncrementMethod={this.Increment} DecrementMethod={this.Decrement} />
                <span className="Count">{this.state.Counter}</span>
                <div><button className="reset" onClick={this.Reset}>Reset</button></div>
            </div>
        );
    }

    Increment(by) {
        this.setState({
            Counter: this.state.Counter + by
        });
    }

    Decrement(by) {
        this.setState({
            Counter: this.state.Counter - by
        });
    }

    Reset(){
        this.setState({
            Counter: 0
        });
    }

}

class CounterButton extends Component {

    constructor() {
        super();

        this.state = {
            Counter: 0
        }

        this.Increment = this.Increment.bind(this);
        this.Decrement = this.Decrement.bind(this);
    }

    render() {
        return (
            <div className="CounterButton">
                <button className="Button" onClick={this.Increment}>+{this.props.by}</button>
                <button className="Button" onClick={this.Decrement}>-{this.props.by}</button>
                <br></br>
            </div>
        );
    }

    Increment() {
        this.setState({
            Counter: this.state.Counter + this.props.by
        });

        this.props.IncrementMethod(this.props.by)
    }

    Decrement() {
        this.setState({
            Counter: this.state.Counter - this.props.by
        });

        this.props.DecrementMethod(this.props.by)
    }


}

export default Counter
