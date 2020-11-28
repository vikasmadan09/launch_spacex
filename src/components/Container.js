import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container as Compound , Col, Row } from 'reactstrap';

import Result from './Result';
import FilterSection from './FilterSection';
import NotFound from './NotFound';

const Container = ()=>{
    return (
        <div >
            <Compound fluid className="main-container" >
                <Row className="pl-2">
                    <h2><strong>SpaceX Launch Programs</strong></h2>
                </Row>
                <Row className="pl-2">
                    <Col md="2" style={{ backgroundColor: '#ffff' }}>
                        <FilterSection />
                    </Col>
                    <Col md="10">
                        <Switch>
                            <Route exact path="/" component={Result} />
                            <Route component={NotFound} />
                        </Switch>
                    </Col>
                </Row>

                <div className="text-center mt-2 ">
                    <strong>Developed by</strong>: Vikas Madan
                </div>
            </Compound>
        </div>
    )
}

export default Container;