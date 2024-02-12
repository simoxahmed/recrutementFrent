import React, { useEffect, useState } from "react";
import authService from "../../../services/authService";
import Cookies from "js-cookie";
import { UrlStorage } from "../../../Requests";

const NotificationItem = ({ data, fetchDataUser }) => {

    const handlAccept= async()=>{
        try {
            const response = await authService.confirmInvited(data.entreprise_id.id, 'user');
            const msg=response.data;
            console.log(msg);
            // Refetch data after successful acceptance
            fetchDataUser();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlUnaccept= async()=>{
        try {
            const response = await authService.confirmInvited(data.entreprise_id.id, 'unaccept');
            const msg=response.data;
            console.log(msg);
            // Refetch data after successful unacceptance
            fetchDataUser();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <div className="flex-shrink-0 mr-4">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={UrlStorage + data.entreprise_id.photo}
          alt={data.entreprise_id.nom_entreprise}
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold">{data.entreprise_id.nom_entreprise}</h3>
        <p className="text-gray-500">{data.entreprise_id.tele}</p>
      </div>
      <div className="flex-shrink-0">
        <button onClick={handlAccept} className="bg-green-500 text-white rounded-full p-2 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button onClick={handlUnaccept} className="bg-red-500 text-white rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const NotificationPage = () => {
    const [userDatas, setUserData] = useState([]);
    
    const fetchDataUser = async () => {
        try {
            const response = await authService.getUser(Cookies.get('entreprise_id'));
            const [data] = response.data;
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, []); // Fetch data when component mounts

    const filteredUserDatas = userDatas.userEntreprise && userDatas.userEntreprise.filter(userData => userData.state_user === 'invited');

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Notification List</h2>
      {filteredUserDatas && filteredUserDatas.map((userData, index) => (
        <NotificationItem key={index} data={userData} fetchDataUser={fetchDataUser} />
      ))}
    </div>
  );
};

export default NotificationPage;
