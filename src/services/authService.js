import axios from 'axios';
import { Url } from '../Requests';

export const authHeaders = () => ({
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${Url}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (nm, np, email, password) => {
    try {
      const response = await axios.post(`${Url}/register`, { nm, np, email, password });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${Url}/logout`, null, authHeaders());
      return response.data;

    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getUser:

   async (entre_id='*') => {
    try {
      const response = await axios.get(`${Url}/user/${entre_id}`, authHeaders());
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  
  },

  navigate: async (type) => {
    try {
      const response = await axios.get(`${Url}/${type}/list/`, authHeaders());
      console.log(response,type);
      return response.data;
    } catch (error) {
      console.error('Navigation error:', error);
      throw error;
    }
  },

  postulation: async (employee_id,cv,lettre,lettre_text,fichier,publication_id) => {
    try {
      const formData = new FormData();
        formData.append('employee_id', employee_id);
        formData.append('cv', cv);
        formData.append('lettre', lettre);
        formData.append('lettre_text', lettre_text);
        formData.append('fichier', fichier);
        formData.append('publication_id', publication_id);
        // console.log('formData:',formData.get('employee_id'),formData.get('cv'),formData.get('lettre'),formData.get('lettre_text'),formData.get('fichier'),formData.get('publication_id'));
      const response = await axios.post(`${Url}/postulation`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('Navigation error:', error);
      throw error;
    }
  },

  listPostulation: async () => {
    try {
      const response = await axios.get(`${Url}/list/postulation`, authHeaders());
      return response.data;
    } catch (error) {
      console.error('List Postulation error:', error);
      throw error;
    }
  },

  profileUpdate: async (nm, np, email, tele, ville_name, zip, state, photo) => {
    try {
      const formData = new FormData();
        formData.append('nm', nm);
        formData.append('np', np);
        formData.append('email', email);
        formData.append('tele', tele);
        formData.append('villename', ville_name);
        formData.append('zip', zip);
        formData.append('state', state);
        formData.append('photo', photo);
        // console.log('formData:',formData.get('nm'),formData.get('np'),formData.get('email'),formData.get('tele'),formData.get('villename'),formData.get('zip'),formData.get('state'),formData.get('photo'))
      const response = await axios.post(`${Url}/profile`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('update error:', error);
      throw error;
    }
  },

  //entreprise
  profileUpdateEntreprise: async (nm, np, email, entreprise, tele, photoEntr, photoCover, entreprise_id) => {
    try {
      const formData = new FormData();
        formData.append('nm', nm);
        formData.append('np', np);
        formData.append('email', email);
        formData.append('nom_entreprise', entreprise);
        formData.append('tele', tele);
        formData.append('photo', photoEntr);
        formData.append('photocover', photoCover);
        formData.append('entreprise_id', entreprise_id);
        // console.log('formData:',formData.get('nm'),formData.get('np'),formData.get('email'),formData.get('nom_entreprise'),formData.get('tele'),formData.get('photo'),formData.get('photocover'),formData.get('entreprise_id'))
      const response = await axios.post(`${Url}/profile/entreprise`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('update Entreprise error:', error);
      throw error;
    }
  },

  postulationEntre: async (entreprise_id,publication_id) => {
    try {
      const formData = new FormData();
        formData.append('entreprise_id', entreprise_id);
        formData.append('publication_id', publication_id);
        // console.log('formData:',formData.get('entreprise_id'),formData.get('publication_id'));
      const response = await axios.post(`${Url}/postulation/entreprise`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('Navigation error:', error);
      throw error;
    }
  },

  listPostulationEntre: async (entreprise_id) => {
    try {
      const response = await axios.get(`${Url}/list/postulation/entreprise/${entreprise_id}`, authHeaders());
      return response.data;
    } catch (error) {
      console.error('List Postulation error:', error);
      throw error;
    }
  },

  fichierAdd: async (cv,lettre,fichier) => {
    try {
      const formData = new FormData();
        formData.append('cv', cv);
        formData.append('lettre', lettre);
        formData.append('fichier', fichier);
        // console.log('formData:',formData.get('cv'),formData.get('lettre'),formData.get('fichier'));
      const response = await axios.post(`${Url}/fichierAdd`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('Navigation error:', error);
      throw error;
    }
  },

  
  createDemand: async (domain_id,ville_id,type,contrat,description,photopost,titre,entreprise_id=null) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('domain_id', domain_id);
      formDataToSend.append('ville_id', ville_id);
      formDataToSend.append('type', type);
      formDataToSend.append('contrat', contrat);
      formDataToSend.append('description', description);
      formDataToSend.append('photopost', photopost);
      formDataToSend.append('titre', titre);
      formDataToSend.append('entreprise_id', entreprise_id);
        console.log('formDataToSend:',formDataToSend.get('domain_id'),formDataToSend.get('ville_id'),'**type**',formDataToSend.get('type'),formDataToSend.get('contrat'),formDataToSend.get('description'),formDataToSend.get('photopost'),formDataToSend.get('titre'),formDataToSend.get('entreprise_id'));
      const response = await axios.post(`${Url}/demand/create`, formDataToSend, authHeaders());
      console.log(response);
      return response;
    } catch (error) {
      console.error('DemandCreate error:', error);
      throw error;
    }
  },

  listDemand: async (entreprise_id=null) => {
    try {
      const response = await axios.get(`${Url}/list/demand/${entreprise_id}`, authHeaders());
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('DemandList error:', error);
      throw error;
    }
  },

  Demanddestroy: async (id) => {
    try {
      const response = await axios.delete(`${Url}/demand/delete/${id}`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('DemandCreate error:', error);
      throw error;
    }
  },

  DemandUpdate: async (id,domain_id,ville_id,type,contrat,description,photopost,titre) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('domain_id', domain_id);
      formDataToSend.append('ville_id', ville_id);
      formDataToSend.append('type', type);
      formDataToSend.append('contrat', contrat);
      formDataToSend.append('description', description);
      formDataToSend.append('photopost', photopost);
      formDataToSend.append('titre', titre);
        // console.log('formDataToSend:',id ,formDataToSend.get('domain_id'),formDataToSend.get('ville_id'),formDataToSend.get('type'),formDataToSend.get('contrat'),formDataToSend.get('description'),formDataToSend.get('photopost'),formDataToSend.get('titre'));
      const response = await axios.post(`${Url}/demand/update/${id}`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('DemandCreate error:', error);
      throw error;
    }
  },

  FavorateList: async (entreprise_id) => {
    try {
      const response = await axios.get(`${Url}/favorates/${entreprise_id}`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('FavorateList error:', error);
      throw error;
    }
  },

  
  FavorateCreate: async (publication_id,entreprise_id=null) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('publication_id', publication_id);
      formDataToSend.append('entreprise_id', entreprise_id);
      const response = await axios.post(`${Url}/favorate/create`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('DemandCreate error:', error);
      throw error;
    }
  },

  FavorateDestroy: async (id) => {
    try {
      const response = await axios.delete(`${Url}/favorate/delete/${id}`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('FavorateDestroy error:', error);
      throw error;
    }
  },

  
  ChangeToEntre: async (nom_entreprise, tele, photo, photocover) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nom_entreprise', nom_entreprise);
      formDataToSend.append('tele', tele);
      formDataToSend.append('photo', photo);
      formDataToSend.append('photocover', photocover);
      const response = await axios.post(`${Url}/reglage/create`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('ChangeToEntre error:', error);
      throw error;
    }
  },

  
  AllUser: async () => {
    try {
      const response = await axios.get(`${Url}/gestion/user`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  
  addUser: async (user_id, entreprise_id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', user_id);
      formDataToSend.append('entreprise_id',entreprise_id );
      const response = await axios.post(`${Url}/gestion/add/user`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  ListUserEntre: async (id) => {
    try {
      const response = await axios.get(`${Url}/gestion/userentre/${id}`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  listPrimition: 
  
  async () => {
    try {
      const response = await axios.get(`${Url}/gestion/autorisations`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  
  
  },

  
  listRoles: async () => {
    try {
      const response = await axios.get(`${Url}/gestion/roles`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  createRoles: async (nm,description) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', nm);
      formDataToSend.append('description',description );
      const response = await axios.post(`${Url}/gestion/role/add`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  
  givePrimition: async (role_id,permission_id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('role_id', role_id);
      permission_id.forEach((id) => {
          formDataToSend.append('permission_id[]', parseInt(id));
      });
      // console.log(formDataToSend.get('role_id'),formDataToSend.getAll('permission_id[]'));
      const response = await axios.post(`${Url}/gestion/autorisation/give`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  RolePermitions: async (id) => {
    try {
      const response = await axios.get(`${Url}/gestion/role/${id}/permitions`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  giveRoles: async (userEnre_id,role_ids) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userEnre_id', userEnre_id);
      // formDataToSend.append('role_id',role_ids );
      role_ids.forEach((id) => {
        formDataToSend.append('role_id[]', parseInt(id));
    });
      const response = await axios.post(`${Url}/gestion/role/give`, formDataToSend, authHeaders());
      console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  UserRoles: async (id) => {
    try {
      const response = await axios.get(`${Url}/gestion/role/${id}/user`, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },


  listMsg: async (entreprise_id) => {
    try {
      const response = await axios.get(`${Url}/list/msg/${entreprise_id}`, authHeaders());
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  actionMsg: async (statu,id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('statu', statu);
      const response = await axios.post(`${Url}/msg/update/${id}`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  indexPricing: async () => {
    try {
      const response = await axios.get(`${Url}/entreprise/pricing`, authHeaders());
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },
  
  publicDemand: async (pricing_id,publication_id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('pricing_id', pricing_id);
      formDataToSend.append('publication_id', publication_id);
      const response = await axios.post(`${Url}/entreprise/public`, formDataToSend, authHeaders());
      // console.log(response);
      return response;
    } catch (error) {
      console.error('publicDemand error:', error);
      throw error;
    }
  },

  indexPackage: async () => {
    try {
      const response = await axios.get(`${Url}/entreprise/packages`, authHeaders());
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  chargePoint: async (package_id,entreprise_id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('package_id', package_id);
      formDataToSend.append('entreprise_id', entreprise_id);
      const response = await axios.post(`${Url}/entreprise/charge`, formDataToSend, authHeaders());
      return response;
    } catch (error) {
      console.error('publicDemand error:', error);
      throw error;
    }
  },

  //conferm anvite entrepris

  confirmInvited: async (entreprise_id, state_user) => {
    try {
      const formData = new FormData();
        formData.append('entreprise_id', entreprise_id);
        formData.append('state_user', state_user);
        // console.log('formData:',formData.get('entreprise_id'),formData.get('state_user'))
      const response = await axios.post(`${Url}/profile/entreprise/confirm`, formData, authHeaders());
      return response;
    } catch (error) {
      console.error('update error:', error);
      throw error;
    }
  },

  
  domain: async () => {
    try {
      const response = await axios.get(`${Url}/nav/domains`, authHeaders());
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  domainAll: async () => {
    try {
      const response = await axios.get(`${Url}/domains`, authHeaders());
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  villes: async () => {
    try {
      const response = await axios.get(`${Url}/nav/ville`, authHeaders());
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('UsersList error:', error);
      throw error;
    }
  },

  

};

export default authService;
