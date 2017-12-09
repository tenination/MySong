import React from 'react';
import { Button } from 'semantic-ui-react';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }
  handleClick() {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render(props) {
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)} color="red">
          {this.props.follow.username}
        </Button>
        {this.state.isVisible &&
          (
            <div>
              <Button>{this.props.follow.song}</Button>
              <Button>{this.props.follow.note}</Button>
            </div>
          )
        }
      </div>
    );
  }
}



export default Following;