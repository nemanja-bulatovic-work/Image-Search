import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ImageResults from '../image-result/imageResult'

class Search extends React.Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '12827923-0ebd47975da228a4c43313b99',
        images: []
    } 

    onTextChange = (e) => {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value},
            () => {
                if(e.target.value === ''){
                    this.setState({
                        images: []
                    })
                }else{
                    fetch(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res => {
                        return res.json()
                    }).then(res => {
                        this.setState({
                            images: res.hits
                        })
                    }).catch(error => {
                        alert(error)
                    })
                }
            }
        )
    }

    onAmountChange = (e, index, value )=> {
        this.setState({
            amount: value
        })
    }

    render(){
        return(
            <div>
                <TextField name='searchText' value={this.state.searchText} onChange={this.onTextChange} floatingLabelText='Search for images' fullWidth={true}>

                </TextField>
                <br />
                <SelectField name="amount" value={this.state.amount} floatingLabelText="Frequency" value={this.state.amount} onChange={this.onAmountChange}>
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                {this.state.images.length > 0 ? <ImageResults images={this.state.images}/> : null}
            </div>
        )
    }
}

export default Search