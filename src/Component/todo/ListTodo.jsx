import { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import Authentication from './Authentication.js';
import moment from 'moment';

class ListTodo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Todos: [],
      message: null
    }

    this.deleteTodoClick = this.deleteTodoClick.bind(this)
    this.updateTodoClick = this.updateTodoClick.bind(this)
    this.refreshTodos = this.refreshTodos.bind(this)
    this.addClick = this.addClick.bind(this)
  }

  componentDidMount() {

    this.refreshTodos();

  }

  refreshTodos() {

    let username = Authentication.getUserLoggedin()
    TodoDataService.RerieveAllTodo(username)
      .then(response => { this.setState({ Todos: response.data }) })

  }

  deleteTodoClick(id) {

    let username = Authentication.getUserLoggedin()
    TodoDataService.deleteTodo(username, id)
      .then(response => {
        this.setState({ message: `Delete of todo ${id} Success` })
        this.refreshTodos()
      })

  }

  updateTodoClick(id) {

    this.props.history.push(`/todos/${id}`)

  }

  addClick(){

    this.props.history.push(`/todos/-1`)

  }


  render() {
    return (
      <div className="container">
        <div className="ListTodo">
          <h1>List Todo</h1>
          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
          <table className="table table-borderless table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Description</th>                
                <th>Traget Date</th>
                <th>Complete ?</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="tbody-light">
              {this.state.Todos.map(
                Todo =>
                  <tr key={Todo.id}>
                    <td>{Todo.description}</td>                    
                    <td>{moment(Todo.targetDate).format('YYYY-MM-DD')}</td>
                    <td>{Todo.done.toString()}</td>
                    <td><button className="btn btn-success" onClick={() => this.updateTodoClick(Todo.id)}>Update</button></td>
                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClick(Todo.id)}>Delete</button></td>
                  </tr>
              )
              }
            </tbody>
          </table>
          <div className="container">
            <button className="btn btn-success" onClick={this.addClick}>ADD</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodo