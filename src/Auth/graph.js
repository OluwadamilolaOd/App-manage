import { graphConfig } from "./authConfig";

export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
 
    headers.append("Authorization", bearer);
 
    const options = {
        method: "GET",
        headers: headers
    };
 
    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
 }

 //Get User Roles
    export async function callMsGraphRoles(accessToken) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
        headers.append("Authorization", bearer);
        const options = {
            method: "GET",
            headers: headers
        };
        return fetch(graphConfig.graphRolesEndpoint, options)
            .then(response => response)
            .catch(error => console.log(error));
        }

 //Image 
 export async function callMsGraphImg(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
 
    headers.append("Authorization", bearer);
    headers.append('Content-Type','image/jpg',)
 
    const options = {
        method: "GET",
        
        headers: headers
    };
 
    return fetch(graphConfig.graphImageEndpoint, options)
        .then(response => response)
        .catch(error => console.log(error));
 }

 //GET USERS IN A GROUP
    export async function callMsGraphGroupMembers(accessToken) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
    
        headers.append("Authorization", bearer);
    
        const options = {
            method: "GET",
            headers: headers
        };
    
        return fetch(graphConfig.graphGroupMemberEndpoint, options)
            .then(response => response.json())
            .catch(error => console.log(error));
    }