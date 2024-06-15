import { atom, selector } from 'recoil'
import axios from 'axios'
import { url } from '../util/clientUrl';
import { useNavigate } from 'react-router-dom';

export const monthAtom = atom({
    key: 'MonthValue',
    default: new Date().getMonth() + 1
});
export const yearAtom = atom({
    key: 'YearValue',
    default: new Date().getFullYear()
});



export const monthlyData = selector({
    key: 'monthlyData',
    get: async ({ get }) => {
            const token = localStorage.getItem('token');
            console.log(token);
            const navigate = useNavigate();
            if(!token){
                navigate('/signin');
                return;
            }
            else{
            try {
                
                const res = await axios.post(`${url}/api/v1/expense/monthly`, {
                    month: get(monthAtom),
                    year: get(yearAtom)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    }
                })
                
                
                return res.data;
                
            } catch (error) {
                throw new Error ("Error connecting")
            }}
                
        }
    });
