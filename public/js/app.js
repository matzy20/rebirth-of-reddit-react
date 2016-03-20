
var PuppyBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  loadPuppiesFromServer: function(e) {

    $.ajax({
      url: "https://www.reddit.com/r/" + "aww" + ".json",
      method: "GET",
      dataType: "json",
      success: function(data) {
        console.log('data', data);
        this.setState({ data: data.data.children });
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadPuppiesFromServer();
    setInterval(this.loadPuppiesFromServer, 5000);
  },

  render: function() {
    return (
      <div className="puppyBox">
        <RedditForm
          data={this.state.data} />
      </div>
    );
  }
});

var RedditForm = React.createClass({

  // handleUrlChange: function(e) {
  //   this.setState({ url: "https://www.reddit.com/r/" + e.target.value + ".json"})
  // },

  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   var url = this.state.url;
  //   return this.state.url;
  // },

  render: function() {
    var puppyNodes = this.props.data.map(function(puppy, index) {
      return(
        <div key={index}>
          <p><a href={puppy.data.url}>{puppy.data.url}</a></p>
          <img src={puppy.data.thumbnail} />
        </div>
      );
    });
    return (
      <div>
       {puppyNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <PuppyBox />,
  document.getElementById('content')
);