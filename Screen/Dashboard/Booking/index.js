import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import BookingAction from '../../../redux/booking/actions';
import SearchBooking from '../../../containers/searchBooking';
import BookingList from '../../../containers/bookingList';
import BookingSummary from '../../../containers/exportSummary';
import BookingChart from '../../../containers/bookingChart';
import BookingAdmin from '../../../containers/bookingAdmin';

class Booking extends React.Component {

    componentDidMount() {
        this.props.fetchAllBooking();
    }

    render() {
        return (
            <StyledWrapper>
                <BookingAdmin style={{ marginBottom: 10 }} />
                <SearchBooking style={{ marginBottom: 10 }} />
                <BookingList style={{ marginBottom: 10 }} />
            </StyledWrapper>
        )
    }
}

export default connect(state => state, BookingAction)(Booking);