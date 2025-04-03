import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const Items = () => {
    const [items, setItems] = useState([]);
    const [updateItems, setUpdateItems] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        fetch("https://vica.website/api/items", {
            headers: {
                Accept: "application/json",
                "AUTHORIZATION": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(res => setItems(res))
        .catch(err => console.log(err));
    }, [updateItems]);
    const confirmDelet = (id) => {
        setIdToDelete(id);
        setShowModal(true); 
    };
        const navigate=useNavigate()
        
        const deletItem=()=>{
            axios.delete(`https://vica.website/api/items/${idToDelete}`,
                {
                    headers:{
                        Accept: "application/json",
                        Authorization:localStorage.getItem("token"),
                    }
                }).then(res=>{
                    console.log(res.data);
                    setUpdateItems(!updateItems);
                    setShowModal(false);
                })
                .catch(err=>console.log(err))
        }
    return (
        <div className="items-container">
            <div className="ManageProduct">
            <h2>Manage Products</h2>
            <button className='ManageProductBtn' onClick={() => navigate('/dashboard/add')}>
                +Add Product
            </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>
                            <img src={item.image_url} alt={item.name} width="50" />
                            </td>
                            <td>
                                <div className="action">
                                <button className='Edit'><Link to={`/dashboard/items/edit/${item.id}`}><FaRegEdit style={{fill:'#000'}}/></Link>
                                </button>
                                <button className='Delet' onClick={() => confirmDelet(item.id)}><RiDeleteBinLine style={{fill:'#EF3826'}} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
        <div className="modal-overlay">
          <div className="modal"> 
            <p>Are you sure you want to delete the product?</p>
            <div className="modal-buttons">
              <button className="yes-btn" onClick={deletItem}>Yes</button>
              <button className='no-btn' onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
        </div>
        
    );
};

export default Items;
