import React from 'react';

import ReactCountdownClock from 'react-countdown-clock';
import MediaQuery from 'react-responsive';
import Grid from '@material-ui/core/Grid';

import { GameState } from './constants';

interface ScoreBoardProps {
  // props
  state: string;
  level: number;
  restart: () => {};
}

const ScoreBoard: React.FC<ScoreBoardProps> = props => {
  const {
    // direct props
    state,
    restart,
    level,
  } = props;

  let score;
  let paused;

  switch (state) {
    case GameState.GAME_OVER:
      paused = true;
      score = (
        <div className="col-md-4">
          <h1 className="TwCenMT">Game Over!</h1>
          <button id="tryAgain" className="hover-button" onClick={restart}>
            Try Again
          </button>
          <button className="hover-button">
            {/* TODO replace with handleContinueClick see src/components/common/checkContinueButton.tsx*/}
            {/*<Link to={'/'}>Exit</Link>*/}
          </button>
        </div>
      );
      break;
    case GameState.WON:
      paused = true;
      score = (
        <Grid item md={4}>
          <h2 className="TwCenMT">Score: {this.props.score}</h2>
          <h1 className="TwCenMT">You Won!</h1>
          <button className="hover-button">
            {/* TODO replace with handleContinueClick see src/components/common/checkContinueButton.tsx*/}
            {/*<Link to={'/'}>Continue</Link>*/}
          </button>
        </Grid>
      );
      break;
    case GameState.PAUSED:
      paused = true;
      score = (
        <div>
          <MediaQuery minDeviceWidth={736}>
            <Grid item md={3}>
              <h2 className="TwCenMT">Score: {score}</h2>
            </Grid>
            <Grid item md={3}>
              <h2 className="TwCenMT">Level: {level}</h2>
            </Grid>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={736}>
            <Grid item md={3}>
              <h4 className="TwCenMT text-center">Score: {score}</h4>
              <h4 className="TwCenMT text-center">Level: {level}</h4>
            </Grid>
          </MediaQuery>
        </div>
      );
      break;
    default:
      paused = false;
      score = (
        <Grid item md={8}>
          {/*<MediaQuery minDeviceWidth={736}>*/}
          {/*!!!!!!!!!! In a grid layout, content must be placed
            within columns and only columns may be immediate children of rows. !!!!!!!!!!!*/}
          {/* Fixme: TwCenMT what is this? */}
          <Grid container>
            <Grid item md={6}>
              <h2 className="TwCenMT">Score: {score}</h2>
            </Grid>
            <Grid item md={6}>
              <h2 className="TwCenMT">Level: {level}</h2>
            </Grid>
          </Grid>
        </Grid>
      );
  }
  const clockStyle = {
    height: 100,
    width: 100,
    top: '50%',
    left: '50%',
    display: 'block',
    marginLeft: -100,
    position: 'relative',
    cursor: 'pointer',
  };
  const smallClockStyle = {
    height: 50,
    width: 50,
    top: '50%',
    left: '50%',
    display: 'block',
    marginLeft: -50,
    position: 'relative',
  };
  return (
    <div className="row text-center">
      <div className="col-md-2" />
      <div className="col-md-2 text-center">
        <MediaQuery minDeviceWidth={736}>
          <div style={clockStyle}>
            <ReactCountdownClock
              key={this.state.clockKey}
              seconds={this.props.clockSeconds}
              color="#1baff6"
              alpha={0.9}
              size={100}
              weight={10}
              paused={paused}
              onComplete={this.props.timesUp}
              onClick={this.props.pause}
            />
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={736}>
          <div style={smallClockStyle}>
            <ReactCountdownClock
              key={this.state.clockKey}
              seconds={this.props.clockSeconds}
              color="#1baff6"
              alpha={0.9}
              size={50}
              weight={10}
              paused={paused}
              onComplete={this.props.timesUp}
              onClick={this.props.pause}
            />
          </div>
        </MediaQuery>
      </div>
      {score}
    </div>
  );
};

export default ScoreBoard;

// export class ScoreBoard extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       clockKey: 1,
//       didReset: false
//     }
//   }
//
//   componentDidUpdate () {
//     // This is some hackery that I'm not too happy about. I don't seem to
//     // have access to the underlying clock to tell it to reset when I
//     // want...so I have to force it by giving it a new `key`. But to know
//     // when to reset, there is additional juggling that has to be done
//     // here.
//
//     if (this.props.state == GameState.NEW && !this.state.didReset) {
//       this.setState({clockKey: this.state.clockKey + 1, didReset: true})
//     }
//     if (this.props.state != GameState.NEW && this.state.didReset) {
//       this.setState({didReset: false})
//     }
//   }
//
//   render () {
//     var score
//     var paused
//     switch (this.props.state) {
//       case GameState.GAME_OVER:
//         paused = true
//         score = (
//           <div className='col-md-4'>
//             <h1 className='TwCenMT'>Game Over!</h1>
//             <button id='tryAgain' className='hover-button' onClick={this.props.restart}>Try Again</button>
//             <button className='hover-button'><Link to={'/'}>Exit</Link></button>
//           </div>
//         )
//         break
//       case GameState.WON:
//         paused = true
//         score = (
//           <div className='col-md-4'>
//             <h2 className='TwCenMT'>Score: {this.props.score}</h2>
//             <h1 className='TwCenMT'>You Won!</h1>
//             <button className='hover-button'><Link to={'/'}>Continue</Link></button>
//           </div>
//         )
//         break
//       case GameState.PAUSED:
//         paused = true
//         score = (
//           <div>
//             <MediaQuery minDeviceWidth={736}>
//               <div className='col-md-3 align-left'>
//                 <h2 className='TwCenMT'>Score: {this.props.score}</h2>
//               </div>
//               <div className='col-md-3 align-left'>
//                 <h2 className='TwCenMT'>Level: {this.props.level}</h2>
//               </div>
//             </MediaQuery>
//             <MediaQuery maxDeviceWidth={736}>
//               <div className='col-md-3'>
//                 <h4 className='TwCenMT text-center'>Score: {this.props.score}</h4>
//                 <h4 className='TwCenMT text-center'>Level: {this.props.level}</h4>
//               </div>
//             </MediaQuery>
//           </div>
//         )
//         break
//       default:
//         paused = false
//         score = (
//           <div className='col-md-8'>
//             <div className='row'>
//               {/*<MediaQuery minDeviceWidth={736}>*/}
//               {/* no MediaQuery need to work with bootram sizes*/}
//               {/*!!!!!!!!!! In a grid layout, content must be placed
//             within columns and only columns may be immediate children of rows. !!!!!!!!!!!*/}
//               <div className='col-md-6 col-xs-12 align-left'>
//                 <h2 className='TwCenMT'>Score: {this.props.score}</h2>
//               </div>
//               <div className='col-md-6 col-xs-12 align-left'>
//                 <h2 className='TwCenMT'>Level: {this.props.level}</h2>
//               </div>
//             </div>
//             {/*</MediaQuery>*/}
//             {/*<MediaQuery maxDeviceWidth={736}>*/}
//             {/*<div className='col-md-3 text-center'>*/}
//             {/*<h4 className='TwCenMT'>Score: {this.props.score} Level: {this.props.level}</h4>*/}
//             {/*</div>*/}
//             {/*</MediaQuery>*/}
//           </div>
//         )
//     }
//     var clockStyle = {
//       height: 100,
//       width: 100,
//       top: '50%',
//       left: '50%',
//       display: 'block',
//       marginLeft: -100,
//       position: 'relative',
//       cursor: 'pointer'
//     }
//     var smallClockStyle = {
//       height: 50,
//       width: 50,
//       top: '50%',
//       left: '50%',
//       display: 'block',
//       marginLeft: -50,
//       position: 'relative'
//     }
//     return (
//       <div className='row text-center'>
//         <div className='col-md-2' />
//         <div className='col-md-2 text-center'>
//           <MediaQuery minDeviceWidth={736}>
//             <div style={clockStyle}>
//               <ReactCountdownClock
//                 key={this.state.clockKey}
//                 seconds={this.props.clockSeconds}
//                 color='#1baff6'
//                 alpha={0.9}
//                 size={100}
//                 weight={10}
//                 paused={paused}
//                 onComplete={this.props.timesUp}
//                 onClick={this.props.pause}
//               />
//             </div>
//           </MediaQuery>
//           <MediaQuery maxDeviceWidth={736}>
//             <div style={smallClockStyle}>
//               <ReactCountdownClock
//                 key={this.state.clockKey}
//                 seconds={this.props.clockSeconds}
//                 color='#1baff6'
//                 alpha={0.9}
//                 size={50}
//                 weight={10}
//                 paused={paused}
//                 onComplete={this.props.timesUp}
//                 onClick={this.props.pause}
//               />
//             </div>
//           </MediaQuery>
//         </div>
//         {score}
//       </div>
//     )
//   }
// }
// ScoreBoard.defaultProps = {
//   clockSeconds: 120
// }
