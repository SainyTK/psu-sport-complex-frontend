import React from 'react';
import _ from 'lodash';
import StyledRow, {
    SlotTitle,
    Slot,
    Badge
} from './style';
import {
    Col,
    Icon
} from 'antd';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';

class BookingSlot extends React.Component {
    render() {
        const {
            court,
            bookingData,
            selected
        } = this.props.dataSource;
        const isBooked = !!bookingData;
        const isApproved = bookingData && bookingData.status === 'approved'

        return (
            <Slot seleted={selected} onClick={this.toggleSelect}>
                <SlotTitle booked={isBooked} approved={isApproved}>
                    {`Court ${court + 1}`}
                </SlotTitle>
                <div className='slot-info'>
                    {isBooked ?
                        [<>
                            Booked<br />
                            by<br />
                            {bookingData && bookingData.owner.fname}
                        </>] :
                        ['Available']
                    }
                </div>
                {!isBooked && selected && <Icon type="check-circle" className='check'/>}
            </Slot>
        )
    }

    toggleSelect = () => {
        let { court, start, bookingData, selected } = this.props.dataSource;
        const isBooked = !!bookingData;
        if (isBooked)
            return;

        this.props.onSelect && this.props.onSelect({
            start,
            court,
            selected: !selected
        })
    }
}

class BookingCard extends React.Component {
    render() {
        const {
            start,
            end,
            numCourt,
            bookingData
        } = this.props.dataSource;
        const { selectedBooking } = this.props.Booking;

        return (
            <StyledRow type='flex' align='middle'>
                <Col className='duration' xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <div className='start-time'>
                        {start}
                    </div>
                    <div className='line-container'>
                        <div className='line' />
                    </div>
                    <div className='end-time'>
                        {end}
                    </div>
                </Col>
                <Col className='slot-container' xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    {
                        _.range(0, numCourt).map((num) => {
                            let selected = false;
                            if (selectedBooking[start] && selectedBooking[start][num])
                                selected = true;

                            const data = {
                                start,
                                court: num,
                                bookingData: !bookingData ? null : bookingData[num],
                                selected
                            }
                            return (
                                <BookingSlot key={num} dataSource={data} onSelect={this.handleSelect} />
                            )
                        })
                    }
                </Col>
            </StyledRow>
        )
    }

    handleSelect = async data => {
        await this.props.selectBooking(data);
    }
}

export default connect(
    state => state,
    BookingAction,
)(BookingCard);