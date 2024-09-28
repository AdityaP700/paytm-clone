import React from 'react';

const SendMoney = () => {
    return (
        <div>
            <h1>Send Money</h1>
            {/* Your send money content here */}
            <form>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" placeholder="Enter amount" />
                </div>
                <div>
                    <label htmlFor="recipient">Recipient:</label>
                    <input type="text" id="recipient" placeholder="Enter recipient's email or phone number" />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default SendMoney; // Ensure this line is present
