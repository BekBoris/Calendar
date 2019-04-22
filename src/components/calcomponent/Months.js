import '../../style/Months.css'
import React, { Component } from 'react';

class Months extends Component {

  monthDisplay(call) {
    const monthsArray = [
      {monthName:"Jan", index: 0}, {monthName:"Feb", index: 1}, {monthName:"Mar", index: 2}, {monthName:"Apr", index: 3},
      {monthName:"May", index: 4}, {monthName:"Jun", index: 5}, {monthName:"Jul", index: 6}, {monthName:"Aug", index: 7},
      {monthName:"Sep", index: 8}, {monthName:"Oct", index: 9}, {monthName:"Nov", index: 10}, {monthName:"Dec", index: 11}
    ];
    const monthsToRowArray = [];
    let monthsNum = 0;

    for (var i = 0; i < 3; i++) {
      monthsToRowArray[i] = [];
      for (var k = 0; k < 4; k++) {
        // monthsToRowArray[i].push(monthsArray[monthsNum]);
        monthsToRowArray[i] = [...monthsToRowArray[i], monthsArray[monthsNum] ];
        ++monthsNum;
      };
    };

    return monthsToRowArray.map( (monthArray) => {
      return (
        <tr key={monthsToRowArray.indexOf(monthArray)}>{ monthArray.map((month) => {
            const  classMonth = ((this.props.currentMonth-1) === month.index) ? "currentMonth": "" ;
            return (
                <td key={month.index} className={`tdmonth ${classMonth}`} onClick={()=>this.props.clickedMonth(month.index)}>
                  {month.monthName}
                </td> );
              }
            )
          }
       </tr> );
    });
  }

  render() {
    return (
      <table className="Month">
        <tbody>
           {this.monthDisplay()}
        </tbody>
      </table>
    );
  };
}

export default Months;
