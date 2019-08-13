import React from 'react';
import axios from 'axios'

class NutritionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
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
            <div>Calories gained: {this.state.calories} per {this.state.weight}</div>
        )
    }
}
export default NutritionList;