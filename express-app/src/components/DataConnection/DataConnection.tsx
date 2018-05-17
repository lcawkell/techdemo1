import * as React from 'react';

export interface DataConnectionProps {
    get?: () => Promise<any>,
    create?: (item:{}) => Promise<any>,
    update?: (id:number, item:{}) => Promise<any>,
    delete?: (id:number) => Promise<any>
}

interface DataConnectionState {
}

export default function DataConnection(){
   return function DataConnectionParent(WrappedComponent:any) {
        return class SPConnectionWrapper extends React.Component<any,DataConnectionState> {
            constructor(props: DataConnectionProps){
                super(props);

            }

            getTodos = async () => {
        
                let data = await fetch('http://cawsp.com:3000/todos');
        
                return data.json();
            }
        
            addTodo = async (newTodo:{created_by:string, title:string}) => {
                let response = await fetch('http://cawsp.com:3000/todos', {
                     body: JSON.stringify(newTodo),
                     headers: {
                         'content-type': 'application/json'
                     },
                     method: 'POST',
                     mode: 'cors'
                 });
            
                 return response.json();
             }
        
             deleteTodo = (todoId:number) => {
        
                let deleteIt = async () => {
                    return await fetch('http://cawsp.com:3000/todos/' + todoId, {
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'DELETE',
                        mode: 'cors'
                    });
                }

                return deleteIt();
            
            }

            render(){
                return <WrappedComponent {...this.props} get={this.getTodos} create={this.addTodo} delete={this.deleteTodo} />
            }
        }
    }
}


