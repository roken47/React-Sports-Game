    // to continue into hard and extra mode ... Team Component needs to be converted into a stateless function 'function Team...' instead of Class ...
    class Team extends React.Component {
        constructor(props) {
          super(props);
  
          this.state = {
            score: 0,
            count: 0,
            chance: 0
          }
         this.scored = new Audio("./audio/Ball+Hit+Cheer.mp3")
         this.missed = new Audio("./audio/bat+hit+ball.mp3")
        }
        handleScore = () => {
            this.state.count++; 
            this.missed.play();
            this.setState((state, props) => {
              if(Math.random() > 0.5) {
                return (state.score++, setTimeout(() => {this.scored.play()}, 400))
              } 
            })
            if(this.state.count >= 0) {
              return this.handleMetric()
            }
        }
        handleMetric = () => {
          this.setState((state, props) => {
            return (state.chance = ((state.score / state.count) * 100).toFixed(1))
          })
        }
          render() {
            const show = this.state.count === 0 ? {visibility: "hidden"} : {visibility: "visible"}
            return (
             <div> 
             <h2>{this.props.name}</h2>
             <img src={this.props.logo} height="100px" />
             <br />
             <label>Score: </label><span>{this.state.score}</span><br />
             <label>Shots Taken: </label><span>{this.state.count}</span><br />
             <label style={show}>Shot Percentage: </label><span style={show}>{this.state.chance}%</span><br />
             <button onClick={this.handleScore}> Shoot </button>
              </div>
            )
          }
      }
      
        // An App component under which all other components will be added
        class Game extends React.Component {
          constructor(props) {
            super(props);
            this.venue = "Lanxess Arena"
          }
          render() {
          return (
            <div className="app">
              <h1 id="welcome">Welcome to {this.venue}!</h1>
              <div className="teams">{homeTeam}<br />
              {awayTeam}</div>
            </div>
          );
          }
      }
      // Or could include below inside Game component as <Team blah="" blah="" />
        const homeTeam = <Team name="Fnatic" logo="./images/Fnatic.png" />
        const awayTeam = <Team name="Navi" logo="./images/Natus_Vincere.png" />
  
        // Render the App
        ReactDOM.render(<Game />, document.getElementById("root"));