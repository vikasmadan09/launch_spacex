import React from 'react';
import { CustomButton } from '../common/CustomButton';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FilterSection = () => {
        const dispatch = useDispatch();
        const history = useHistory();
        const { key } = useSelector((state) => state.data);

    const handleClick = (e,type) => {
        const value = e.target.value;
        let param={}
        const btntxt = value[0].toLowerCase() + value.slice(1);
        const searchStr = `${history.location.search.split('?')[1]}&${type}=${btntxt}`;
        searchStr.split('&').map(item=>{
                let splitItem = item.split('=');
                param[splitItem[0]]=splitItem[1];
                return item;
        });
        param.hasOwnProperty(undefined) && delete param[undefined];
        let queryParam =Object.keys(param).map(key=>`${key}=${param[key]}`).join('&');

        history.push({
            search: `?${queryParam}`,
        });
        dispatch({ type: 'SET_KEY', payload: key + 1 });
    };

    const filterBool = ['True', 'False'];
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
        <Row className='m-1'>
            <Col sm="12" className='filter-section'>
            <h5 className='mt-1'><strong>Filters</strong></h5>
            <div className='launch-yr'>
                <div>
                    <h6 className="text-center font-weight-bold">Launch Year</h6>
                    <hr />
                </div>
                <Row>
                    {filterYears.map((item, ind) => {
                        return <Col sm="6" key={item}  className="filter-bar"><CustomButton key={ind} label={item} type="launch_year" onClick={(e,type)=>handleClick(e,type)} /></Col>;
                    })}
                </Row>
            </div>
            <div>
                <div>
                <h6 className="text-center font-weight-bold">Successful Launch</h6>
                <hr />
                </div>
                <Row>
                    {filterBool.map((item, ind) => {
                        return <Col sm="6" key={item}  className="filter-bar"><CustomButton key={ind} label={item} type="launch_success"  onClick={(e,type)=>handleClick(e,type)}/></Col>;
                    })}
                </Row>
            </div>
            <div>
                <h6 className="text-center font-weight-bold">Successful Landing</h6>
                <hr />
                <Row>
                    {filterBool.map((item, ind) => {
                        return <Col sm="6" key={item} className="filter-bar"><CustomButton key={ind} label={item} type="land_success"  onClick={(e,type)=>handleClick(e,type)} /></Col>;
                    })}
                </Row>
            </div>
            </Col>
        </Row>
    );
};

export default FilterSection;
