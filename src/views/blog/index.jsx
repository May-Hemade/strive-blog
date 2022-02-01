import React, { Component } from "react"
import { Container, Image } from "react-bootstrap"
import { withRouter } from "react-router"
import BlogAuthor from "../../components/blog/blog-author"
import BlogLike from "../../components/likes/BlogLike"

import "./styles.css"
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  }

  fetchBlog = async (id) => {
    try {
      let response = await fetch(`http://localhost:3002/blogs/${id}`, {
        method: "GET",
      })
      if (response.ok) {
        let blog = await response.json()
        console.log("Blog", blog)
        this.setState({ blog: blog, loading: false })
      } else {
        this.props.history.push("/404")
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.fetchBlog(id)
  }

  render() {
    const { loading, blog } = this.state
    if (loading) {
      return <div>loading</div>
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      )
    }
  }
}

export default withRouter(Blog)
