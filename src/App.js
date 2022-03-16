import React from "react"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./views/home"
import Blog from "./views/blog"
import NewBlogPost from "./views/new"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "./components/login"
import Register from "./components/register"

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} />

      <Route path="/login" excat component={Login} />
      <Route path="/register" exact component={Register} />
      <Footer />
    </BrowserRouter>
  )
}

export default App
