import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './components/MainPage/MainPage'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import AuthPage from './components/AuthPage/AuthPage'
import SearchPage from './components/SearchPage/SearchPage'
import AppContextProvider from './components/AppContext/AppContext'
import ResultsPage from './components/ResultsPage/ResultsPage'

function App() {
    return (
        <AppContextProvider>
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/results" element={<ResultsPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        </AppContextProvider>
    )
}

export default App
