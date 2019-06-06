import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Card, Divider, Modal } from 'antd';
import OperatioTimeAction from '../../redux/operationTime/actions';
import InputDateTime from '../../components/inputDateTime';
import Button from '../../components/button';
import Input from '../../components/input';
import Table from '../../components/table';
import TextArea from '../../components/textArea';
import { H2, Label, TextLink } from '../../components/typo';
import text, { locale } from '../../common/text';
import colors from '../../styles/colors';

class Blackout extends React.Component {

    constructor(props) {
        super(props);
        const tomorrow = moment().add(1, 'day').hour(0).minute(0);
        const nextDay = moment().add(1, 'day').hour(23).minute(59);

        this.state = {
            start: {
                minute: tomorrow.minute(),
                hour: tomorrow.hour(),
                date: tomorrow.date(),
                month: tomorrow.month(),
                year: tomorrow.year()
            },
            end: {
                minute: nextDay.minute(),
                hour: nextDay.hour(),
                date: nextDay.date(),
                month: nextDay.month(),
                year: nextDay.year()
            },
            title: '',
            detail: '',
        }
    }

    render() {
        const { start, end } = this.state;

        return (
            <Card style={this.props.style}>
                <Row gutter={8}>
                    <H2 msg='addBlackout' />
                    <Col sm={24} md={24} lg={24} xl={12}>
                        <Label htmlFor='startDate' msg='startDate' />
                        <InputDateTime
                            id='startDate'
                            style={{ display: 'flex' }}
                            dateContainerStyle={{ display: 'flex', flex: 1, marginRight: 10 }}
                            minute={start.minute}
                            hour={start.hour}
                            date={start.date}
                            month={start.month}
                            year={start.year}
                            onChange={this.handleStartChange}
                        />
                        <Label htmlFor='endDate' msg='endDate' />
                        <InputDateTime
                            id='endDate'
                            style={{ display: 'flex' }}
                            dateContainerStyle={{ display: 'flex', flex: 1, marginRight: 10 }}
                            minute={end.minute}
                            hour={end.hour}
                            date={end.date}
                            month={end.month}
                            year={end.year}
                            onChange={this.handleEndChange}
                        />
                    </Col>
                    <Col sm={24} md={24} lg={24} xl={12}>
                        <Label htmlFor='inputTitle' msg='blackoutTitle' /><br />
                        <Input id='inputTitle' name='title' placeholder={text['blackoutTitleEx']} onChange={this.handleChange} style={{ marginBottom: 10 }} /> <br />
                        <Label htmlFor='inputDetail' msg='detail' /><br />
                        <TextArea id='inputDetail' name='detail' placeholder={text['detail']} row={4} onChange={this.handleChange} style={{ marginBottom: 10 }} /><br />
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={this.handleAdd} type='primary' style={{ marginBottom: 10 }}>{text['add']}</Button>
                    </Col>
                </Row>
            </Card>
        )
    }

    handleStartChange = (key, value) => {
        let { start } = this.state;
        start = { ...start, [key]: value }
        this.setState({ start })
    }

    handleEndChange = (key, value) => {
        let { end } = this.state;
        end = { ...end, [key]: value }
        this.setState({ end })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleAdd = async () => {
        let { start, end, title, detail } = this.state;
        const dto = {
            start: moment().year(start.year).month(start.month).date(start.date).hour(start.hour).minute(start.minute).format(),
            end: moment().year(end.year).month(end.month).date(end.date).hour(end.hour).minute(end.minute).format(),
            title,
            detail
        };
        await this.props.createBlackout(dto);
    }

}

export default connect(state => state, OperatioTimeAction)(Blackout);