import React from 'react';
import axios from 'axios';

class NutritionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    weightChange = (g) => {
        if (g.target.value) {
            let totalCalories = (g.target.value * this.state.calories) / this.state.weight

            // bicycle leisure
            let bicycle_leisure = totalCalories / 300
            var bl_rhours = Math.floor(bicycle_leisure);
            var bl_minutes = (bicycle_leisure - bl_rhours) * 60;
            var bl_rminutes = Math.round(bl_minutes);
            var bicycle_leisure_hours = bl_rhours + " hour(s) and " + bl_rminutes + " minute(s)";

            // running leisure
            let running_leisure = totalCalories / 400
            var rl_rhours = Math.floor(running_leisure);
            var rl_minutes = (running_leisure - rl_rhours) * 60;
            var rl_rminutes = Math.round(rl_minutes);
            var running_leisure_hours = rl_rhours + " hour(s) and " + rl_rminutes + " minute(s)";

            // running moderate
            let running_moderate = totalCalories / 400
            var rm_rhours = Math.floor(running_moderate);
            var rm_minutes = (running_moderate - rm_rhours) * 60;
            var rm_rminutes = Math.round(rm_minutes);
            var running_moderate_hours = rm_rhours + " hour(s) and " + rm_rminutes + " minute(s)";

            // basketball
            let basketball = totalCalories / 550
            var b_rhours = Math.floor(basketball);
            var b_minutes = (basketball - b_rhours) * 60;
            var b_rminutes = Math.round(b_minutes);
            var basketball_hours = b_rhours + " hour(s) and " + b_rminutes + " minute(s)";

            // swimming
            let swimming = totalCalories / 720
            var s_rhours = Math.floor(swimming);
            var s_minutes = (swimming - s_rhours) * 60;
            var s_rminutes = Math.round(s_minutes);
            var swimming_hours = s_rhours + " hour(s) and " + s_rminutes + " minute(s)";

            // badminton
            let badminton = totalCalories / 400
            var b_rhours = Math.floor(badminton);
            var b_minutes = (badminton - b_rhours) * 60;
            var b_rminutes = Math.round(b_minutes);
            var badminton_hours = b_rhours + " hour(s) and " + b_rminutes + " minute(s)";

            // soccer
            let soccer = totalCalories / 610
            var so_rhours = Math.floor(soccer);
            var so_minutes = (soccer - so_rhours) * 60;
            var so_rminutes = Math.round(so_minutes);
            var soccer_hours = so_rhours + " hour(s) and " + so_rminutes + " minute(s)";


            this.setState({
                totalCalories: totalCalories,
                bicycle_leisure_hours: bicycle_leisure_hours,
                running_leisure_hours: running_leisure_hours,
                running_moderate_hours: running_moderate_hours,
                basketball_hours: basketball_hours,
                swimming_hours: swimming_hours,
                badminton_hours: badminton_hours,
                soccer_hours: soccer_hours,
            })
        }
        else {
            let totalCalories = this.state.calories

            // bicycle leisure
            let bicycle_leisure = totalCalories / 300
            var bl_rhours = Math.floor(bicycle_leisure);
            var bl_minutes = (bicycle_leisure - bl_rhours) * 60;
            var bl_rminutes = Math.round(bl_minutes);
            var bicycle_leisure_hours = bl_rhours + " hour(s) and " + bl_rminutes + " minute(s)";

            // running leisure
            let running_leisure = totalCalories / 400
            var rl_rhours = Math.floor(running_leisure);
            var rl_minutes = (running_leisure - rl_rhours) * 60;
            var rl_rminutes = Math.round(rl_minutes);
            var running_leisure_hours = rl_rhours + " hour(s) and " + rl_rminutes + " minute(s)";

            // running moderate
            let running_moderate = totalCalories / 400
            var rm_rhours = Math.floor(running_moderate);
            var rm_minutes = (running_moderate - rm_rhours) * 60;
            var rm_rminutes = Math.round(rm_minutes);
            var running_moderate_hours = rm_rhours + " hour(s) and " + rm_rminutes + " minute(s)";

            // basketball
            let basketball = totalCalories / 550
            var b_rhours = Math.floor(basketball);
            var b_minutes = (basketball - b_rhours) * 60;
            var b_rminutes = Math.round(b_minutes);
            var basketball_hours = b_rhours + " hour(s) and " + b_rminutes + " minute(s)";

            // swimming
            let swimming = totalCalories / 720
            var s_rhours = Math.floor(swimming);
            var s_minutes = (swimming - s_rhours) * 60;
            var s_rminutes = Math.round(s_minutes);
            var swimming_hours = s_rhours + " hour(s) and " + s_rminutes + " minute(s)";

            // badminton
            let badminton = totalCalories / 400
            var b_rhours = Math.floor(badminton);
            var b_minutes = (badminton - b_rhours) * 60;
            var b_rminutes = Math.round(b_minutes);
            var badminton_hours = b_rhours + " hour(s) and " + b_rminutes + " minute(s)";

            // soccer
            let soccer = totalCalories / 610
            var so_rhours = Math.floor(soccer);
            var so_minutes = (soccer - so_rhours) * 60;
            var so_rminutes = Math.round(so_minutes);
            var soccer_hours = so_rhours + " hour(s) and " + so_rminutes + " minute(s)";


            this.setState({
                totalCalories: totalCalories,
                bicycle_leisure_hours: bicycle_leisure_hours,
                running_leisure_hours: running_leisure_hours,
                running_moderate_hours: running_moderate_hours,
                basketball_hours: basketball_hours,
                swimming_hours: swimming_hours,
                badminton_hours: badminton_hours,
                soccer_hours: soccer_hours,
            })


        }
    }

    componentDidMount = () => {
        axios.get(
            `https://api.edamam.com/api/nutrition-data?app_id=822bb630&app_key=d74cb239cde3432c61110f49c24e8012&ingr=1%20${this.props.match.params.food}`
        )
            .then(results => {
                this.setState({
                    calories: results.data.calories,
                    weight: results.data.totalWeight
                })

            })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <div>Calories gained: {this.state.calories} per {this.state.weight}g</div><br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>Activity required to burn <input style={{
                    width: '100px',
                    height: '30px',
                    marginRight: '14px',
                    marginLeft: '14px'
                }} onChange={g => this.weightChange(g)} name="calorieAmount" type="text" className="form-control" id="" aria-describedby="" placeholder={this.state.weight} /> grams of {this.props.match.params.food}</div>
                {/* <img style={{ width: '600px' }} src={chart}></img> */}
                <br></br>
                <div> Total Calories: {this.state.totalCalories} </div>
                <div> {this.state.bicycle_leisure_hours} Cycling </div>
                <div> {this.state.running_leisure_hours} Jogging</div>
                <div> {this.state.running_moderate_hours} Running</div>
                <div> {this.state.basketball_hours} Basketball</div>
                <div> {this.state.swimming_hours} Swimming</div>
                <div> {this.state.badminton_hours} Badminton</div>
                <div> {this.state.soccer_hours} Soccer</div>


            </div>
        )
    }
}
export default NutritionList;