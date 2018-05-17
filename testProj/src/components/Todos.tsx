import * as React from 'react';

export interface TodosProps {
}

export interface TodosState {
}

export default class Todos extends React.Component<TodosProps, TodosState> {
  constructor(props: TodosProps) {
    super(props);

        this.state = {
    }
  }

  render() {
    return (
      <div>
        Test
      </div>
    );
  }
}
