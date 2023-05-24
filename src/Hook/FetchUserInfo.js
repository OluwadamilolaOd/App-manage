import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../Auth/authConfig';
import { callMsGraph } from '../Auth/graph';

export async function FetchUserInfo () {
    const { instance, accounts } = useMsal();

return
        instance.acquireTokenSilent({
          loginRequest,
          account: accounts[0],
      })
      .then((response) => {
          callMsGraph(response.accessToken).then(response=>response)
        .catch(error=>console.log(error))})

}