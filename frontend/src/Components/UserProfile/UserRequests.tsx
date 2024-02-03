import React, { useState } from 'react';
import "../../Style/UserProfileStyle/UserRequestsStyle.css";

interface Request {
    description?: string;
}


const Requests: React.FC = () => {

    const defaultRequest: Request = {
        description: "I hope you're well. I've noticed a leaky faucet in my unit, 305. Could you please arrange for the maintenance team to address this at their earliest convenience? Thanks for your prompt assistance.",
    };

    const [request, setRequest] = useState<Request>(defaultRequest);

    return (
        // TODO: change layout for the display of requests
        <div className='request-content'>
            <h2 className="request-header">{"Requests"}</h2>
            <div className="request-description">{request.description}</div>
        </div>
    );
};

export default Requests;
