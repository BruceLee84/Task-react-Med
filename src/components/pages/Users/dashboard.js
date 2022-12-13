import React, { useState, useEffect } from "react";
import { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";
import './dash.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Space, Table, Tag, Layout, Menu } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Label } from "semantic-ui-react";
import user from "../../redux/data/user";
const { Header, Content, Footer, Sider } = Layout;




function Dashboard(){
       const [data, setData]=useState('');
       const [product, setProduct]= useState('');
       const [category, setCategory]= useState('');
       const navigate = useNavigate();
       let role = localStorage.getItem('role');
       
     


      //  useEffect(()=>{
      //   axios.get('http://localhost:3030/api/v1/user/getUser').then(res=>{
      //     console.log('users_list', res)
      //     console.log('users', res.data.result)
      //     setData(res.data.result)
      //   })
      //  },[])

      const userData= async()=>{
        const result = await axios.get('http://localhost:3030/api/v1/user/getUser')
        console.log('user', result)
        setData(result)
       }

       const productData = async()=>{
        const dataPro = await axios.get('http://localhost:3030/api/v3/product/getAllPro')
        console.log('product', dataPro)
        setProduct(dataPro)
        setCategory('')
        setData('')
       }

       const categoryData = async()=>{
        const res = await axios.get('http://localhost:3030/api/v2/category/getCat')
        console.log('category', res)
        setCategory(res)
        setData('')
       }

       const deleteData = async(data)=>{
        // console.log(deleteData)
        const delData = await axios.delete(`http://localhost:3030/api/v3/product/deleteProduct?uuid=${data}`).then((delData)=>{
            console.log("deleted", delData)
            productData()
        }).catch(error=>{
            console.log("error", error)
        })   
    }

    const logout =()=>{
      let uuid = localStorage.getItem('uuid')
      console.log('uuid-state', uuid)
      axios.post(`http://localhost:3030/api/v1/user/logout?uuid=${uuid}`).then(data=>{
          console.log('log', data.status)
          console.log('logout', data.data.result)
          if(data.status == 200){
              swal.fire({
                  title: "User SignOut",
                  text: "LOGOUT",
                  icon: "success"
              })
              navigate('/')
          } 
      }).catch(err=>{
          console.log('err',err.message)
      })
  }


  const indData = async(data)=>{
        console.log("Product_id", data)
        const datas = await axios.get(`http://localhost:3030/api/v3/product/getIndPro?uuid=${data}`)
        setProduct(datas)
        if(product){
            console.log("Cat_Product")
            navigate ('/product:id',{state:datas.data.result})
        }}

       
     if(data){
        return(
            <>
            <header>
            <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form>{role == 'admin'? <li className="list-home">Admin</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
          {/* <li className="dash-class"><h4 className="dash-classs">Dashboard</h4></li>         */}
        </ul>
        </nav>
        </div>
        </div>
        <div className="side-bar">
        <div className="dashboard-btn">
                  <p className="user">Dashboard</p>
                  <p className="pro"  onClick={userData}>Users</p>
                  <p className="pro2"  onClick={productData}>Products</p>
                  <p className="pro3" onClick={categoryData}>Categories</p>
              </div>
        </div>
            </header>

            
                   <div className="table-slider">
                    <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Number</th>
                            <th>accountType</th>
                            <th>Add</th>
                            <th>update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>     
                      {
                        data.data.result.map((data, index)=>{
                            return(
                                <>
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td className="dashpro">{data.userName}</td>
                                <td className="dashpro">{data.Email}</td>
                                <td className="dashpro">{data.role}</td>
                                <td className="dashpro">{data.PhoneNumber}</td>
                                <td className="dashpro">{data.accountType}</td>
                                <td><button type="button" onClick={()=>window.location.href='/update'}>Add</button></td>
                                <td><button type="button" onClick={()=>window.location.href='/user'} >update</button></td>
                                <td><button type="button">delete</button></td>
                                </tr>
                                
                                </>
                            )
                        })
                      }
                      </tbody>
                      </table>
                      </div>
                      
            
            </>
        )
       }else if(category){
        return(
            <>
            <header>
            <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form>{role == 'admin'? <li className="list-home">Admin</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
          {/* <li className="dash-class"><h4 className="dash-classs">Dashboard</h4></li>         */}
        </ul>
        </nav>
        </div>
        </div>
        <div className="side-bar">
        <div className="dashboard-btn">
                  <p className="user">Dashboard</p>
                  <p className="pro"  onClick={userData}>Users</p>
                  <p className="pro2"  onClick={productData}>Products</p>
                  <p className="pro3" onClick={categoryData}>Categories</p>
              </div>
        </div>
            </header>
            
                   <div className="table-slider">
                    <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Category Name</th>
                            <th>Admin uuid</th>
                            <th>Add</th>
                            <th>update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>     
                      {
                        category.data.result.map((data, index)=>{
                            return(
                                <>
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td className="dashpro">{data.categoryName}</td>
                                <td className="dashpro">{data.userUuid}</td>
                                <td><button type="button">Add</button></td>
                                <td><button type="button">update</button></td>
                                <td><button type="button">delete</button></td>
                                </tr>
                                
                                </>
                            )
                        })
                      }
                      </tbody>
                      </table>
                      </div>
            
            </>
        )
       }else if(product){
        return(
            <>
            <header>
            <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form>{role == 'admin'? <li className="list-home">Admin</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
          {/* <li className="dash-class"><h4 className="dash-classs">Dashboard</h4></li>         */}
        </ul>
        </nav>
        </div>
        </div>
        <div className="side-bar-pro">
        <div className="dashboard-btn">
                  <p className="user">Dashboard</p>
                  <p className="pro"  onClick={userData}>Users</p>
                  <p className="pro2"  onClick={productData}>Products</p>
                  <p className="pro3" onClick={categoryData}>Categories</p>
              </div>
        </div>
            </header>
            
                   <div className="table-slider-pro">
                    <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>categoryuuid</th>
                            <th>Add</th>
                            <th>update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>     
                      {
                        product.data.result.map((data, index)=>{
                            return(
                                <>
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td className="dashpro">{data.Name}</td>
                                <td className="dashpro">{data.price}</td>
                                <td className="dashpro">{data.quantity}</td>
                                <td className="dashpro">{data.categoryuuid}</td>
                                <td><button type="button" onClick={()=>window.location.href='/addPro'}>Add</button></td>
                                <td><button type="button" onClick={()=>indData(data.uuid)}>update</button></td>
                                <td><button type="button" onClick={()=>indData(data.uuid)}>delete</button></td>
                                </tr>
                                
                                </>
                            )
                        })
                      }
                      </tbody>
                      </table>
                      </div>
                     
            </>
        )
    }else{
        return(
            <>
            <header>
            <div className="header-header">
          <div className="heads">
        <h4 className="med" onClick={()=>window.location.href ='/home'}>Medplus</h4>
        <nav className="nav-home">
        <form className="form-search">
              <input className="search" type="text" placeholder="Search.." name="search"/>
              <button className="sbtn" type="button">&#128269;</button>
        </form>{role == 'admin'? <li className="list-home">Admin</li>: <></>}
        <ul>
          <li className="li-home" onClick={()=>window.location.href='/category'}>Category</li>
          <li className="li-homes" onClick={()=>window.location.href='/home'}>Home</li> 
          <li className="drop">         
          <div className="dropdown">
                <button className="dropbtn" onClick={()=>window.location.href='/home'}>{localStorage.getItem('Name')}</button>
                <div className="dropdown-content">
                <button className="drop-btn" type="button" onClick={logout}>Logout</button>
                </div></div></li>
        {/* <li className="dash-class"><h4 className="dash-classs">Dashboard</h4></li> */}
        </ul>
        </nav>
        </div>
        </div>
        <div className="side-bar">
        <div className="dashboard-btn">
                  <p className="user">Dashboard</p>
                  <p className="pro"  onClick={userData}>Users</p>
                  <p className="pro2"  onClick={productData}>Products</p>
                  <p className="pro3" onClick={categoryData}>Categories</p>
              </div>
        </div>
            </header>
               <div className="grid-dasboard">
                 <div className="dash-user-card">
                    <div className="user-dash-div">
                    <p>USER</p>
                    {/* <p>Add New User</p>
                    <p>Update User</p>
                    <p>Delete User</p> */}
                    </div>
                 </div>
                 <div className="dash-cat-card">
                    <p className="user-dash-div">CATEGORY</p>
                    {/* <p>Add New Category</p>
                    <p>Update Category</p>
                    <p>Delete Category</p> */}
                 </div>
                 <div className="dash-pro-card">
                    <p className="user-dash-div">PRODUCT</p>
                    {/* <p>Add New Product</p>
                    <p>Update Product</p>
                    <p>Delete Product</p> */}
                 </div>
                 <div className="dash-pro-cards">
                    <p className="user-dash-div">ORDER</p>
                    {/* <p>Add New Product</p>
                    <p>Update Product</p>
                    <p>Delete Product</p> */}
                 </div>

               </div>
            </>
        )
    }









//     const columns = [
//       {
//         title: 'userName',
//         dataIndex: 'userName',
//         key: 'userName',
//         render: (text) => <a>{text}</a>,
//       },
//       {
//         title: 'Email',
//         dataIndex: 'Email',
//         key: 'Email',
//       },
//       {
//         title: 'PhoneNumber',
//         dataIndex: 'PhoneNumber',
//         key: 'PhoneNumber',
//       },
//       {
//         title: 'Action',
//         key: 'action',
//         render: (_, record) => (
//           <Space size="middle">
//             <a>update {record.name}</a>
//             <a>Delete</a>
//           </Space>
//         ),
//       },
//     ];
//  return(
//       <>
//       {/* <nav className="nav-bar">
//       <h4 className="head">Dashboard</h4>
//       </nav> */}
//       <Layout>
//     <Sider
//       // breakpoint="lg"
//       // collapsedWidth="0"
//       // onBreakpoint={(broken) => {
//       //   console.log(broken);
//       // }}
//       // onCollapse={(collapsed, type) => {
//       //   console.log(collapsed, type);
//       // }}
//     >
//       <div className="logo" />
//       <h3 className="head">Dashboard</h3>
//       <Menu
//          theme="dark"
//          mode="inline"
//          defaultSelectedKeys={['1']}
//         items={[
//           {
//             key:'1',
//             icon:<UserOutlined onClick={()=>data}/>,
//             label: 'users',
//           },
//           {
//             key:'2',
//             icon:<UserOutlined/>,
//             label: 'Products'
//           }
//         ]
//           // [UserOutlined, VideoCameraOutlined].map(
//           // (icon, index) => ({
//           //   key: String(index + 1),
//           //   icon: React.createElement(icon),
//           //   // label: `nav ${index + 1}`,
//           //   label:'users',
//           //   // label: 'products'
//           // }),
//           // )
//         }
//       />
//     </Sider>
//     <Layout>
//       <Header
//         className="site-layout-sub-header-background"
//         style={{
//           padding: 0,
//         }}
//       />
//       <Content
//         style={{
//           margin: '24px 16px 0',
//         }}
//       >
//         <div
//           className="site-layout-background"
//           style={{
//             padding: 24,
//             minHeight: 360,
//           }}
//         >
//           <Table columns={columns} dataSource={data} />;
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: 'center',
//         }}
//       >
//       </Footer>
//     </Layout>
//   </Layout>
// );
      
    //   </>
    // )
}

export default Dashboard;
