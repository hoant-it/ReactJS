import React from 'react';

class Accordian extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCollapsed:true
        }
        this.onClickHeading=this.onClickHeading.bind(this);
    }

    onClickHeading(){
        this.setState({
            isCollapsed:!this.state.isCollapsed
        })

    }

    render(){
        const {heading,children} = this.props;
        const{isCollapsed} = this.state;
        const AcodinaHtml=(
            <div className="Accordian">
                <div className="Heading" onClick={this.onClickHeading}>
                    <h2> {heading}</h2>
                </div>
            {
                !isCollapsed && <div className="Content"> {children }</div>
            }    
            </div>


        );
        return AcodinaHtml;

    }

    }

   export default Accordian



