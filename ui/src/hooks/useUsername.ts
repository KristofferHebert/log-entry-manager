import Cookies from 'js-cookie';

export const useUsername = () => {
  const username = Cookies.get('username') || '';
  
  const setUsername = (newUsername: string) => {
    Cookies.set('username', newUsername);
  };
  
  return { username, setUsername };
}; 