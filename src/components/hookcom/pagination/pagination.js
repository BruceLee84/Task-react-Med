// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Page = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(4);

//   useEffect(() => {
//     setLoading(true);
//     const res = axios.get('http://localhost:3030/api/v3/product/getAllPage?page=1&size=4');
//     console.log('res', res.data.result)
//     setProducts(res.data.result);
//     setLoading(false);

//     // getAllPro();
//   }, []);

//   const getAllPro = async (page) => {
//     setLoading(true);
//     const res = await axios.get(`http://localhost:3030/api/v3/product/getAllPage?page=${page}&size=4`);
//     console.log('res', res.data.result)
//     setProducts(res.data.result);
//     setLoading(false);
//   };

// // https://jsonplaceholder.typicode.com/posts

//   // const LastProduct = currentPage * productsPerPage;
//   // const FirstProduct = LastProduct - productsPerPage;
//   // const currentProduct = products.slice(FirstProduct, LastProduct);

//   const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
//       pageNumbers.push(i);
//     }



//   if (loading) {
//       return <h2>Loading...</h2>;
//   }
  
//   return (
//       <>
//       <div className='container mt-5'>
//        <h1 className='text-primary mb-3'>All Products</h1>
//        <nav>
//         <ul className='pagination'>
//           {pageNumbers.map(number => (
//             <li key={number} className='page-item'>
//               {/* <p onClick={() => setCurrentPage(number)} className='page-link'>{number}</p> */}
//               <p onClick={() => getAllPro(number)} className='page-link'>{number}</p>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="progrid">
//                       {
//                           products.map((data, index)=>{
//                             // console.log('data', data.Name)
//                             return(
//                             <p key={index}>
//                                 <div className="procard">
//                                 <img src={data.image} width = '200' height='150'/>                            
//                                 <p className="price">Product: {data.Name}</p>
//                                 <p>Quantity: {data.Quantity}</p>
//                                 <p className="price">MRP: {data.price}</p>
//                                 <p>Manufacturer: {data.Manufacturer}</p>
//                                 <p>Category: {data.categoryName}</p>
//                                 <p className="prorat"> Ratings &#9733;&#9733;&#9733;</p>
//                                 <button className="btn10" >Buy Now</button>
//                                 </div>
//                             </p>
//                             )
//                           })
//                       }
//         </div>
//         </div>
//       </>
//     );
// };

// export default Page;













import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  useEffect(() => {
    getAllPro();
  }, []);

  const getAllPro = async (page) => {
    setLoading(true);
    const res = await axios.get(`http://localhost:3030/api/v3/product/getAllPage?page=${page}&size=4`);
    console.log('res', res.data.result)
    setProducts(res.data.result);
    setLoading(false);
  };

  // https://jsonplaceholder.typicode.com/posts

  // const LastProduct = currentPage * productsPerPage;
  // const FirstProduct = LastProduct - productsPerPage;
  // const currentProduct = products.slice(FirstProduct, LastProduct);

  const pageNumbers = [1, 2, 3, 4, 5, 6, 7];
  // for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
  //   pageNumbers.push(i);
  // }



  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className='container mt-5'>
        <h1 className='text-primary mb-3'>All Products</h1>
        <nav>
          <ul className='pagination'>
            {pageNumbers.map(number => (
              <li key={number} className='page-item'>
                {/* <p onClick={() => setCurrentPage(number)} className='page-link'>{number}</p> */}
                <p onClick={() => getAllPro(number)} className='page-link'>{number}</p>
              </li>
            ))}
          </ul>
        </nav>

        <div className="progrid">
          {
            products.map((data, index) => {
              // console.log('data', data.Name)
              return (
                <p key={index}>
                  <div className="procard">
                    <img src={data.image} width='200' height='150' />
                    <p className="price">Product: {data.Name}</p>
                    <p>Quantity: {data.Quantity}</p>
                    <p className="price">MRP: {data.price}</p>
                    <p>Manufacturer: {data.Manufacturer}</p>
                    <p>Category: {data.categoryName}</p>
                    <p className="prorat"> Ratings &#9733;&#9733;&#9733;</p>
                    <button className="btn10" >Buy Now</button>
                  </div>
                </p>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Page;