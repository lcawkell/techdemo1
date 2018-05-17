import * as React from 'react';
import TodoList from './TodoList';

export interface TodosProps {}
export interface TodosState {}

export default class Todos extends React.Component<TodosProps, TodosState> {
    constructor(props: TodosProps) {
        super(props);

        this.state = {}
    }

    isClientOrServer = () => {
        return (typeof window !== 'undefined' && window.document) ? 'client' : 'server';
      };

    render() {

        let styles = {
            root: {
                fontFamily: 'Arial' as 'Arial'
            },
            heading: {
                marginLeft: '10px'
            }
        }

        return (
            <div style={{...styles.root}}>
                <h2 style={{...styles.heading}} >Todo List</h2>
                {this.isClientOrServer()}
                <TodoList />
            </div>
        );
    }
}
