import React from 'react';
import StyledWrapper, { EditableText } from './style';
import { PageTitle, H3, Label } from '../../components/typo';
import { Button, notification } from 'antd';
import { withNamespaces, i18n, Router } from '../../i18n';
import { connect } from 'react-redux';
import moment from 'moment';
import UserService from '../../core/service/userService';

const Row = (props) => {
    const { title, children } = props;
    return (
        <tr onClick={props.onClick}>
            <td>
                <H3>{title}</H3>
            </td>
            <td className='td-content'>
                {children}
            </td>
        </tr>
    )
}

class Account extends React.Component {

    constructor(props) {
        super(props);
        const { user } = props.Auth;
        this.state = {
            fname: user.fname || '',
            lname: user.lname || '',
            email: user.email || '',
            position: user.position || '',
            phoneNumber: user.phoneNumber || ''
        }
    }

    render() {
        const { t } = this.props;
        const { user } = this.props.Auth;

        const { psuPassport } = user;
        const { fname, lname, email, position, phoneNumber } = this.state;

        return (
            <StyledWrapper>
                <div className='title'><PageTitle msg='account' /></div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <Row title={t('firstname')}>
                            <EditableText editable={{ onChange: (val) => this.handleChange('fname', val) }}>
                                {fname}
                            </EditableText>
                        </Row>
                        <Row title={t('lastname')}>
                            <EditableText editable={{ onChange: (val) => this.handleChange('lname', val) }}>
                                {lname}
                            </EditableText>
                        </Row>
                        <Row title={t('type')}>
                            <Label>{position}</Label>
                        </Row>
                        {
                            psuPassport.length > 0 && (
                                <Row title='PSU Passport'>
                                    <Label>{psuPassport}</Label>
                                </Row>
                            )
                        }
                        {this.renderExpiresMember()}
                        <Row title={t('email')}>
                            <EditableText editable={{ onChange: (val) => this.handleChange('email', val) }}>
                                {email}
                            </EditableText>
                        </Row>
                        <Row title={t('phoneNumber')}>
                            <EditableText editable={{ onChange: (val) => this.handleChange('phoneNumber', val) }}>
                                {phoneNumber}
                            </EditableText>
                        </Row>
                    </tbody>
                </table>
            </StyledWrapper>
        )
    }

    renderExpiresMember = () => {
        const { t } = this.props;
        const locale = i18n.language || 'en';
        const { user } = this.props.Auth;
        const { position } = this.state;

        if (position === 'member') {
            const endText = moment(user.memberEnd).locale(locale).format('DD MMM YYYY HH:mm');
            return (
                <Row title={t('memberExpires')}>
                    <Label>{endText}</Label>
                </Row>
            )
        }
        return null
    }

    handleChange = async (key, value) => {
        const { t } = this.props;
            const { idToken, user } = this.props.Auth;
            const dto = {
                userId: user.userId,
                [key]: value
            }
            const result = await UserService.updateUser(idToken, dto);
            if (result) {
                if (result.error) {
                    notification['error']({
                        duration: 2,
                        message: t('error'),
                        description: t(result.error)
                    })
                } else {
                    notification['success']({
                        duration: 2,
                        message: t('success'),
                        description: t('update user success')
                    })
                    this.setState({ [key]: value });
                }
            }
    }
}

export default connect(state => state)(withNamespaces('common')(Account));