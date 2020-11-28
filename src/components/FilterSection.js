import React from 'react';
import { CustomButton } from '../common/CustomButton';
import { Row, Col } from 'reactstrap';

const FilterSection = () => {
    const filterYears = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
    ];

    return (
        <Row>
            <Col sm="12">
            <strong>Filters</strong>
            <div className='launch-yr'>
                <div>
                    <h6 className="text-center font-weight-bold">Launch Year</h6>
                    <hr />
                </div>
                <Row className="">
                    {filterYears.map((item, ind) => {
                        return <CustomButton key={ind} label={item} type="launch_year" />;
                    })}
                </Row>
            </div>
            <div>
                <div>
                <h6 className="text-center font-weight-bold">Successful Launch</h6>
                <hr />
                </div>
                <Row className="">
                    {['True', 'False'].map((item, ind) => {
                        return <CustomButton key={ind} label={item} type="launch_success" />;
                    })}
                </Row>
            </div>
            <div>
                <h6 className="text-center font-weight-bold">Successful Landing</h6>
                <hr />
                <Row className="">
                    {['True', 'False'].map((item, ind) => {
                        return <CustomButton key={ind} label={item} type="land_success" />;
                    })}
                </Row>
            </div>
            </Col>
        </Row>
    );
};

export default FilterSection;
