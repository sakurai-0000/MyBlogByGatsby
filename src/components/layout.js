import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      <Nav />
      {children}
      <Footer />
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
