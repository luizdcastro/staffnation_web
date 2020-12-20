import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import SearchBar from '../../components/SearchBar'
import StaffCardSearch from '../../components/StaffCardSearch'

import { getAllStaffs } from '../../redux/actions/StaffActions'

import './styles.css'

const SearchStaffPage = ({ staff, dispatchGetAllStaffs }) => {
    const [filtereddStaff, setFilteredStaff] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => dispatchGetAllStaffs, [])

    useEffect(() => {
        setFilteredStaff(staff);
    }, [setFilteredStaff, staff]);

    useEffect(() => {
        setFilteredStaff(
            staff.filter((staff) =>
                staff.name.toLowerCase().includes(search.toLowerCase()),
            )
        );
    }, [staff, search]);

    return (
        <div className="search-staff">
            <div className="search-staff-container">
                <SearchBar onChange={(e) => setSearch(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 15 }}>
                    {filtereddStaff?.length >= 1
                        ? filtereddStaff.map((item) => (
                            <React.Fragment key={item._id}>
                                <StaffCardSearch
                                    image={item.avatar.url}
                                    name={item.name}
                                    rating={item.rating.toFixed(2)}
                                    phone={item.phone}
                                    neighborhood={item.address?.neighborhood}
                                    city={item.address?.city}
                                    categories={item.categories}
                                />
                            </React.Fragment>
                        ))
                        : null}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllStaffs: () => dispatch(getAllStaffs()),
});

const mapStateToProps = (state) => ({
    staff: state.staff
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchStaffPage)