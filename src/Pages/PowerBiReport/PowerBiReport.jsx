// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

import { AuthenticationResult, InteractionType, EventMessage, EventType, AuthError } from "@azure/msal-browser";
import { MsalContext } from "@azure/msal-react";
import React from "react";
import { service, factories, models, IEmbedConfiguration } from "powerbi-client";
import * as config from "../../Auth/authConfig";
import { loginRequest } from "../../Auth/authConfig";
import { useState } from 'react';
import { useEffect } from 'react';

const powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);

let accessToken = localStorage.getItem("token")
let embedUrl = "https://app.powerbi.com/reportEmbed?reportId=c0887636-84df-4d33-882c-a2c61e7d7cff&groupId=075f0f9e-2933-4824-b22f-824ff873fa1f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19";
let reportContainer;
let reportRef;
let loading;
let error = [];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
class PowerBiReport extends React.Component {
    static contextType = MsalContext;

    constructor(props) {
        super(props);

        this.state = { accessToken, embedUrl, error};

        reportRef = React.createRef();

        // Report container
        loading = (
            <div
                id="reportContainer"
                ref={reportRef} >
                Loading the report...
            </div>
        );
    }

    // React function
    render(){

        if (this.state.error.length) {

            // Cleaning the report container contents and rendering the error message in multiple lines
            reportContainer.textContent = "";
            this.state.error.forEach(line => {
                reportContainer.appendChild(document.createTextNode(line));
                reportContainer.appendChild(document.createElement("br"));
            });
        }
        else if (this.state.accessToken !== "" && this.state.embedUrl !== "") {

            const embedConfiguration = {
                type: "report",
                tokenType: models.TokenType.Aad,
                accessToken,
                embedUrl,
                id: config.msalConfig.auth.reportId,
            };

            const report = powerbi.embed(reportContainer, embedConfiguration);

            // Clear any other loaded handler events
            report.off("loaded");

            // Triggers when a content schema is successfully loaded
            report.on("loaded", function () {
                console.log("Report load successful");
            });

            // Clear any other rendered handler events
            report.off("rendered");

            // Triggers when a content is successfully embedded in UI
            report.on("rendered", function () {
                console.log("Report render successful");
            });

            // Clear any other error handler event
            report.off("error");

            // Below patch of code is for handling errors that occur during embedding
            report.on("error", function (event) {
                const errorMsg = event.detail;

                // Use errorMsg variable to log error in any destination of choice
                console.error(errorMsg);
            });
        }

        return loading;
    }

    // React function
    componentDidMount(){
        if (reportRef !== null) {
            reportContainer = reportRef["current"];
        }

        // User input - null check
        if (config.msalConfig.auth.workspaceId === "" || config.msalConfig.auth.reportId === "") {
            this.setState({ error: ["Please assign values to workspace Id and report Id in Config.ts file"] });
            return;
        }

        this.authenticate();
    }

    // React function
    componentDidUpdate(){
        this.authenticate();
    }

    // React function
    componentWillUnmount(){
        powerbi.reset(reportContainer);
    }

    // Authenticating to get the access token
    authenticate() {
        const msalInstance = this.context.instance;
        const msalAccounts = this.context.accounts;
        const msalInProgress = this.context.inProgress;
        const isAuthenticated = this.context.accounts.length > 0;

        if (this.state.error.length > 0) {
            return;
        }

        const eventCallback = msalInstance.addEventCallback((message) => {
            if (message.eventType === EventType.LOGIN_SUCCESS && !accessToken) {
                const payload = message.payload;
                const name = payload.account?.name ? payload.account?.name: "";

                accessToken = payload.accessToken;
                this.setUsername(name);
                this.tryRefreshUserPermissions();
            }
        });


        if (!isAuthenticated && msalInProgress === InteractionType.None) {
            msalInstance.loginRedirect(loginRequest);
        }
        else if (isAuthenticated && accessToken && !embedUrl) {
            this.getembedUrl();
            msalInstance.removeEventCallback(eventCallback);
        }
        else if (isAuthenticated && !accessToken && !embedUrl && msalInProgress === InteractionType.None) {
            this.setUsername(msalAccounts[0].name);

            // get access token silently from cached id-token
            msalInstance.acquireTokenSilent(loginRequest).then((response) => {
                accessToken = response.accessToken;
                this.getembedUrl();
            }).catch((error) => {
                // Refresh access token silently from cached id-token
                // Makes the call to handleredirectcallback
                if (error.errorCode === "consent_required" || error.errorCode === "interaction_required" || error.errorCode === "login_required") {
                    msalInstance.acquireTokenRedirect(loginRequest);
                }
                else if (error.errorCode === '429') {
                    this.setState({ error: ["Our Service Token Server (STS) is overloaded, please try again in sometime"] });
                }
                else {
                    this.setState({ error: ["There was some problem fetching the access token" + error.toString()] });
                }
            });
        }
    }

    
    // Power BI REST API call to refresh User Permissions in Power BI
    // Refreshes user permissions and makes sure the user permissions are fully updated
    // https://docs.microsoft.com/rest/api/power-bi/users/refreshuserpermissions
    tryRefreshUserPermissions(){
        fetch(config.msalConfig.auth.powerBiApiUrl + "v1.0/myorg/RefreshUserPermissions", {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            method: "POST"
        })
        .then(function (response) {
            if (response.ok) {
                console.log("User permissions refreshed successfully.");
            } else {
                // Too many requests in one hour will cause the API to fail
                if (response.status === 429) {
                    console.error("Permissions refresh will be available in up to an hour.");
                } else {
                    console.error(response);
                }
            }
        })
        .catch(function (error) {
            console.error("Failure in making API call." + error);
        });
    }

    // Power BI REST API call to get the embed URL of the report
    getembedUrl(){
        const thisObj = this;

        fetch(config.msalConfig.auth.powerBiApiUrl + "v1.0/myorg/groups/" + config.msalConfig.auth.workspaceId + "/reports/" + config.msalConfig.auth.reportId, {
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            method: "GET"
        })
            .then(function (response) {
                const errorMessage= [];
                errorMessage.push("Error occurred while fetching the embed URL of the report")
                errorMessage.push("Request Id: " + response.headers.get("requestId"));

                response.json()
                    .then(function (body) {
                        // Successful response
                        if (response.ok) {
                            embedUrl = body["embedUrl"];
                            thisObj.setState({ accessToken: accessToken, embedUrl: embedUrl });
                        }
                        // If error message is available
                        else {
                            errorMessage.push("Error " + response.status + ": " + body.error.code);

                            thisObj.setState({ error: errorMessage });
                        }

                    })
                    .catch(function () {
                        errorMessage.push("Error " + response.status + ":  An error has occurred");

                        thisObj.setState({ error: errorMessage });
                    });
            })
            .catch(function (error) {

                // Error in making the API call
                thisObj.setState({ error: error });
            })
    }

    // Show username in the UI
    setUsername(username){
        const welcome = document.getElementById("welcome");
        if (welcome !== null)
            welcome.innerText = "Welcome, " + username;
    }
}

export default PowerBiReport;