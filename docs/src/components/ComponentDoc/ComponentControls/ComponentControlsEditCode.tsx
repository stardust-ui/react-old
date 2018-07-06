import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsToolTip from './ComponentControlsToolTip'

const content = 'Edit Code'

const ComponentControlsEditCode: any = ({ active, onClick }) => (
  <ComponentControlsToolTip content={content}>
    <Menu.Item active={active} onClick={onClick}>
      <Icon color={active ? 'green' : 'grey'} fitted name="code" size="large" />
      {content}
    </Menu.Item>
  </ComponentControlsToolTip>
)

ComponentControlsEditCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsEditCode)
