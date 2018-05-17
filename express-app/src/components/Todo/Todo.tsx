import * as React from 'react';
import Icon from '../Icon';
import { IconButton } from '../Button';
import ListItem from '../ListItem';

export interface ITodo {
    id: number, 
    title: string, 
    created_by: string, 
    created_at: string, 
    updated_at: string,
    synced?: boolean
}

export interface TodoProps extends ITodo {
    onDelete: () => void
}

export interface TodoState {
    hovering:boolean
}

export default class Todo extends React.Component<TodoProps, TodoState> {
    constructor(props: TodoProps) {
        super(props);

        this.state = {
            hovering: false
        }
    }

    hovering = (hovering:boolean) => {
        this.setState({hovering});
    }

    render() {

        let styles = {
            todoText: {
                marginLeft: '10px'
            },
            actions: {
                position: 'absolute' as 'absolute',
                right: '10px',
                top: '7px'
            }
        }

        let actions = this.props.synced ? <IconButton onClick={this.props.onDelete}><Icon icon="trash" size='small' /></IconButton> : <IconButton onClick={()=>{}}><Icon icon="spinner" size="small" rotate /></IconButton>

        return (
            <ListItem hovering={(hovering)=>this.hovering(hovering)} isHovering={this.state.hovering}><span className="text-block" style={{...styles.todoText}}>{this.props.title}</span><span style={{...styles.actions}}>{actions}</span></ListItem>
        );
    }
}
