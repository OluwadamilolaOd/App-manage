import { useState } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import "../../Pages/Styles/addorganization.css";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";

const EmailOrganization = () => {
  const navigate = useNavigate();
  const [ccEmailInputValue, setCcEmailInputValue] = useState('');
  const [ccEmail, setCcEmail] = useState([]);
  const [file, setFile] = useState(null);
  const locations = useLocation();
  const data = locations.state.data;
  console.log(data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', data.email);
      formDataObj.append('body', ccEmail);
      formDataObj.append('file', file);

      const response = await fetch('https://example.com/api/posts', {
        method: 'POST',
        body: formDataObj,
      });

      // Handle the response
      if (response.ok) {
        console.log('Post created successfully!');
      } else {
        console.log('Error creating post!');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };



  const handleInputChange = (event) => {
    setCcEmailInputValue(event.target.value);
    setCcEmail(event.target.value.split(','));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      setFile(null);
      console.log('Please select a CSV file.');
    }
  };

  const handleBackArrow = () => {
    navigate("/organizations");
  };
  return (
    <div>
      <Banner title={"Email Organisation"} />
      <ArrowBack handleBackArrow={handleBackArrow} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="reciver">Reciver</label>
        <div>{data.email}</div>

      <label htmlFor="CC">Copy Email</label>
      <input type="text" value={ccEmailInputValue} onChange={handleInputChange} />
      <p>Note: Seprate each email with comma</p>

      <label htmlFor="file">File (CSV only)</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <button type="submit">Send Email</button>
    </form>
    </div>
  );
};

export default EmailOrganization;
