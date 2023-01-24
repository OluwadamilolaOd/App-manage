import './App.css';

function App() {

  
    const data1 =  [
          {
            id: 1,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          },
          {
            id: 2,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          },
          {
            id: 3,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          },
          {
            id: 4,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          },
          {
            id: 5,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          },
          {
            id: 6,
            companyName: "Sir T",
            description: "Company",
            emailAddress: "sirt@mail.com",
            phoneNumber: "08138452525",
            status: "Active"
          }
        ]
  
        const RenderData = data1.map((item, id) => (
          <div key={id}>
                  <h2>{item.companyName}</h2>
                  <p>{item.description}</p>
                  <p>{item.emailAddress}</p>
                  <p>{item.phoneNumber}</p>
                  <p>{item.status}</p>
  
          </div>
        ))















    const data = {
                // companyName: "Sir T",
                // description: "Company",
                // emailAddress: "sirt@mail.com",
                // phoneNumber: "08138452525",
                // status: "Active" 

                licenseName: "STASS",
                licenseDescription: "Testing 123",
                licenseType: "STAAS",
                startDate: "2023-01-19T09:52:28.036Z",
              licenseKey: "JK23FJ42J23HBH2H",
                endDate: "2023-01-19T09:52:28.036Z",
                senderEmail: "test@mail",
                emailBody: "Test",
                companyId: 2,
                organizations:[]
               };
const HandleSubmit = () => {

fetch('https://localhost:7181/api/licenses', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}
  return (
    <div className="App">
        <h1>Hellooooooooooo</h1>
        <button onClick={HandleSubmit}>Submit</button>
        {RenderData}
            </div>
  );
}

export default App;
