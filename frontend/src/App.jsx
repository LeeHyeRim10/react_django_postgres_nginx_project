import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import EmployeePage from './pages/EmployeePage'
import ProductPage from './pages/sales/ProductPage'
import SalesPage from './pages/sales/SalesPage'

import HeaderBar from './components/layout/HeaderBar'
import SiderBar from './components/layout/SiderBar'

import styled from 'styled-components'
// import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules ([AllCommunityModule])

const queryClient = new QueryClient();


function App() {
  const [mobileMenu, setMobileMenu] = useState(false)


  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <SiderBar />
            <Content>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/employee" element={<EmployeePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/sales" element={<SalesPage />} />
              </Routes>
            </Content>
          </Layout>
          <HeaderBar />
        </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

const Layout = styled.div`
  display: flex;
  margin-top: 70px;
`

const Content = styled.main`
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  min-height: calc(100vh - 70px);
  background-color: #f5f6fa;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`