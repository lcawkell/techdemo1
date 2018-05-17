import * as React from 'react';
import { DropTarget } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'

const { FILE } = NativeTypes

const target = {
    drop(props, monitor, component) {
      if (monitor.didDrop()) {
        // If you want, you can check whether some nested
        // target already handled drop
        return;
      }


  
      // Obtain the dragged item
      const item = monitor.getItem();

      console.log(item);
      props.onDrop(item);
  
      // You can also do nothing and return a drop result,
      // which will be available as monitor.getDropResult()
      // in the drag source's endDrag() method
      return { moved: true };
    },
    hover(props, monitor, component) {
      const canDrop = monitor.canDrop();
      
      if(canDrop){

      }

    }
  };

  function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }

  class Bucket extends React.Component<any,any> {
      render(){
        const { isOver, canDrop, connectDropTarget } = this.props;

        let color = canDrop?'blue':'green';

          return connectDropTarget(
                <div>
                    <h3 style={{marginLeft:'10px'}}>Your Files:</h3>
                    <ul style={{background:color, height:'100px', width:'400px', margin:'10px', padding: '10px'}}>
                        {this.props.items}
                    </ul>
                </div>
          );    
      }
  }

  export default DropTarget(FILE, target, collect)(Bucket) as any