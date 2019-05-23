import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';


let baseUrl = "https://practiceapi.devmountain.com/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  //already here
  componentDidMount() {
    axios.get(`${baseUrl}/posts`)
    .then(results => {
      this.setState({ posts: results.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  updatePost( id, text) {
    axios.put(`${baseUrl}/posts?id=${id}`, { text })
    .then(results =>{
      this.setState({posts: results.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${id}`)
    .then(results => {
      this.setState({posts: results.data})
    })
    .catch(err => {
      console.log(err)
    })
  }
  //created earlier
  createPost(text) {
    axios.post(`${baseUrl}/posts`, { text })
    .then(results => {
      this.setState({ posts: results.data});
    });
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose  createPostFn= {this.createPost }/>
          {
            posts.map(post =>(
              <post key={post.id}
                    text={post.text}
                    date={post.date}
                    id={ post.id}
                    updatePostFn={ this.updatePost }
                    deletePostFn={this.deletePost}
                    />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
