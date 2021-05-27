import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const getRole = () => {
    let role;
    
    if (Cookies.get('token')) {
        const data = jwtDecode(Cookies.get('token'));
        role = data.role;
    }
    
    return role;
};
