import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import SearchBar from '../../components/SearchBar'
import StaffCardSearch from '../../components/StaffCardSearch'

import { getAllStaffs } from '../../redux/actions/StaffActions'
import { getMe, createFavorite, removeFavorite } from '../../redux/actions/BusinessActions'
import NoResult from '../../assets/no-result-search.png'

import './styles.css'

const SearchStaffPage = ({
    staff,
    job,
    business,
    dispatchGetMe,
    dispatchGetAllStaffs,
    dispatchAddFavorite,
    dispatchDeleteFavorite
}) => {
    const [filteredStaff, setFilteredStaff] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => dispatchGetAllStaffs,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    useEffect(() => dispatchGetMe,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    useEffect(() => {
        setFilteredStaff(staff);
    }, [setFilteredStaff, staff]);

    useEffect(() => {
        setFilteredStaff(
            staff.filter((staff) =>
                staff.name?.toLowerCase().includes(search.toLowerCase()) ||
                staff.address.neighborhood?.toLowerCase().includes(search.toLowerCase()) ||
                staff.address.city?.toLowerCase().includes(search.toLowerCase()) ||
                staff.categories[0]?.name.includes(search) ||
                staff.categories[1]?.name.includes(search)
            )
        );
    }, [staff, search]);

    function handleAddFavorite(userId) {
        dispatchAddFavorite(
            userId,
            business.data._id,
            () => dispatchGetMe(),
            (error) => console.log(error)
        );
    }

    function handleDeleteFavorite(userId) {
        dispatchDeleteFavorite(
            userId,
            business.data._id,
            () => dispatchGetMe(),
            (error) => console.log(error)
        );
    }
    return (
        <div className="search-staff">
            <div className="search-staff-container">
                <SearchBar onChange={(e) => setSearch(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 15 }}>
                    {filteredStaff?.length >= 1
                        ? filteredStaff.map((item) => (
                            < React.Fragment key={item._id} >
                                <StaffCardSearch
                                    staffId={item._id}
                                    image={item.avatar.url}
                                    name={item.name}
                                    rating={item.rating.toFixed(2)}
                                    phone={item.phone}
                                    neighborhood={item.address?.neighborhood}
                                    city={item.address?.city}
                                    categories={item.categories}
                                    favoriteStaffs={business.data?.favorites}
                                    addFavorite={() => handleAddFavorite(item._id)}
                                    deleteFavorite={() => handleDeleteFavorite(item._id)}
                                />
                            </React.Fragment>
                        ))
                        :
                        <div style={{ marginTop: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <div >
                                <p style={{ fontWeight: 400, color: 'grey', fontSize: 18, textAlign: 'center' }}>Nenhum item foi encontrado!</p>
                                <p style={{ fontWeight: 300, color: 'grey', fontSize: 14, textAlign: 'center' }}>Você pode tentar uma nova busca com termos diferentes :) </p>
                                <img src={NoResult} style={{ width: 350, height: 270, marginTop: 50 }} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllStaffs: () => dispatch(getAllStaffs()),
    dispatchGetMe: () => dispatch(getMe()),
    dispatchAddFavorite: (favorite, businessId, onSuccess, onError) => dispatch(createFavorite({ favorite }, businessId, onSuccess, onError)),
    dispatchDeleteFavorite: (favorite, businessId, onSuccess, onError) => dispatch(removeFavorite({ favorite }, businessId, onSuccess, onError)),

});

const mapStateToProps = (state) => ({
    staff: state.staff,
    job: state.job,
    business: state.business
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchStaffPage)