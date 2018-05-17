import * as React from 'react';

export interface ListItemProps {
    children?:any,
    active?: boolean,
    hovering?: (hovering:boolean) => void,
    isHovering?: boolean
}

export default function ListItem (props: ListItemProps) {

    let hovering = props.isHovering !== undefined ? props.isHovering : false;

    let styles = {
        todoItem: {
            boxShadow: props.active ? '0px 0px 5px #679D69' : '0px 0px 1px #aaa',
            display: 'block' as 'block',
            padding: '17px 5px',
            margin: '0px 5px 1px 5px',
            width: '400px',
            textTransform: 'uppercase' as 'uppercase',
            position: 'relative' as 'relative',
            background: hovering ? '#ccc' : '#eee'
        }
    }
    
    let mEnter = props.hovering !== undefined ? ()=>props.hovering(true) : ()=>{};
    let mLeave = props.hovering !== undefined ? ()=>props.hovering(false) : ()=>{};

    return (
        <li style={{...styles.todoItem}} onMouseEnter={mEnter} onMouseLeave={mLeave}>{props.children}</li>
    );
}
