// import { getCookies } from 'cookies-next';
import Cookies from 'js-cookie';
import router from 'next/router';

const controllers = {
  copyCode: (e: any) => {
    navigator.clipboard.writeText(
      e.target.parentNode.children[0].children[1].textContent
    );
  },
  //function that gets userID from cookie
  getUserId: async () => {
    const currentToken = Cookies.get('key');
    //if the currentToken returns a value then we make fetch requst, else we reroute to login
    if (currentToken) {
      const data = {
        currentToken: currentToken,
        type: 'auth',
      };

      const currentSession = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('current session:', currentSession.body)
      const authenticatedSession = await currentSession.json();
      console.log(authenticatedSession)
      return authenticatedSession.userId;
    } else {
      router.push('/login');
    }
  },
};

export default controllers;
