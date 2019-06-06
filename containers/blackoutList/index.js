import React from 'react';
import { connect } from 'react-redux';
import ModalAction from '../../redux/modal/actions';
import OperationTimeAction from '../../redux/operationTime/actions';
import { Card, Divider } from 'antd';
import Table from '../../components/table';
import { H2, TextLink } from '../../components/typo';
import text, { locale } from '../../common/text';
import moment from 'moment';
import colors from '../../styles/colors';

class BlackoutList extends React.Component {

    componentDidMount() {
        this.props.getBlackout();
    }

    render() {

        const { blackoutSeries } = this.props.OperationTime;
        const column = [
            {
                title: '#',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: text['title'],
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: text['start'],
                dataIndex: 'start',
                key: 'start',
            },
            {
                title: text['end'],
                dataIndex: 'end',
                key: 'end',
            },
            {
                title: text['action'],
                key: 'action',
                dataIndex: 'id',
                render: (id) => (
                    <div id={id}>
                        <TextLink id={id} style={{ color: colors.main3 }} onClick={this.handleDelete} msg='delete' />
                        <Divider type='vertical' />
                        <TextLink id={id} style={{ color: colors.main3 }} onClick={this.showDetail} msg='detail' />
                    </div>
                )
            }
        ];
        const dataSource = blackoutSeries.map((blackout, index) => ({
            no: index + 1,
            title: blackout.title,
            start: moment(blackout.start).locale(locale).format('DD MMM YYYY HH:mm'),
            end: moment(blackout.end).locale(locale).format('DD MMM YYYY HH:mm'),
            id: blackout.blackoutId
        }))

        return (
            <Card style={this.props.style}>
                <H2 msg='blackoutList' />
                <Table
                    columns={column}
                    dataSource={dataSource}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        )
    }

    handleDelete = async (e) => {
        const { id } = e.target;
        this.props.showConfirmModal('deleteBlackout', 'areYouSureToDeleteBlackout', () => {
            this.props.deleteBlackout(+id);
            this.props.hideModal();
        });
    }

    showDetail = (e) => {
        const { id } = e.target;
        const { blackoutSeries } = this.props.OperationTime;

        const blackout = blackoutSeries.find((b) => b.blackoutId === +id);

        const title = blackout.title;
        const detail = blackout.detail;
        const start = moment(blackout.start).locale(locale).format('DD MMMM YYYY HH:mm');
        const end = moment(blackout.end).locale(locale).format('DD MMMM YYYY HH:mm');

        const dataSource = {
            title,
            detail,
            start,
            end
        }

        this.props.showBlackoutDetailModal(dataSource);
    }
}

export default connect(
    state => state, 
    { ...OperationTimeAction, ...ModalAction }
)(BlackoutList);