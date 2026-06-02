import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
console.log(window.location.hostname); 
const host = window.location.hostname;
console.log("HOST:", host);
if (host === "localhost") {
  // use slug from URL
  console.log("DEV MODE");
} else {
  // use custom domain
  console.log("CUSTOM DOMAIN MODE");
}
const path = window.location.pathname.split("/")[1]; 
console.log("SLUG:", path);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
