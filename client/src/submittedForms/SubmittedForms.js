import { useEffect, useState } from "react";
import './submittedForm.css';

const SubmittedForms = (props) => {
    console.log(props);
    const [usersData, setUsersData] = useState()
    console.log(usersData);
    useEffect(() => {
        fetch('http://localhost:8000/form-user')
        .then(response => response.json())
        .then(data => setUsersData(data))
        .catch(err => console.log(err.message))
    }, [])
    return(
        <div className="all-users-wrapper">
            <h1 style={{margin: '0 auto', width: 'fit-content', padding: '1rem 0 0 2rem'}}>All registered users</h1>
            <div className="all-users">
                {usersData?.map((data) => {
                    return(
                        <div className="user-data">
                            <div>
                            Name: {data.name}
                            </div>
                            <div>
                            Email: {data.email}
                            </div>
                            <div>
                            Moblie: {data.mobile}
                            </div>
                            <div>
                            DOB: {data.dob}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SubmittedForms;