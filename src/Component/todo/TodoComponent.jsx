import moment from 'moment';
import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import Authentication from './Authentication.js';

class TodoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }
        let username = Authentication.getUserLoggedin()
        TodoDataService.RerieveTodo(username, this.state.id)
            .then(response => this.setState({ description: response.data.description, targetDate: moment(response.data.targetDate).format('YYYY-MM-DD') }))
    }

    validate(values) {
        let erros = {}

        if (!values.description) {
            erros.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            erros.description = 'Enter atleast 5 characters in description'
        }

        if (!moment(values.targetDate).isValid()) {
            erros.targetDate = 'Invalid date'
        }
        return erros
    }

    onSubmit(values) {
        let username = Authentication.getUserLoggedin()
        let todo = { id: this.state.id, description: values.description, targetDate: values.targetDate }

        if (this.state.id === -1) {
            TodoDataService.addTodo(username, todo)
                .then(() => this.props.history.push('/ListTodo'))
        } else {

            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/ListTodo'))
        }
    }

    render() {
        // let description = this.state.description
        // let targetDate = this.state.targetDate
        let { description, targetDate } = this.state

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description, targetDate }} onSubmit={this.onSubmit} validate={this.validate} enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-group" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-group" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default TodoComponent