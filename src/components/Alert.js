import { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }
    getStyle = () => { // this method is inherited from all class components that extend "Alert"
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.color,
            textAlign: "center",
            fontSize: "12px",
            margin: "10px 0",
            padding: "10px"
        }
    }

    render () { // this is also inherited 
        return(
            <div className = "Alert">
                <p style = {this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0, 0, 255)'; // blue
        this.bgColor = 'rgb(220, 220, 255)'; 
    }
} 

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255,15,15)'; // red 
        this.bgColor = '#fedada'; 
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'black'; 
        this.bgColor = '#ffff00'; // yellow 
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };