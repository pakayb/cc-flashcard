import React from "react";
import {db, storage} from '../firebase'
import {useCollectionData, useCollectionDataOnce} from "react-firebase-hooks/firestore";
import Card from "../Card/Card";

function Learn() {

    const [employeesData,loading,error] = useCollectionData(
        db.collection('employees'));
    let cards = [];
    let cardsToLoad =[];
    if(!loading){
        cards = employeesData.map((employee) => {
        return (
            <div className='col-md-4 col-sm-6 col-4'>
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
        });
    cardsToLoad = cards.map((card, index)=>{
        if (index%3 ===0 ){
            return(
                <div className='row'>
                    {cards[index]}
                    {cards[index+1]}
                    {cards[index+2]}
                </div>
                )
        }
        else return null;
    });
    }

    return (
         <div className='container-fluid justify-content-center'>
             {cardsToLoad}

         </div>

    )
}

export default Learn;