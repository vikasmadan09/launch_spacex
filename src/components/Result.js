import React, { useEffect } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Col, Row, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { filteredResults } from '../actions/filteredResults';
import { useSSR } from '../common/useSSR';

const Result = ({ location }) => {
    const dispatch = useDispatch();
    const { loading, filterData, key } = useSelector((state) => state.data);

    const isSsr = useSSR();

    useEffect(() => {
        //ensure api is called only if filter is applied, not during initial render
       if (key) {
           dispatch(filteredResults(location.search));
        }

    }, [dispatch, location, key]);

    if (loading) {
        return <Spinner className="loader" color="primary" />;
    }

    return (
        <>
            <Row>
                {filterData?.length > 0 ? (
                    filterData.map(({ links, mission_name, flight_number, mission_id,launch_year,launch_success, rocket }) => {
                        return (
                            <React.Fragment key={flight_number}>
                                <Col sm='3'className="mb-2 card-deck">
                                <Card className="p-2 h-100 m-auto">
                                    <CardImg
                                        top
                                        width="100%"
                                        className="card-image w-100 h-100"
                                        src={!isSsr && window.innerWidth < 700 ? links.mission_patch_small : links.mission_patch}
                                        alt={`${mission_name} #${flight_number}`}
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5"><strong>{`${mission_name} #${flight_number}`}</strong></CardTitle>
                                        <CardText tag="div" className="small">
                                            <Row>
                                                <Col sm="12" className="font-weight-bold ml-3">
                                                    <Row><strong>Mission Ids: </strong></Row>
                                                    <Col><ul style={{whiteSpace:'pre'}}>{mission_id.map((item,ind)=>{
                                                        return(<li key={ind}>{item}</li>)
                                                    })}</ul></Col>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="8" className="font-weight-bold">
                                                    <strong>Launch year: </strong>
                                                   
                                                </Col>

                                                <Col sm="4">
                                                    <div style={{whiteSpace:'pre'}}>{launch_year}</div>
                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="8" className="font-weight-bold">
                                                    <strong>Successful Launch: </strong>
                                                 </Col>

                                                <Col sm="4">
                                                    <div style={{whiteSpace:'pre'}}>{`${launch_success}`}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="8" className="font-weight-bold">
                                                    <strong>Successful Landing: </strong>
                                                </Col>

                                                <Col sm="4">
                                                <div style={{whiteSpace:'pre'}}>{`${rocket?.first_stage?.cores.length>0? rocket.first_stage.cores[0].land_success:'false'}`}</div>
                                                </Col>
                                            </Row>
                                        </CardText>
                                    </CardBody>
                                </Card>
                                </Col>
                            </React.Fragment>
                        );
                    })
                ) : (
                    <div className='no-records'>
                        No records found
                    </div>
                )}
                </Row>
        </>
    );
};

export default Result;
