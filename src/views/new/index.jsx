import React from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button } from "react-bootstrap"
import "./styles.css"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function NewBlogPost() {
  const { register, handleSubmit, setValue, watch } = useForm()

  const postBlog = async (data) => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL
      let response = await fetch(`${apiUrl}/blogs`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        console.log("Posted")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (data, e) => {
    console.log(data)
    e.preventDefault()
    postBlog(data)
  }

  useEffect(() => {
    register("content")
  }, [register])

  const onEditorStateChange = (editorState) => {
    setValue("content", editorState)
  }
  const editorContent = watch("content")

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" {...register("title")} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" {...register("category")}>
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={editorContent}
            onChange={onEditorStateChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}
