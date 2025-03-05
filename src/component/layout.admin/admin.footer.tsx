'use client'
import { Layout } from 'antd';

const AdminFooter=()=>{
  const {  Footer } = Layout;
  return (
    <Footer style={{ textAlign: 'center' }}>
          Zoofari ©{new Date().getFullYear()} Created by Nateri
        </Footer>
  )
} 
export default AdminFooter;