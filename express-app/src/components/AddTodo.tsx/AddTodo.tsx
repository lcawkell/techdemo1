import * as React from 'react';
import ListItem from '../ListItem';
import { IconButton } from '../Button';
import Icon from '../Icon';

export interface AddTodoProps {
    onClick: () => void,
    input: string,
    onInputChange: (inputValue:string) => void,
    reference?: any
}

export interface AddTodoState {
    active:boolean
}

export default class AddTodo extends React.Component<AddTodoProps, AddTodoState> {
  constructor(props: AddTodoProps) {
    super(props);

        this.state = {
            active: false
        }
  }

  toggleActive = (active) => {
      this.setState({active});
  }

  onChange = (caller) => {
    this.props.onInputChange(caller.target.value);
  }

  onClick = () => {
      if(this.props.input.length > 0) {
          this.props.onClick();
      }
  }

  onEnter = (obj) => {
    if(obj.key === "Enter") {
        if(this.props.input.length > 0) {
            this.props.onClick();
        }
    }
  }

  render() {

    let styles = {
        input: {
            outline: 'none',
            border: 'none',
            height: 'auto',
            width: '85%',
            fontSize: '20px',
            marginLeft: '10px',
            marginRight: '10px',
            background: '#eee'
        },
        icon: {
            display: 'inline-block',
            zIndex: 10
        }
    }

    return (
        <ListItem active={this.state.active}><span><input placeholder="Enter a new todo..." style={{...styles.input}} type='text' onFocus={()=>this.toggleActive(true)} onBlur={()=>this.toggleActive(false)} value={this.props.input} onChange={this.onChange} ref={this.props.reference} onKeyPress={this.onEnter}/></span><span style={{...styles.icon}}><IconButton onClick={this.onClick}><Icon icon='plus' size='small' /></IconButton></span></ListItem>
    );
  }
}
