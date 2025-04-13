import React, { useContext, useState, useEffect } from 'react';
import { BooksContext } from '../context/BooksContext';
import { FaUserCircle, FaSadTear } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; 

function Profile() {
  const { logout, userDetails, updateUserDetails } = useContext(BooksContext);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      Phone: 'Empty',
      Address: 'Empty',
      City: 'Empty',
      State: 'Empty',
      PinCode: 'Empty'
  });
  
  useEffect(() => {
    setFormData({
      Phone: userDetails.Phone || 'Empty',
      Address: userDetails.Address || 'Empty',
      City: userDetails.City || 'Empty',
      State: userDetails.State || 'Empty',
      PinCode: userDetails.PinCode || 'Empty'
    });
  }, [userDetails]);

  const Navigate = useNavigate();

  // Handle Logout Confirmation
  const handleLogout = () => {
    logout();
    setShowPopup(false);
    Navigate('/', { replace: true });
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Update API Call)
  const handleUpdate = async () => {
    await updateUserDetails(formData);
    setIsEditing(false);
  };

  return (
    <div className="container my-2">
      <div className="row d-flex justify-content-center align-items-center flex-column-reverse flex-lg-row">
        {/* Left Section: Orders */}
        <div className="col-lg-7 mb-4 mt-2">
          <h4 className="mb-3">Your Orders</h4>
          <p className="text-danger">"Orders Component Currently Under Maintenance"</p>
        </div>

        {/* Right Section: Profile Details */}
        <div className="col-lg-5">
          <div className="mb-2 p-4 d-flex flex-column align-items-center">
            {/* Profile Image */}
            <FaUserCircle size={100} className="text-secondary mb-2" />
            <div className="text-center mb-3">
              <h5>Welcome <span className='text-success'>{localStorage.getItem("user")}</span></h5>
              <p className="text-muted">{localStorage.getItem("email")}</p>
            </div>
            {/* Profile Form */}
            <form className="w-100">
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="Phone" 
                  value={formData.Phone} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="Address" 
                  value={formData.Address} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="City" 
                  value={formData.City} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">State</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="State" 
                  value={formData.State} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">PinCode</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="PinCode" 
                  value={formData.PinCode} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              {/* Edit & Update Buttons */}
              {isEditing ? (
                <div className="d-flex justify-content-evenly align-items-center">
                  <button type="button" className="btn btn-success me-3" onClick={handleUpdate}>Update</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn btn-primary w-100" onClick={() => setIsEditing(true)}>Edit</button>
              )}
            </form>

            {/* Logout Button */}
            <button className="btn btn-danger mt-3" onClick={() => setShowPopup(true)}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="alert m-5 p-4 text-center" style={{ maxWidth: '800px' }}>
            <FaSadTear size={80} className="text-warning mb-3" />
            <h5>Are you sure you want to logout?</h5>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
