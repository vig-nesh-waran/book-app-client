import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BooksContextProvider from "./context/BooksContextProvider.jsx"
import 'react-loading-skeleton/dist/skeleton.css';


createRoot(document.getElementById('root')).render(
 <BooksContextProvider>
   <App />
 </BooksContextProvider>
)
