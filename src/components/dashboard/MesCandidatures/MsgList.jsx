import React, { useEffect, useState } from 'react';
import authService from '../../../services/authService';
import Cookies from 'js-cookie';
import DropDownMsg from './DropDownMsg';
import { UrlStorage } from '../../../Requests';

const MsgList = () => {
  const [msgListData, setMsgListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  useEffect(() => {
    fetchDataMsg();
  }, []);

  const fetchDataMsg = async () => {
    try {
      const response = await authService.listMsg(Cookies.get('entreprise_id'));
    //   console.log(response);
      const list = response.data;
      setMsgListData(list);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add update logic here
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // Add delete logic here
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setSelectedStatusFilter(e.target.value);
  };
  console.log(msgListData);

  const filteredMsgList = msgListData.filter((msg) => {
    const matchesSearchQuery = msg.employee?.user_id.nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.employee?.user_id.np.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.employee?.user_id.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.employee?.tele.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter = selectedStatusFilter === 'all' || msg.statu === selectedStatusFilter;

    return matchesSearchQuery && matchesStatusFilter;
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <select
          value={selectedStatusFilter}
          onChange={handleStatusFilterChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="ready">Ready</option>
          <option value="favorate">Favorate</option>
          <option value="archive">Archive</option>
        </select>
      </div>
      <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Photo Publication
            </th>
            <th scope="col" className="px-6 py-3">
              Nom D'Employee
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Tele
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMsgList.map((msg) => (
            <tr key={msg.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <img className='object-cover w-36 rounded-md' src={UrlStorage + msg.publication?.photopost} alt="" srcSet="" />
              </td>
              <td className="px-6 py-4">
                {msg.employee?.user_id.nm + ' ' + msg.employee?.user_id.np}
              </td>
              <td className="px-6 py-4">
                {msg.employee?.user_id.email}
              </td>
              <td className="px-6 py-4">
                {msg.employee?.tele}
              </td>
              <td className="px-6 py-4">
                <DropDownMsg options={msg.employee} handleOptionchange={handleUpdate} handleDeleteClick={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MsgList;
