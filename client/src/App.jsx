import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import './App.css'
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Main from './Pages/Main';
import Expenses from './Pages/Expenses';
import Summary from './Pages/Summary';
import Logout from './Pages/Logout';
import Home from './Pages/Home';

function App() {



  const router= createBrowserRouter([
    {
      path:'/',
      element: <Home/>
    },

    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/signin',
      element:<Signin/>
    },
    {
      path:'/app',
      element:<Main/>,
      children:[
        {
          path:'/app/expenses',
          element:<Expenses/>
        },
        {
          path:'/app/summary',
          element: <Summary/>
        },
       

      ]
    },
    {
      path:'/logout',
      element: <Logout/>
    }
    
  ]);


  return (
    <>
    <RecoilRoot>


    <RouterProvider router={router}></RouterProvider>

    </RecoilRoot>
      
    </>
  )
}

export default App
