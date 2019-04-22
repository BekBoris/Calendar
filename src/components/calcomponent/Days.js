import '../../style/Days.css';

import React, { Component } from 'react';

class Days extends Component {

   dayDisplay = (month, year) => {
    const date = this.props.date;

    const currentYear = this.props.currentDate.getFullYear();
    const currentMonth = this.props.currentDate.getMonth();
    const currentDay = this.props.currentDate.getDate();

    date.setFullYear(year, month, 1);
    const firstDayName = date.getDay();
    const displayedMounth = date.getMonth();

    date.setFullYear(year, month, 1-firstDayName);
    const positionDay = date.getDate();

    const currectionYear = date.getFullYear();
    const correctionMonth = date.getMonth();

    const calendarDayArray = [];
    let dayNum = 0;

    for (var i = 0; i < 6; i++) {
      calendarDayArray[i]=[];
      for (var k = 0; k < 7; k++) {
        date.setFullYear(currectionYear, correctionMonth, positionDay+dayNum);

        const thisDay = (currentYear === date.getFullYear()
              && currentMonth === date.getMonth()
                && currentDay === date.getDate()) ? true : false;


        calendarDayArray[i].push({monthDay: date.getDate(), dayIndex: dayNum, viewMounth: date.getMonth(), thisDay: thisDay });
        ++dayNum;
      }
    };

      const  calendar =  calendarDayArray.map((calArrayLine) => {
        return (
          <tr className="trday" key={calendarDayArray.indexOf(calArrayLine)} >
            {calArrayLine.map((day) => {

              const selectedDay = (month === day.viewMounth && this.props.clickedDayState === day.monthDay) ? "selectedday" : "";

              if (displayedMounth === day.viewMounth) {
                // cheking if this day is current day add thisday class
                if (day.thisDay) {
                  return ( <td className={`tdday thisday`}
                    key={day.dayIndex}
                    onClick={() => this.props.clickedDay(day.monthDay, day.viewMounth)}>{day.monthDay}</td>);
                } else {
                  return (<td className={`tdday ${selectedDay}`}
                    key={day.dayIndex}
                    onClick={() => this.props.clickedDay(day.monthDay, day.viewMounth)}>{day.monthDay}</td>);
                }
              }

              return (<td className="tdday tdother-day"
                          key={day.dayIndex}
                          onClick={() => this.props.clickedDay(day.monthDay, day.viewMounth)}>{day.monthDay}</td>);

            })
          }
          </tr>
        );
      });

    const doubleZero =  (this.props.clickedMinuteState === 0) ? "00" : this.props.clickedMinuteState;

    return (
      <table className="Days">
        <thead>
          <tr>
            <th> Su </th>
            <th> Mo </th>
            <th> Tu </th>
            <th> We </th>
            <th> Th </th>
            <th> Fr </th>
            <th> Sa </th>
          </tr>
        </thead>

        <tbody>
          {calendar}
        </tbody>

        <tfoot>
          <tr>
            <td
              colSpan="7"
              onClick={() => { this.setState((state) => {this.props.timeWindow() } )  } }>
                {`${this.props.clickedHourState}:${doubleZero}`}
              <span>
                {this.props.clickedAmPmState}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };


  // dayDisplay is not set reorder for controler


  render() {
    return (
      <div>
        {this.dayDisplay(this.props.clickedMonthState, this.props.clickedYearState)}
      </div>

   );
 };
}


export default Days;
