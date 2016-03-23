
var RedditBox = React.createClass({
  getInitialState: function() {
    return { data: [], redditTopic: '' };
  },

  loadRedditFromServer: function(e) {

    $.ajax({
      url: "https://www.reddit.com/r/" + redditTopic + ".json",
      method: "GET",
      dataType: "json",
      success: function(data) {
        console.log('data', data);
        this.setState({ data: data.data.children });
      }.bind(this)
    });
  },

  handleInputSubmit: function(topic) {

    $.ajax({
      url: "https://www.reddit.com/r/" + redditTopic + ".json",
      method: 'POST',
      dataType: 'json',
      data: topic,
      success: function(data) {
        this.setState({ data: this.state.data.concat(data) });
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadRedditFromServer();
    setInterval(this.loadRedditFromServer, 5000);
  },

  render: function() {
    return (
      <div className="redditBox">
        <RedditForm
          onTopicSubmt={this.handleInputSubmit}
        />
        <RedditList
          data={this.state.data}
        />
      </div>
    );
  }
});

var RedditForm = React.createClass({
  getInitialState: function() {
    return { redditTopic: ''};
  },

  handleRedditChange: function(e) {
    this.setState({ redditTopic: e.target.value })
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var redditTopic = this.state.redditTopic;

    this.props.onTopicSubmit({ redditTopic: redditTopic });
    this.setState({ redditTopic: '' });

  },

  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Reddit Topic"
          value={this.state.redditTopic}
          onChange={this.handleRedditChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
});



var RedditList = React.createClass({

  render: function() {
    var redditNodes = this.props.data.map(function(reddit, index) {
      return(
        <div key={index}>
          <p><a href={reddit.data.url}>{reddit.data.url}</a></p>
          <img src={reddit.data.thumbnail} />
        </div>
      );
    });
    return (
      <div>
       {redditNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <RedditBox />,
  document.getElementById('content')
);