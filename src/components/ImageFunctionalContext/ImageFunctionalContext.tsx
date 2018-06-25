import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import {
  customPropTypes,
  getComponentClassName,
  getElementType,
  getUnhandledProps,
  asThemeConsumer,
  getTheme,
  getClasses,
} from '../../lib'

import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
// eslint-disable-next-line react/prefer-stateless-function
class ImageFunctionalContext extends React.Component {
  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,
  }

  static defaultProps = {
    as: 'img',
  }

  render() {
    const ElementType = getElementType(ImageFunctionalContext, this.props)
    const rest = getUnhandledProps(ImageFunctionalContext, this.props)

    // this is the method that will provide theme in case if component is declared as themeConsumer
    const theme = getTheme(this)

    const classes: any = getClasses(this.props, imageRules, imageVariables, theme)

    const classNames = cx(getComponentClassName(ImageFunctionalContext), classes.root)

    return <ElementType {...rest} className={classNames} />
  }
}

// here we are augmenting component's functionality
export default asThemeConsumer(ImageFunctionalContext)
