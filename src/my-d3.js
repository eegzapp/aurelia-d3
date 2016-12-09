
import { bindable } from 'aurelia-framework';
import { select, timeFormat } from 'd3';

export class MyD3 {
  @bindable myData;

  constructor() {
    this.myData = "X";
  }

  attached() {

console.log(this.myData);
/**
 * Draw a bar chart with the width of each bar set by each element passed in 
 
    select(this.thisChart) // grab the chart div
      .selectAll('div')  // select all div children (should be empty)
        .data(this.myData)  // associate data with the selection. This is weirdness. If there's 8 pieces of data in this.myData, then 8 enter() events will be registered
      .enter().append('div')  // handle the 8 enter events. In this case, we're appending a 'div' for each...
        .style('width', d => d*10+'px')  // Then setting it's style...
        .style('background-color', 'red')
        .text((elm) => elm);  // And width (because they're bars in a horizontal bar chart)
*/

        /*
        var formatMonth = timeFormat("%B"),
            formatDay = timeFormat("%A"),
            date = new Date(2014, 4, 1); 

            console.log(formatMonth(date)); // "May"
            console.log(formatDay(date)); // "Thursday"
            */
      }    
}

