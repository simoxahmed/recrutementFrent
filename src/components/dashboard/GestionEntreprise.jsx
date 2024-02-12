import React from 'react'
import ListEntre from './GestionEntreprise/ListEntre'
import ListUserEntre from './GestionEntreprise/ListUserEntre'
import Authorisation from './GestionEntreprise/Authorisation'
import Package from './GestionEntreprise/Package'
import Cookies from 'js-cookie'

const GestionEntreprise = ({activeSub}) => {
  return (
    <div>
        {activeSub === 'gestionEntreprise' && <ListEntre />}
        {activeSub === 'listEntre' && <ListEntre />}
        {activeSub === 'ListUserEntre' && <ListUserEntre />}
        {activeSub === 'auth' && <Authorisation />}
        {activeSub === 'package' && Cookies.get('entreprise_id') && <Package publication_id={Cookies.get('entreprise_id')} />}
    </div>
  )
}

export default GestionEntreprise