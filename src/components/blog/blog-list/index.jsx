import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"
export default class BlogList extends Component {
  state = { blogs: [] }

  fetchBlogs = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL
      let response = await fetch(`${apiUrl}/blogs`, {
        method: "GET",
      })
      if (response.ok) {
        let blogs = await response.json()
        console.log("Blogs", blogs)
        this.setState({ blogs: blogs })
      }
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount = () => {
    this.fetchBlogs()
  }
  render() {
    return (
      <Row>
        {this.state.blogs.map((post) => (
          <Col key={post.id} md={4} style={{ marginBottom: 50 }}>
            <BlogItem {...post} />
          </Col>
        ))}
      </Row>
    )
  }
}
