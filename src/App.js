import React from 'react';
import { Grid } from '@material-ui/core';

import youtube from './api/youtube';

import { SearchBar, VideoDetail, VideoList} from './components';

class App extends React.Component {

    state = {
        video : [],
        selectedVideo : null,
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search',{
            params: {
                part: 'snippet',
                maxResult: 5,
                key: 'ADD your API key here',
                q: searchTerm,
            }
        });
        console.log(response.data.items);
        
        this.setState({video : response.data.items, selectedVideo : response.data.items[0]});
    }

    onVideoSelect = (video) =>{
        this.setState({selectedVideo : video})
    }

    componentDidMount(){
        this.handleSubmit('MacBookPro 2020');
    }

    render(){
        const {selectedVideo, video} = this.state;
        return(
            <Grid justify='center' container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit = { this.handleSubmit } />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={ selectedVideo } />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList video = { video } onVideoSelect = {this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;