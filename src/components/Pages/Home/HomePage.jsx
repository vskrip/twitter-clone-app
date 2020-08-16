import React from "react";
import { Container } from "react-bootstrap";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Container>
        {/* Page Title */}
        <h2>
          <span className="page-title">Twitter Clone Application</span>
        </h2>
        {/* End Page Title */}
        {/* Page Content */}
        <p>This is a Web Client Application for Twitter Clone API Server.</p>
        <h3>
          <a href="/twitts">TWITTS</a>
        </h3>
        {/* End Page Content */}
      </Container>
    </div>
  );
};

export default HomePage;
