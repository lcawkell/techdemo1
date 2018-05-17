import * as React from "react";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Card from './Card';
import Sheet from './Sheet';
import Hole from './Hole';
import Bucket from './Bucket';
  
class Board extends React.Component<any,any> {
    constructor(props:any){
        super(props);

        this.state = {
            currentId: 0,
            data: [

            ],
            data2: [

            ]
        };

        this._addItem = this._addItem.bind(this);
        this._addItem2 = this._addItem2.bind(this);
    }
    _addItem(){
        console.log("adding");
        var updatedData:any = this.state.data.slice();
        updatedData.push(<Card id={1} key={this.state.currentId} />);

        this.setState({
            data: updatedData,
            currentId: this.state.currentId+=1
        });

    }
    _addItem2(droppedItem){
        console.log("adding");
        var updatedData:any = this.state.data2.slice();
        droppedItem.files.forEach(function(file,index){
            updatedData.push(<div>{droppedItem.files[index].name} {droppedItem.files[index].type==='text/html'?`- It's HTML!`:droppedItem.files[index].type==='application/javascript'?`- It's JAVASCRIPT!`:'- What kinda file is that?'}</div>);
        });
        

        this.setState({
            data2: updatedData,
            currentId: this.state.currentId+=1
        });

    }
    render(){
        return(
            <div>
                <Card id={1} />
                <Sheet id={1} />
                <Hole items={this.state.data} onDrop={this._addItem} />
                <Bucket items={this.state.data2} onDrop={this._addItem2} />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board)