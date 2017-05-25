import React, { Component } from 'react';
import { DropDownMenu, TextField, MenuItem } from 'material-ui';

export default class Url extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            url: "0.0.0.0"
        };
    }
    
    handleUrl = () => {
        let cburl = null;
        if (this.state.value === 1) {
            cburl = 'http://';
        } else {
            cburl = 'https://';
        }
        
        cburl += this.state.url;
        
        this.props.handleUrlChange(cburl);
    };
    
    handleChange = (event, index, value) => {
        this.setState({value});
        this.handleUrl();
    }
    
    handleAdressChange = (e) => {
        this.setState({ url: e.target.value }, function () {
            this.handleUrl();
        });
    }
    
    render() {
        let requireAddress;
        if (this.props.wasFailed && !this.state.url) {
            requireAddress = 'Address is required!';
        }
        
        return (
        <div>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="http://" />
                <MenuItem value={2} primaryText="https://" />
            </DropDownMenu>
        
            <TextField
                label="url"
                floatingLabelText="url"
                floatingLabelFixed={true}
                onChange={this.handleAdressChange}
                errorText={requireAddress}
            />
        
        </div>
        );
    }
}