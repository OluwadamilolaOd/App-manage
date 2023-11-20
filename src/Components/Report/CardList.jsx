import React, { useEffect, useState } from "react";
import "./card.css";
import Card from "./Card";
import { baseUrl } from "../../Hook/baseurl";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  //fetch data from api
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/Report/AllReport`);
        const data = await response.json();
        setData(data);
        setLoading(!loading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // Onclick of CardReport
  const handleOrgTable = () => {
    navigate("/organizations");
  };

  const handlePurTable = () => {
    navigate("/home/purchsedLicReport");
  };

  const handleExpTable = () => {
    navigate("/home/expiredLicReport");
  };

  const handleArcTable = () => {
    navigate("/home/archiveLicReport");
  };

  const handleActTable = () => {
    navigate("/home/activeLicReport");
  };

  return (
    <div className="card-container">
      <Card
        title={" Organisations"}
        value={data.organization}
        className={"blueBackg"}
        btnCardHandler={handleOrgTable}
      />
      <Card
        title={"Purchased Licenses"}
        value={data.purchasedLicense}
        className={"blueBackg"}
        btnCardHandler={handlePurTable}
      />
      {/* <Card title={"Number of Licenses due to Expire This Month and Next Month"} value={100} className = {"blueBackg"} /> */}
      <Card
        title={" Expired Licenses"}
        value={data.expiredlicense}
        className={"redBackg"}
        btnCardHandler={handleExpTable}
      />
      <Card
        title={" Active Licenses"}
        value={data.activeLicense}
        className={"blueBackg"}
        btnCardHandler={handleActTable}
      />
      {/* <Card title={"Number of New License"} value={data.application} className = {"blueBackg"} /> */}
      <Card
        title={"Archive Licenses"}
        value={data.archiveLicense}
        className={"blueBackg"}
        btnCardHandler={handleArcTable}
      />
    </div>
  );
};

export default CardList;
