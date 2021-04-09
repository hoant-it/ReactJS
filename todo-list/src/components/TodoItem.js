import React from 'react';
import './TodoItem.css'
import chekImg from '../images/check.svg';
import checkCompleteImg from '../images/check-complete.svg'

class TodoItem extends React.Component {
render() {
    const {item,onClick}=this.props;
    let url=chekImg;
    if(item.iscomplete){
        url=checkCompleteImg;
    }
    let className='TodoItem';
    if(item.iscomplete){
        className+=' TodoItem-complete'
    }

   const html= (
        <div  className={className}>
            <img onClick={onClick} src={url} width={32} height={32}></img>
            <p>{item.title}</p>
        </div>

    );
    return html;
}
}
export default TodoItem;