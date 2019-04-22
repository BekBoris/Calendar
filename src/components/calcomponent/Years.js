import '../../style/Years.css';
import React, { Component } from 'react'

class Years extends Component {

  yearsDisplay(currentYear) {
    const startYear= currentYear-currentYear%10-1;
    const twelveYearArray = []
    const yearsToRowArray = []
    let yearNum = 0;


    for (var i = 0; i < 3; i++) {
      yearsToRowArray[i] = [];
      for (var k = 0; k < 4; k++) {
        twelveYearArray.push({year: startYear+yearNum, index: yearNum});
        yearsToRowArray[i].push(twelveYearArray[yearNum]);
        ++yearNum;
      }
    }
    return yearsToRowArray.map((yearArrayLine) => {
      return (
        <tr key={yearsToRowArray.indexOf(yearArrayLine)}>
          {yearArrayLine.map((thisYear) => {
            if (thisYear.index === 0 || thisYear.index === 11) {
              return (
                <td key={thisYear.year}
                    className="decade firstlastone"
                    onClick={() =>{this.props.clickedYear(thisYear.year)}}>
                    {thisYear.year}
                </td>

                );
              } else {
                const curentClassYear = thisYear.year === currentYear ? "thisYear":"";
                return (
                  <td key={thisYear.year}
                      className={`decade ${curentClassYear}`}
                      onClick={() =>{this.props.clickedYear(thisYear.year)}}>
                    {thisYear.year}
                  </td>
                );
              }
          })}
        </tr>
      );
    });

  }


  render() {
    return (
      <table className="Years">
        <tbody>
          {this.yearsDisplay(this.props.currentYear)}
        </tbody>
      </table>);
  }
}

export default Years;
