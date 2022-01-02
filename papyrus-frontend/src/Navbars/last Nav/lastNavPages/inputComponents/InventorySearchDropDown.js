import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { getInventory } from '../../../../api/AllCategories/inventory';
import Select from 'react-select';

const Provenance = ({ handleChange }) => {

    const [values, setValues,selectedOption] = useState({
        Inventory: []
    });
 
    const loadInventory = () => {
        getInventory()
            .then((data) => {
                if (data.error) {
                    console.log(data.error, 'load Inventory');
                } else {
                    setValues({
                        ...values,
                        Inventory: data,
                        formData: new FormData(),
                    })
                }
            })
            .catch((err) => console.log(err, 'error in get all Inventory'));
    }

    useEffect(() => {
        loadInventory();
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
                    <Select name="inventory"
        value={selectedOption}
        onChange={handleChange}
        
      options=  
        {values.Inventory.map((e, key) => {
        return {"label":e.name,"value":e.name};
    })}/>
        </Fragment>
    )
}

export default Provenance;
