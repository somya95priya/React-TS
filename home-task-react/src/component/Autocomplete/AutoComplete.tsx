import React, { useEffect} from 'react';
import { useState } from "react"
import { EmployeeType } from '../../ts/interfaces/Employee.interface';
import employeeData from '../../mockData/employee.json'

import './AutoComplete.css';


const Autocomplete = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
     const [employeeDetail, setData] = useState <EmployeeType[] | []>([]);
     const [loading, setLoading] = useState(true);

  

    const fetchData = async () => {
        try {
          const employeeDataString = JSON.stringify(employeeData.employees);
          //as fetch func expect 1st arg as request info or url so need to pass as url
          const response = await fetch(`data:application/json,${encodeURIComponent(employeeDataString)}`);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching JSON file:', error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchData();
    }, []); 


    let filteredEmployeeDetail = employeeDetail?.filter((val: EmployeeType) => {
        if (searchTerm === "") return val;
        else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) return val;
    });


    const onhandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchTerm(event.target.value)
    }

    const hightlightSuggestedText = () => {
        return (
            <>
                {filteredEmployeeDetail?.map((value: EmployeeType) => {
                    const string = value.name.substring(0, value.name.toLowerCase().indexOf(searchTerm.toLowerCase())
                    );
                    const endString = value.name.substring(value.name.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length
                    );
                    // To highlight the searched text in the auto suggestion list.
                    const highlightedText = value.name.substring(value.name.toLowerCase().indexOf(searchTerm.toLowerCase()), value.name.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length
                    );
                    return (
                        <div className='listing' key={value.id} onClick={(e) => 
                        {
                            setSearchTerm(value.name as string)
                        }}>
                            {string}
                            <span style={{ "backgroundColor": "#FFFF00" }}>
                                {highlightedText}
                            </span>
                            {endString}
                        </div>
                    );
                })}
            </>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="srchField">
            <div className="valueField">
                <input
                className='input-text'
                    type="text"
                    placeholder="Type Name"
                    value={searchTerm}
                    onChange={onhandleChange}
                />
                {searchTerm?.length > 0 && filteredEmployeeDetail?.length > 0 && (

                    <div className="lookup-results">
                        {hightlightSuggestedText()}
                    </div>
                )}
                {searchTerm.length > 0 && !filteredEmployeeDetail.length && (<div className='no-result-text'>No Results found!</div>)}
            </div>
        </div>
    );
}

export default Autocomplete