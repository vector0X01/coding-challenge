import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Modal from '../components/Modal';

const Features = (props) => {
  const { geoJSONData = [], show, handleClose } = props;
  const [searchValue, setSearchValue] = useState('');
  const [dataCount, setDataCount] = useState(50);
  const [propExpand, setPropExpand] = useState([]);
  const [geometryExpand, setGeometryExpand] = useState([]);
  const [radioValue, setRadioValue] = useState('all');

  const radioList = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Buildings',
      value: 'building'
    },
    {
      label: 'Routes',
      value: 'route'
    },
    {
      label: 'Others',
      value: 'others'
    }
  ];

  const renderFilter = () => (
    <>
      <input
        placeholder="Search: id, type, name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {radioList.map((item) => (
        <div
          key={item.value}
          className={clsx('filter-radio', { active: radioValue === item.value })}
          onClick={() => setRadioValue(item.value)}>
          {item.label}
        </div>
      ))}
      <div className="count">Total Count: {geoJSON.length}</div>
    </>
  );

  const checkSubString = (str = '') => {
    return str.toLowerCase().includes(searchValue.toLowerCase());
  };

  const geoJSON = useMemo(() => {
    let data = geoJSONData;
    if (searchValue) {
      data = data.filter(
        (item) =>
          checkSubString(item.id) ||
          checkSubString(item.type) ||
          checkSubString(item.properties?.name)
      );
    }
    if (radioValue === 'route') {
      data = data.filter((item) => item.properties.route);
    } else if (radioValue === 'building') {
      data = data.filter((item) => item.properties.building);
    } else if (radioValue === 'others') {
      data = data.filter((item) => !item.properties.route && !item.properties.building);
    }
    return data;
  }, [searchValue, radioValue, geoJSONData]);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      const rem = geoJSONData.length - dataCount;
      if (rem > 50) setDataCount((prev) => prev + 50);
      else setDataCount((prev) => prev + rem);
    }
  };

  const handleExpand = (state, setState, i) => {
    if (state.includes(i)) {
      setState(state.filter((item) => item !== i));
    } else {
      setState((prev) => [...prev, i]);
    }
  };

  return (
    <Modal
      title="Feature Collection"
      onClose={handleClose}
      show={show}
      filter={renderFilter}
      handleScroll={handleScroll}>
      <div data-testid="features" className="list">
        {geoJSON?.slice(0, dataCount)?.map((item, i) => (
          <div className="card" key={item.id}>
            <div>
              <b>ID:</b> <span>{item.id}</span>
            </div>
            <div>
              <b>Type:</b> <span>{item.type}</span>
            </div>
            {item.properties?.name ? (
              <div>
                <b>Name:</b> <span>{item.properties.name}</span>
              </div>
            ) : null}
            <div>
              <b>Properties</b>
              <span
                className="toggle-btn"
                onClick={() => handleExpand(propExpand, setPropExpand, i)}>
                {propExpand.includes(i) ? '-' : '+'}
              </span>
              {propExpand.includes(i) ? (
                <div className="properties">
                  {Object.entries(item.properties).map(([key, value]) => (
                    <div key={key}>
                      <div>
                        <b>
                          {key}
                          {': '}
                        </b>
                        <span>{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div>
              <b>Geometry</b>
              <span
                className="toggle-btn"
                onClick={() => handleExpand(geometryExpand, setGeometryExpand, i)}>
                {geometryExpand.includes(i) ? '-' : '+'}
              </span>
              {geometryExpand.includes(i) ? (
                <div className="properties">
                  {Object.entries(item.geometry).map(([key, value]) => (
                    <div key={key}>
                      <div>
                        <b>
                          {key}
                          {': '}
                        </b>
                        <span>{JSON.stringify(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {!geoJSON.length ? <div>No Data</div> : null}
      </div>
    </Modal>
  );
};

export default Features;
