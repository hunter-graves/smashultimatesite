var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;



//Show blog posts
class ShowPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts:[]
      };
    }
     
   
    componentDidMount(){
      var self = this;
     
      axios.post('/getPost', {
        
      })
      .then(function (response) {
        self.setState({posts:response.data})
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }



    render() {
      return (
        <div className="list-group"> 
 
        {
          this.state.posts.map(function(post,index) {
             return <a href="#" key={index} className="list-group-item active">
                      <h4 className="list-group-item-heading">{post.title}</h4>
                      <p className="list-group-item-text">{post.subject}</p>
                    </a>
          })
        }
         
      </div>
      )
    }
}

//Create blog post
class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
          title:'',
          subject:''
        };
      }


    //Handle title and subject change for creating blog post
    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleSubjectChange(e){
        this.setState({subject:e.target.value})
    }


    //Post add post to send to backend
    addPost(){
        axios.post('/addpost', {
          title: this.state.title,
          subject: this.state.subject
        })
        .then(function (response) {
          console.log('response from add post is ',response);
          hashHistory.push('/')
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    render() {
        return (
            <div className="col-md-5">
              <div className="form-area">  
                  <form role="form">
                  <br styles="clear:both" />  
                  <button className="btn btn-primary pull-right" onClick={this.addPost}  type="button">Add Post</button>
                  <div className="form-group">
                        <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                    </div>
 
                    <div className="form-group">
                        <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                    </div>
                  </form>

              </div>
            </div>
          )
    }

    
}
ReactDOM.render(
  <Router history={hashHistory}>
      <Route component={ShowPost} path="/"></Route>
      <Route component={AddPost} path="/addpost"></Route>
  </Router>,
document.getElementById('app'));


