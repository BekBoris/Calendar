import '../../style/Time.css';
import React, { Component } from 'react';

 class Time extends Component {
  constructor() {
    super();
    this.state = { hours: 12, minutes: "00", amPm: "AM" }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hours !== prevState.hours ||
          this.state.minutes !== prevState.minutes ||
            this.state.amPm !== prevState.amPm ) {

      return  this.props.clickedTime(this.state);
    }
  }

  hourMove(oneHour) {
    return this.setState((state) => {
      if ( (state.hours + oneHour) > 12 ) {
        return state = { ...state, hours: 0};
      } else if ( (state.hours + oneHour ) < 0) {
          return state = { ...state, hours: 12};;
      }
      return state = { ...state, hours:state.hours + oneHour};

    });
  };

    minutesMove(oneMinute) {
      this.setState((state) => {

        const toTwoDigites = (number) => {
          if (number >= 0 && number < 10) {
            return `0${number}`;
          }
          return number;
        };

        const toNumber = Number(state.minutes);

        if ( (toNumber + oneMinute) > 60 ) {
          return state = {...state, minutes:toTwoDigites(0)};
        } else if ( (toNumber + oneMinute) < 0 ) {
            return state = {...state, minutes:toTwoDigites(60)};;
        }
        return state = {...state, minutes: toTwoDigites((toNumber + oneMinute))};
      });
    };

    ampmMove(afterBefore) {
     this.setState((state) => {
       if (state.amPm === "AM") {
         return state = {...state, amPm: "PM"};
       } else if (state.amPm === "PM") {
          return state = {...state, amPm: "AM"};
       }
     });
   };

  render() {
    return (
      <table className="Time">
        <tbody>
          <tr>
            <td>
              <div className="Time_cont">

                <div>
                  <span onMouseDown={() => { this.hourMove(1) }}> &#9650; </span>
                  <div>{ this.state.hours } </div>
                  <span onMouseDown={() => { this.hourMove(-1) }}> &#9660; </span>
                </div>

                <div> : </div>

                <div>
                  <span onMouseDown={() => { this.minutesMove(1) } }> &#9650; </span>
                  <div> { this.state.minutes } </div>
                  <span onMouseDown={() => { this.minutesMove(-1) } }> &#9660; </span>
                </div>

                <div>
                  <span onMouseDown={ () => { this.ampmMove()} }> &#9650; </span>
                  <div> {this.state.amPm } </div>
                  <span onMouseDown={ () => { this.ampmMove()} }> &#9660; </span>
                </div>



              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
}

export default Time;
