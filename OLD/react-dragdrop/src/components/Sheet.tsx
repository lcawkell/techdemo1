import * as React from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  
    beginDrag(props:any, monitor:any, component:any) {
      // Return the data describing the dragged item
      const item = { id: props.id };
      return item;
    },
    endDrag(props, monitor, component) {
        if(monitor.didDrop()) {
            console.log("Good drop!");
            component.setState({
                text: ''
            });
        }
    }
  
  };

function collect(connect:any,monitor:any){
    return {

        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()

    };
}

class Sheet extends React.Component<any,any> {
    constructor(){
        super();
        this.state = {
            text: `I'm a Sheet! Move me!`
        }
    }

    render(){

        const { id } = this.props;
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div>
                {this.props.isDragging?`I'm moving!!`:this.state.text}
            </div>
        );
    }
}

export default DragSource('Sheet', cardSource, collect)(Sheet) as any