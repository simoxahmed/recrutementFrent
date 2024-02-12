import React, { useState, useEffect } from 'react';
import CustomFileInput from '../fichierProfessionel/CustomDropzone';
import authService from '../../../services/authService';
import Cookies from 'js-cookie';

const UpdateDemand = ({ demandData }) => {
  const [formData, setFormData] = useState({
    domain_id: demandData.domain_id.id,
    ville_id: demandData.ville_id.id,
    type: demandData.type,
    contrat: demandData.contrat,
    description: demandData.description,
    titre: demandData.titre,
  });

  const [photoPost, setPhotoPost] = useState('');
  const [domains, setDomains] = useState([]);
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const domainsResponse = await authService.domainAll();
      setDomains(domainsResponse.data);

      const villesResponse = await authService.villes();
      setVilles(villesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = '';
      if (Cookies.get('TypeCompte') === 'entreprise') {
        response = await authService.createDemand(formData.domain_id, formData.ville_id, formData.type, formData.contrat, formData.description, photoPost, formData.titre, Cookies.get('entreprise_id'));
      } else {
        response = await authService.createDemand(formData.domain_id, formData.ville_id, formData.type, formData.contrat, formData.description, photoPost, formData.titre);
      }
      const msg = response.data.post_success;
      // Handle success message if needed
    } catch (error) {
      console.error('Error creating demand:', error.response.data);
      // Handle error response
    }
  };

  const removeCvFile = () => {
    setPhotoPost(null);
  };

  return (
    <div className="w-[90%] mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <CustomFileInput
            label="Photo du Post"
            onFileChange={(file) => setPhotoPost(file)}
            onRemove={removeCvFile}
            file={photoPost}
          />
        </div>

        <div className="mb-3">
          <div className="w-1/2 mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
              Titre:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex mb-3">
          <div className="w-1/2 mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain_id">
              Domain ID:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
              name="domain_id"
              value={formData.domain_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Domain ID</option>
              {domains && domains.map(group => (
                <optgroup label={group.name_domain} key={group.name_domain}>
                  {domains.map(domain => {
                    if (group.name_domain === domain.name_domain) {
                      return <option key={domain.id} value={domain.id}>{domain.metier}</option>;
                    }
                    return null; // If the condition is not met, return null
                  })}
                </optgroup>
              ))}
            </select>
          </div>


          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ville_id">
              Ville ID:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
              name="ville_id"
              value={formData.ville_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Ville ID</option>
              {villes.map(ville => (
                <option key={ville.id} value={ville.id}>{ville.name_ville}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex mb-3">
          <div className="w-1/2 mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type:
            </label>
            {Cookies.get('TypeCompte') === 'employee' &&
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="demand_stage">Demand Stage</option>
                <option value="demand_emploi">Demand Emploi</option>
              </select>}

            {Cookies.get('TypeCompte') === 'entreprise' &&
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="stage">Offer Stage</option>
                <option value="emploi">Offer d'Emploi</option>
              </select>}
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrat">
              Contrat:
            </label>
            
            {Cookies.get('TypeCompte') === 'entreprise' &&
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                name="contrat"
                value={formData.contrat}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Contrat</option>
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="anapec">Anapec</option>
              </select>
            }

            {Cookies.get('TypeCompte') === 'employee' &&
              <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
              name="contrat"
              value={formData.contrat}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Contrat</option>
              <option value="pay">Pay</option>
              <option value="no-pay">No Pay</option>
            </select>
            }
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow h-[150px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button
            className="fixed bottom-14 right-14 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-lg shadow-md"
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDemand;
