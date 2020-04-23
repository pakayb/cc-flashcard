import React from "react";
import {db, storage} from '../firebase'
import {useCollectionData, useCollectionDataOnce} from "react-firebase-hooks/firestore";
import Card from "../Card/Card";

function Learn() {

    const [employeesData,loading,error] = useCollectionData(
        db.collection('employees'));
    let cards = [];
    if(!loading){
        cards = employeesData.map((employee) => {
        return (
            <div className='col-md-4'>
            <Card name={employee.name}
                  role={employee.role}
                  location={employee.location}
                  gender={employee.gender}
                  funFact={employee.funfact}
                  hasTwin={employee.hastwin}
                  picture={employee.picture}
                  key={employee.id}

            />
            </div>
        )
        })
    }

    return (
         <div className='container-fluid d-flex justify-content-center'>
             <div className='row'>
             {cards}
         </div>

         </div>

    )
}

export default Learn;