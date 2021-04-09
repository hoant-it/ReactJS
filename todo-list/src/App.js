
import './App.css';
import TodoItem from './components/TodoItem';
import React from 'react';
import SelectAll from './images/select.svg';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      newItem:'',
      todoItems:[
        {'title':'Đi chợ', iscomplete:true},
        {'title':'Nấu cơm', iscomplete:true},
        {'title':'Giặt đồ'}
      ]
    }

    this.onkeyUp=this.onkeyUp.bind(this);
    this.onChange=this.onChange.bind(this);
   
  }
  OnItemClicked(item){
    return (event) =>{
      const isComplete= item.iscomplete;
      const {todoItems}= this.state
      const index= todoItems.indexOf(item);
      this.setState({
        todoItems:[
          ...todoItems.slice(0,index),
          {
            ...item,
            iscomplete:!isComplete
          },
          ...todoItems.slice(index+1)
        ]

      });

    }

  }
  onkeyUp(event) {
    if(event.keyCode===13){ //enter key
    let text= event.target.value;
    if(!text){
      return;
    }
    text=text.trim();
    if(!text){
      return;
    }
  
      this.setState({
        newItem:'',
        todoItems:[{
          title:text,iscomplete:false},
          ...this.state.todoItems
        ]
      })
    }
  
  }

  onChange(event){
    this.setState({
      newItem:event.target.value
    });

  }
  render() {
    const {todoItems,newItem}=this.state;
  
    let  Apphtml= (
        <div className="App">
          <div className="Header">
            <img src={SelectAll} width={32} height={32}></img>
            <input 
            type='text' 
            placeholder="add new todo" 
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onkeyUp}></input>
          </div>
          { todoItems.length >0 &&
            todoItems.map((item,index) => 
            <TodoItem 
            key={index} 
            item={item}
  
            onClick={this.OnItemClicked(item)}/>
            )
          }
          {
            todoItems.length===0 && 'Nothing here'
          }
        </div>
      );

 
    return Apphtml;
  }

 
}

export default App;
