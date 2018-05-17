import * as React from 'react';
import { DropTarget } from 'react-dnd';

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
      props.onDrop();
  
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

  class Hole extends React.Component<any,any> {
      render(){
        const { isOver, canDrop, connectDropTarget } = this.props;

        let color = canDrop?'blue':'green';

          return connectDropTarget(
                <div style={{background:color, height:'100px', width:'100px'}}>
                    <ul>
                        {this.props.items}
                    </ul>
                </div>
          );    
      }
  }

  export default DropTarget('Card', target, collect)(Hole) as any