import React from 'react';
import {
    Form,
    Checkbox,
    Input
} from 'antd';
import StyledForm from './style';
import Button from '../button';
import { Label } from '../typo';
import { withNamespaces } from '../../i18n';

class FormSignIn extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const { t } = this.props;
        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <Form.Item
                    label={t('phoneNumberOrPSUPassport')}
                    className='form-item'
                >
                    {
                        getFieldDecorator('signInfo')(<Input placeholder={t('phoneNumberOrPSUPassport')} />)
                    }
                </Form.Item>
                <Form.Item
                    label={t('password')}
                    className='form-item'
                >
                    {
                        getFieldDecorator('password')(<Input type='password' placeholder={t('password')} />)
                    }
                </Form.Item>
                <div className='input-left-right'>
                    <Checkbox>
                        <Label msg='rememberMe'/>
                    </Checkbox>
                    <Button type='primary' htmlType='submit' onClick={this.handleSubmit} msg='login' loading/>
                </div>
            </StyledForm >
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { form } = this.props;
        if (form && this.props.onSubmit) {
            await this.props.onSubmit({
                signInfo: form.getFieldValue('signInfo'),
                password: form.getFieldValue('password')
            })
        }

    }
}

const WrapperLoginForm = Form.create({ name: 'signin' })(FormSignIn);
export default withNamespaces('common')(WrapperLoginForm);