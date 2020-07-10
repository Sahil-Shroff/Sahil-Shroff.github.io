import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ArrayCanvas extends React.Component {

  render() {
    const array = this.props.values;
    let dataPoints = [];
    for (let i = 0; i < array.length; i++) {
        const element = this.props.cell.activeSwap;
        let isHighLighted = element.length && ((element[0] === i) || (element[1] === i)) ? 'blue' : 'yellow';
        isHighLighted = this.props.cell.key === i ? 'red' : isHighLighted;  
        dataPoints.push({x: i, y: array[i], color: isHighLighted});
    }
    const options = {
        axisX:{
            tickLength: 1,
            interval: 1
        },
        data: [{				
                  type: "column",
                  dataPoints: dataPoints
         }]
    }

    return (
      <div className="ArrayCanvas">
        <CanvasJSChart options = {options}
          onRef = {ref => this.chart = ref}
        />
      </div>
    );
  }
}

export default ArrayCanvas;
