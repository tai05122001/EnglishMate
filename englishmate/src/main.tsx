import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './routes/index.tsx'
import store from './store'
import './styles/index.css'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
)
