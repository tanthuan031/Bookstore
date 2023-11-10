import * as React from "react";

import AboutUs from "../../components/layouts/About/AboutUs.js";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="py-4 flex-grow-1">
                <main>
                    <Helmet>
                        <title>About | Bookworm</title>
                    </Helmet>

                    <section>
                        <p className="font-weight-bold font-20px">About Us</p>
                        <div className="app-divide my-4"></div>
                        <AboutUs />
                    </section>
                </main>
            </Container>
        );
    }
}

export default About;
