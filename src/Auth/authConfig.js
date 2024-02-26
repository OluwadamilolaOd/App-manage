/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
  //      clientId: '66ffb285-220a-42ae-9277-20f7e3af6284', // This is the ONLY mandatory field that you need to supply.
        clientId:`${process.env.REACT_APP_PUBLIC_HA_CLIENT_ID}`,
      //  authority: 'https://blossomhearthospital.ciamlogin.com/', // Replace the placeholder with your tenant subdomain
        authority: `${process.env.REACT_APP_PUBLIC_HA_AUTHORITY}/${process.env.REACT_APP_PUBLIC_HA_TENANT_ID}`, // Replace the placeholder with your tenant subdomain
        redirectUri: `${process.env.REACT_APP_PUBLIC_HA_REDIRECT_URI}`, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: `${process.env.REACT_APP_PUBLIC_HA_POST_LOGOUT_REDIRECT_URI}`, // Indicates the page to navigate after logout.
        // End point URL for Power BI API
        powerBiApiUrl: "https://api.powerbi.com/",

        // Id of the workspace where the report is hosted
        //workspaceId:"820adcae-4672-437b-a5b2-856ebc9b9717",
        workspaceId:`${process.env.REACT_APP_PUBLIC_HA_WORKSPACEID}`,
        // Id of the report to be embedded
        //reportId: "c0887636-84df-4d33-882c-a2c61e7d7cff",
        reportId: `${process.env.REACT_APP_PUBLIC_HA_REPORTID}`,

    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            /**
             * Below you can configure MSAL.js logs. For more information, visit:
             * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
             */
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    toDoListAPI: {
        endpoint: 'https://localhost:44351/api/todolist',
        scopes: {
            read: [`${process.env.REACT_APP_PUBLIC_DEV_SCOPES_READ}`],
            write: [`${process.env.REACT_APP_PUBLIC_DEV_SCOPES_WRITE}`],
        },
    },
};

// Scope for securing access token
export const scopeBase = ["https://analysis.windows.net/powerbi/api/Report.Read.All"];

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.toDoListAPI.scopes.read, ...protectedResources.toDoListAPI.scopes.write],
};



export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphImageEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
    graphRoleEndpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
    graphGroupMemberEndpoint: `https://graph.microsoft.com/v1.0/groups/${process.env.REACT_APP_PUBLIC_HA_GROUP_ID}/members?$select=displayName,mail,userPrincipalName`,
   //graphGroupMemberEndpoint: `https://graph.microsoft.com/v1.0/groups/${process.env.REACT_APP_PUBLIC_HA_GROUP_ID}/members/microsoft.graph.user?$orderby=displayName&$select=displayName,id`,
};




// /*
//  * Copyright (c) Microsoft Corporation. All rights reserved.
//  * Licensed under the MIT License.
//  */
 
// import { LogLevel } from "@azure/msal-browser";
 
// /**
//  * Configuration object to be passed to MSAL instance on creation.
//  * For a full list of MSAL.js configuration parameters, visit:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
//  */
// export const msalConfig = {
//     auth: {
//   //      clientId: '66ffb285-220a-42ae-9277-20f7e3af6284', // This is the ONLY mandatory field that you need to supply.
//         clientId:`${process.env.REACT_APP_PUBLIC_CLIENT_ID}`,
//       //  authority: 'https://blossomhearthospital.ciamlogin.com/', // Replace the placeholder with your tenant subdomain
//         authority: `${process.env.REACT_APP_PUBLIC_AUTHORITY}/${process.env.REACT_APP_PUBLIC_TENANT_ID}`, // Replace the placeholder with your tenant subdomain
//         redirectUri: `${process.env.REACT_APP_PUBLIC_REDIRECT_URI}`, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
//         postLogoutRedirectUri: `${process.env.REACT_APP_PUBLIC_POST_LOGOUT_REDIRECT_URI}`, // Indicates the page to navigate after logout.
//         // End point URL for Power BI API
//         powerBiApiUrl: "https://api.powerbi.com/",
 
//         // Id of the workspace where the report is hosted
//         //workspaceId:"820adcae-4672-437b-a5b2-856ebc9b9717",
//         workspaceId:`${process.env.REACT_APP_PUBLIC_WORKSPACEID}`,
//         // Id of the report to be embedded
//         //reportId: "c0887636-84df-4d33-882c-a2c61e7d7cff",
//         reportId: `${process.env.REACT_APP_PUBLIC_REPORTID}`,
 
//     },
//     cache: {
//         cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
//         storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//     },
//     system: {
//         loggerOptions: {
//             /**
//              * Below you can configure MSAL.js logs. For more information, visit:
//              * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
//              */
//             loggerCallback: (level, message, containsPii) => {
//                 if (containsPii) {
//                     return;
//                 }
//                 switch (level) {
//                     case LogLevel.Error:
//                         console.error(message);
//                         return;
//                     case LogLevel.Info:
//                         console.info(message);
//                         return;
//                     case LogLevel.Verbose:
//                         console.debug(message);
//                         return;
//                     case LogLevel.Warning:
//                         console.warn(message);
//                         return;
//                     default:
//                         return;
//                 }
//             },
//         },
//     },
// };
 
// /**
//  * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
//  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
//  */
// export const protectedResources = {
//     toDoListAPI: {
//         endpoint: 'https://localhost:44351/api/todolist',
//         scopes: {
//             read: [`${process.env.REACT_APP_PUBLIC_SCOPES_READ}`],
//             write: [`${process.env.REACT_APP_PUBLIC_SCOPES_WRITE}`],
//         },
//     },
// };
 
// // Scope for securing access token
// export const scopeBase = ["https://analysis.windows.net/powerbi/api/Report.Read.All"];
 
// /**
//  * Scopes you add here will be prompted for user consent during sign-in.
//  * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
//  * For more information about OIDC scopes, visit:
//  * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
//  */
// export const loginRequest = {
//     scopes: [...protectedResources.toDoListAPI.scopes.read, ...protectedResources.toDoListAPI.scopes.write],
// };
 
 
 
// export const graphConfig = {
//     graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
//     graphImageEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
//     graphRoleEndpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
// };