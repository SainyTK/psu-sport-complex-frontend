import React from 'react'

import { withNamespaces } from '../i18n'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode = null
    if (res) {
      ({ statusCode } = res)
    } else if (err) {
      ({ statusCode } = err)
    }
    return {
      namespacesRequired: ['common'],
      statusCode,
    }
  }

  render() {
    const { statusCode, t } = this.props
    return (
      <p>
        {statusCode
          ? t('error-with-status', { statusCode })
          : t('error-without-status')}
      </p>
    )
  }
}

export default withNamespaces('common')(Error)