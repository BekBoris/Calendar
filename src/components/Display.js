import '../style/Display.css';
import React, { Component } from 'react';
// controler in first display
import Time from './calcomponent/Time';
import Days from './calcomponent/Days';
import Months from './calcomponent/Months';
import Years from './calcomponent/Years';


class Display extends Component {

  // bring new Date to here get shorter names
  constructor(props) {
    super();
    this.date = new Date();
    this.currentDate = new Date();

    this.state = {clickedDayState: this.date.getDate(), clickedMonthState: this.date.getMonth(), clickedYearState: this.date.getFullYear(),
                  // current Number is for determine wich component to display with switchOnClickContent
                  currentDisplayingNum: 0,
                  // this line represent time
                  clickedHourState: 12, clickedMinuteState: '00', clickedAmPmState:"PM" };

    this.clickedMonth = this.clickedMonth.bind(this)
    this.clickedYear = this.clickedYear.bind(this);
    this.clickedDay = this.clickedDay.bind(this);
    this.clickedTime = this.clickedTime.bind(this);
    this.timeWindow = this.timeWindow.bind(this);
  }

  // function for time window for switchbar
  timeWindow() {
    return this.setState({currentDisplayingNum: -1});
  };

  // change time is with click
  clickedTime({hours, minutes, amPm}) {
    return this.setState((state) => {
      this.props.dataInfoUpdate("time", arguments[0]);
      return state = {...state, clickedHourState: hours, clickedMinuteState: minutes, clickedAmPmState: amPm};
    });
  };

  // change state of day with click
  clickedDay(day, month){
    this.date.setMonth(this.state.clickedMonthState);
    return this.setState({clickedDayState: day, clickedMonthState: month});

  };


  // function for chlicked month;
  clickedMonth(month) {
    return this.setState((state) => {
      this.date.setMonth(month);
      this.props.dataInfoUpdate("clickedMonthState", month);
      return state = { ...state, clickedMonthState: month, currentDisplayingNum: 0};

    });
  }
  // function for ckicked Year;
  clickedYear(year) {
    return this.setState( (state) => {
      this.props.dataInfoUpdate("clickedYearState", year);
      return state = { ...state, clickedYearState: year, currentDisplayingNum: 1};
    });
  }

  // function for displaying content for curent click or on first start up:
  switchOnClickContent(currentDisplayingNum) {
    const currentContent = (component) => {
      return <div>{component}</div>;
    };

    switch (currentDisplayingNum) {
      case -1:
          return currentContent(<Time clickedTime={this.clickedTime}/>);
      case 1:
        return currentContent(<Months clickedMonth={this.clickedMonth}
                                      currentMonth={this.date.getMonth()}/>);
      case 2:
        return currentContent(<Years clickedYear={this.clickedYear}
                                     currentYear={this.state.clickedYearState}/>);

      default:
        return currentContent( <Days clickedMonthState={this.state.clickedMonthState}
                                     clickedYearState={this.state.clickedYearState}
                                     clickedDayState={this.state.clickedDayState}
                                     clickedDay={this.clickedDay}

                                     date={this.date}
                                     currentDate={this.currentDate}

                                     timeWindow={this.timeWindow}
                                     clickedHourState={this.state.clickedHourState}
                                     clickedMinuteState={this.state.clickedMinuteState}
                                     clickedAmPmState={this.state.clickedAmPmState}/>);

    }
  }

  // function for information
  displayBar(infoNum) {

    const monthList = ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"]

    switch (infoNum) {

      case -1:
        return `${this.state.clickedDayState}/${this.date.getMonth()}/${this.state.clickedYearState}`;

      case 1:
        return this.state.clickedYearState;

      case 2:
                //  why we could not use date get full year
        return (`${this.state.clickedYearState  - this.state.clickedYearState %10 - 1}
                  - ${this.state.clickedYearState  - this.state.clickedYearState %10+10}`);

      default:
        // test not sure
        this.date.setFullYear(this.state.clickedYearState, this.state.clickedMonthState, this.state.clickedDayState)
        return `${monthList[this.date.getMonth()]} ${this.date.getFullYear()}`;



    }
  }

  // function for next year or month
  nextOrPrevious(num){
    if (this.state.currentDisplayingNum === 0) {
      return this.setState((state) => state.clickedMonthState = state.clickedMonthState + num)
    } else if (this.state.currentDisplayingNum === 2) {
      return this.setState((state) => state.clickedYearState = state.clickedYearState + (num*10))
    }
  }

  //  function for switching from day to month to year
  displayBarSwitch(num) {
    if ((this.state.currentDisplayingNum + 1) <= 2) {
      return this.setState(state => state.currentDisplayingNum = state.currentDisplayingNum + num );
    }
  }

  render() {
    return (
      <div className="displayCont">
        <div>
          <table className="Display">
            <tbody>
              <tr>
                <td onClick={() => this.nextOrPrevious(-1)}> <span> &#10096; </span> </td>
                <td onClick={() => {this.displayBarSwitch(1)}}  style={{maxWidth: "40px"}}>{this.displayBar(this.state.currentDisplayingNum)}</td>
                <td onClick={() => this.nextOrPrevious(1)}> <span> &#10097; </span> </td>
              </tr>
            </tbody>
          </table>

        </div>
        <div>
          {this.switchOnClickContent(this.state.currentDisplayingNum)}
        </div>
      </div>);
  }
}

export default Display;
