import * as React from 'react';
import {ActionButton, ButtonContent} from '../Button';
import Icon from '../Icon';
import Todo, {ITodo} from '../Todo';
import AddTodo from '../AddTodo.tsx';

import DataConnection, {DataConnectionProps} from '../DataConnection';
import SPDataConnection, { SPDataConnectionProps } from '../SPDataConnection';

export interface TodoListProps extends DataConnectionProps {
    
}

export interface TodoListState {
    todos: ITodo[],
    inputValue:string
}

var tbRef;

class TodoList extends React.Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);

        this.state = {
            todos: [],
            inputValue: ''
        }
    }

    componentDidMount(){
        this.getTodos();
    }

    getTodos = () => {
        this.props.get().then((data:ITodo[]) => {
            let syncedData = data.map((todo)=>{
                return {...todo, synced: true}
            })
            // .sort((a,b)=>{
            //     let aTitle = a.title.toLowerCase();
            //     let bTitle = b.title.toLowerCase();
            //
            //     if(aTitle > bTitle) return 1;
            //     if(aTitle < bTitle) return 0;
            //     if(aTitle === bTitle) return -1;
            // });
            this.setState({todos:syncedData});
            tbRef.focus();
        });
    }

    setTodoRef = element => {
        tbRef = element;
    }

    changeInput = (input:string) => {
        this.setState({inputValue:input});
    }

    deleteTodo = (index:number, id:number) => {

        let todos = JSON.parse(JSON.stringify(this.state.todos));
        todos[index].synced = false;
        this.setState({todos:todos});
        tbRef.focus();

        this.props.delete(id).then((response)=>{
            if(response.ok){
                todos.splice(index,1);
                this.setState({todos});
                // We assumed success so lets mark the item as success
                // now that is has been confirmed
            } else {
                console.log("Couldn't Delete");
                // We assumed success and it failed
                // so we need to inform the user.
                // maybe mark the item as failed with a retry?
            }
        });
    }

    createTodo = () => {
        let newTodo = {created_by: "1", title:this.state.inputValue};
        let newTodos = JSON.parse(JSON.stringify(this.state.todos));
        newTodos.push(newTodo);
        var newIndex = newTodos.length-1;
        tbRef.focus();
        this.props.create(newTodo).then((data:ITodo)=>{
            let newTodos = JSON.parse(JSON.stringify(this.state.todos));
            newTodos[newIndex] = data;
            newTodos[newIndex].synced = true;
            this.setState({todos:newTodos});
            // We assumed success so now lets confirm it with
            // an icon or display
        }).catch((error)=>{
            console.log("Couldn't created the new todo!");
            // Since we assumed the item would create
            // successfully we need to show that the
            // creation process failed
        });
        this.setState({inputValue: '', todos:newTodos});
    }

    render() {
        let styles = {
            todoList: {
                listStyle: 'none' as 'none',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column' as 'column',
                paddingLeft: '5px',
                fontWeight: 400 as 400
            }
        }
        let todos = this.state.todos.map((todo,index)=>{
            return <Todo {...todo} onDelete={()=>this.deleteTodo(index,todo.id)}/>
        });
        return (
            <ul style={{...styles.todoList}}>
                <AddTodo onClick={this.createTodo} input={this.state.inputValue} onInputChange={this.changeInput} reference={this.setTodoRef} />
                {todos}
            </ul>
        );
    }
}

export default DataConnection()(TodoList);