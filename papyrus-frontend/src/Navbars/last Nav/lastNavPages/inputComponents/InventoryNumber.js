import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { getInventoryNumber } from '../../../../api/AllCategories/inventory';
import Select from 'react-select';

const Provenance = ({ handleChange }) => {

    const [values, setValues,selectedOption] = useState({
        InventoryNumber: []
    });

    const loadInventoryNumber = () => {
        getInventoryNumber()
            .then((data) => {
                if (data.error) {
                    console.log(data.error, 'load Inventory');
                } else {
                    setValues({
                        ...values,
                        InventoryNumber: data,
                        formData: new FormData(),
                    })
                }
            })
            .catch((err) => console.log(err, 'error in get all Inventory'));
    }

    useEffect(() => {
        loadInventoryNumber();
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
            {/* <Form.Control
                name="inventoryNumber"
                size='md'
                as='select'
                onChange={handleChange}
                // value={inventory}
                required
            >
                <option>InventoryNumber</option>
                {values.InventoryNumber &&
                    values.InventoryNumber.map((c, i) => (
                        <option key={i} value={c}>
                            {c}
                        </option>
                    ))}
            </Form.Control> */}
             <Select name="inventoryNumber"
        value={selectedOption}
        onChange={handleChange}
        
      options=  
        { values.InventoryNumber.map((e, key) => {
        return {"label":e,"value":e,"name":"inventoryNumber"};
    })}/>
        </Fragment>
    )
}

export default Provenance;
