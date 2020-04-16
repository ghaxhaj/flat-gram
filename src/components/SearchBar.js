import React, {Component} from 'react';

class SearchBar extends Component
{

    render(){
            
        return(
        
            <div className='searchBar'>
                
                    <input  name='name' type='text'
                            onChange={this.props.handleSearchChange} 
                            value={this.props.searchTerm}
                            placeholder="🔍 Search User"
                    
                    />
    
            </div>
        )
    } 
}     


    export default SearchBar;