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
        function Game(props) {
          return (
            <div className="Game">
              <h1 id="welcome">Welcome to {props.venue}!</h1>
              <div className="teams"><Team name={props.homeTeam.name} logo={props.homeTeam.logo} /><br />
              <Team name={props.awayTeam.name} logo={props.awayTeam.logo} /></div>
            </div>
          );
          
      }
      function App(props) {
        const fnatic = { name:"Fnatic", logo: "./images/Fnatic.png" }
        const navi = { name: "Navi", logo: "./images/Natus_Vincere.png" }
          return (
              <div className="App">
                  <Game venue="Lanxess Arena"
                        homeTeam={fnatic}
                        awayTeam={navi}
                  />
              </div>
          )
      }
  
        // Render the App
        ReactDOM.render(<App />, document.getElementById("root"));