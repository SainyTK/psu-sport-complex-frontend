import React from 'react';
import StyledWarpper from './style';
import { Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';
import { months } from '../../common/text/';
import { Label } from '../../components/typo';
import { withNamespaces, i18n } from '../../i18n';

const SelectOption = Select.Option;

class SelectDate extends React.Component {

    componentDidMount() {
        const { selectedDate } = this.props.Booking;

        if (selectedDate)
            this.props.selectDate(moment(selectedDate));
        else
            this.props.selectDate(moment())
    }

    render() {
        const { selectedDate } = this.props.Booking;
        const locale = i18n.language || 'en';
        const MONTHS = months[locale];
        const defaultDate = moment(selectedDate);

        const day = defaultDate ? defaultDate.get('date') : 1;
        const month = defaultDate ? defaultDate.get('month') : 0;
        const year = defaultDate ? defaultDate.get('year') : 1999;

        const thisYear = parseInt(moment().format('YYYY'));
        return (
            <StyledWarpper style={this.props.style}>
                <Select
                    value={day}
                    onChange={this.changeDay}
                >
                    {_.range(1, 31).map((day) => (
                        <SelectOption key={day} value={day}><Label msg={day}/></SelectOption>
                    ))}
                </Select>
                <Select
                    value={month}
                    onChange={this.changeMonth}
                    className='select-month'
                    style={{width: '100%'}}
                >
                    {MONTHS.map((month, index) => (
                        <SelectOption key={month} value={index} ><Label msg={month}/></SelectOption>
                    ))}
                </Select>
                <Select
                    value={year}
                    onChange={this.changeYear}
                >
                    {_.range(1900, parseInt(thisYear) + 1).map((year) => (
                        <SelectOption key={year} value={year} ><Label msg={year}/></SelectOption>
                    ))}
                </Select>
            </StyledWarpper>
        )
    }


    changeDay = day => {
        let { selectedDate } = this.props.Booking;

        let updated = moment(selectedDate).clone().date(day);
        this.props.selectDate(updated);
    }

    changeMonth = month => {
        let { selectedDate } = this.props.Booking;

        let updated = moment(selectedDate).clone().month(month);
        this.props.selectDate(updated);
    }

    changeYear = year => {
        let { selectedDate } = this.props.Booking;

        let updated = moment(selectedDate).clone().year(year);
        this.props.selectDate(updated);
    }
}

export default connect(state => state, BookingActions)(withNamespaces('common')(SelectDate));