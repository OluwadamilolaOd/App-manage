import { useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { PowerBIEmbed } from 'powerbi-client-react';
import * as pbi from 'powerbi-client';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";
import PieR from "../Components/Report/Pie/Pie";

const Home = () => {

	const { instance, accounts } = useMsal();

	useEffect(() => {
		instance
		  .acquireTokenSilent({
			...loginRequest,
			account: accounts[0],
		  })
		  .then((response) => {
			//save token to local storage
			localStorage.setItem("token", response.accessToken);
		  });
	  }, [instance, accounts]);

   const models = pbi.models;

  return (
    <div>
      <CardList />
	  {/* <PieR /> */}
      {/* <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: 'c0887636-84df-4d33-882c-a2c61e7d7cff',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=c0887636-84df-4d33-882c-a2c61e7d7cff&groupId=075f0f9e-2933-4824-b22f-824ff873fa1f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNGYyNzAzNjUtMTI4ZC00NDBjLTg3NmEtZmE0Mjg5N2E3NDM5LyIsImlhdCI6MTY4OTE3OTIzMywibmJmIjoxNjg5MTc5MjMzLCJleHAiOjE2ODkxODQ1OTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE1ZEZmMC9vam1UVU1ReFNkL1h3ZWZLcjd1TlQ1NlArTjZ3WHJlSFQySCtWdnNqdFlpeXRxUnhHUXlzcEhvV3FLIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSG9zcGl0YWwiLCJnaXZlbl9uYW1lIjoiQmxvc3NvbSBIZWFydCIsImlwYWRkciI6IjE1NC4xMTMuMTQ1LjIxMCIsIm5hbWUiOiJCbG9zc29tIEhlYXJ0IEhvc3BpdGFsIiwib2lkIjoiYzllZjJmNzUtMDRjOS00YzJjLWE4MmItZjkxZTk0MzUwMTVhIiwicHVpZCI6IjEwMDMyMDAyMDMwNUFFMzMiLCJyaCI6IjAuQVhrQVpRTW5UNDBTREVTSGF2cENpWHAwT1FrQUFBQUFBQUFBd0FBQUFBQUFBQUNVQVBVLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFRlbmFudC5SZWFkLkFsbCBUZW5hbnQuUmVhZFdyaXRlLkFsbCBVc2VyU3RhdGUuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJfaFRXVWFGLTRlcGV4MFRPNktnTlRfeFRxeEJzeXU4elZ6MjlDLXgtRFJnIiwidGlkIjoiNGYyNzAzNjUtMTI4ZC00NDBjLTg3NmEtZmE0Mjg5N2E3NDM5IiwidW5pcXVlX25hbWUiOiJpdEBibG9zc29taGVhcnRob3NwaXRhbC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJpdEBibG9zc29taGVhcnRob3NwaXRhbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJjTGJOV0VBQ3VreXVlbnZ2eTNndUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3BsIjoiZW4tVVMifQ.hAD7G6PowT5a3OKIlpdbwFo5-J-YCaq7PQSM37qWGnrEQXfCLbHwQcFh3oeGpTQ1VvzLai0dJNM6HK7kjXSoxbg9ebu_QPyuXhZjBH2dTVNCppuQrdJMt6KD8M-ODbJyR5UOCXjIMdiooH1mKwyFFVOqULMnA7KSyuaQ2WAiaNiR51d4f__j1tFlzzlNF3Z0p0mrdTI9SwOCuwRKEG4sIAEjXoK2A5rg_cIxGRj-Ut6yJfkkFDtFRv-y8SwpfswZvUhska3_svr1LzBmzEzT_vMMhczpLZZgNsa95MOJPflIjsfxImqoWigpbOPV_5bghQMTUnqtjfPy8eTKD_9DmA',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		this.report = embeddedReport;
	}}
/> */}

    </div>
  );
};

export default Home;
