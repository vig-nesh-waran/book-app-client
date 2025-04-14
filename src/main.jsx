import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BooksContextProvider from "./context/BooksContextProvider.jsx"
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')).render(
 <BooksContextProvider>
   <App />
   <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
 </BooksContextProvider>
)
