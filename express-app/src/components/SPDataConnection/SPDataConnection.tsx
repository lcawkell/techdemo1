import * as React from 'react';

export interface SPDataConnectionProps {
    get?: () => Promise<any>,
    create?: (item:{}) => Promise<any>,
    update?: (id:number, item:{}) => Promise<any>,
    delete?: (id:number) => Promise<any>
}

interface SPDataConnectionState {
}

export default function SPDataConnection(){
   return function SPDataConnectionParent(WrappedComponent:any) {
        return class SPConnectionWrapper extends React.Component<any,SPDataConnectionState> {
            constructor(props: SPDataConnectionProps){
                super(props);

            }

            getTodos = async () => {
        
                let data = await fetch('spdata.json');
        
                return data.json();
            }
        
            addTodo = async (newTodo:{created_by:string, title:string}) => {
                 return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({title:newTodo.title, id: 999});
                    }, 300);
                 });
             }
        
             deleteTodo = (todoId:number) => {

                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({ok:true})
                    }, 300);
                });
            
            }

            render(){
                return <WrappedComponent {...this.props} get={this.getTodos} create={this.addTodo} delete={this.deleteTodo} />
            }
        }
    }
}


