import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { customPropTypes, rem, renderComponent, createShorthandFactory } from '../../lib'
import Layout from '../Layout'
import listVariables from './listVariables'
import listItemRules from './listItemRules'

class ListItem extends React.Component<any, any> {
  static propTypes = {
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    /** A list item can appear more important and draw the user's attention. */
    important: PropTypes.bool,
    media: PropTypes.any,
    renderContentArea: PropTypes.any,
    renderHeaderArea: PropTypes.any,
    renderMainArea: PropTypes.any,

    /** A list item can indicate that it can be selected. */
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    variables: PropTypes.any,
    styles: PropTypes.object,
  }

  static handledProps = [
    'as',
    'className',
    'content',
    'contentMedia',
    'debug',
    'endMedia',
    'header',
    'headerMedia',
    'important',
    'media',
    'renderContentArea',
    'renderHeaderArea',
    'renderMainArea',
    'selection',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static defaultProps = {
    as: 'li',

    renderMainArea: (props, state, classes) => {
      const { renderHeaderArea, renderContentArea } = props

      const headerArea = renderHeaderArea(props, state, classes)
      const contentArea = renderContentArea(props, state, classes)

      return (
        <div
          className="ui-list__item__main"
          // vertical
          // disappearing
          // rootCSS={{
          //   gridTemplateRows: "1fr 1fr"
          // }}
          style={{
            gridTemplateRows: '1fr 1fr',
          }}
          // start={headerArea}
          // end={contentArea}
        >
          {headerArea}
          {contentArea}
        </div>
      )
    },

    renderHeaderArea: (props, state, classes) => {
      const { debug, header, headerMedia, truncateHeader } = props
      const { isHovering } = state

      const mergedClasses = cx('ui-list__item__header', classes.header)
      const mediaClasses = cx('ui-list__item__headerMedia', classes.headerMedia)

      return !header && !headerMedia ? null : (
        <Layout
          className={mergedClasses}
          alignItems="end"
          gap={rem(0.8)}
          debug={debug}
          // disappearing={!truncateHeader}
          truncateMain={truncateHeader}
          rootCSS={isHovering && { color: 'inherit' }}
          main={header}
          end={!isHovering && headerMedia && <span className={mediaClasses}>{headerMedia}</span>}
        />
      )
    },

    renderContentArea: (props, state, classes) => {
      const { debug, content, contentMedia, truncateContent } = props
      const { isHovering } = state

      const mergedClasses = cx('ui-list__item__content', classes.content)

      return !content && !contentMedia ? null : (
        <Layout
          className={mergedClasses}
          alignItems="start"
          gap={rem(0.8)}
          debug={debug}
          // disappearing={!truncateContent}
          truncateMain={truncateContent}
          rootCSS={isHovering && { color: 'inherit' }}
          main={content}
          end={!isHovering && contentMedia}
        />
      )
    },
  }

  state: any = {}

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  // TODO check if this should be here or in the renderComponent...
  static create = createShorthandFactory(ListItem, main => ({ main }))

  render() {
    return renderComponent(
      {
        component: ListItem,
        displayName: 'ListItem',
        stardustClassName: 'ui-list__item',
        props: this.props,
        rules: listItemRules,
        variables: listVariables,
      },
      ({ ElementType, classes, rest }) => {
        const { as, debug, endMedia, media, renderMainArea } = this.props
        const { isHovering } = this.state

        const startArea = media
        const mainArea = renderMainArea(this.props, this.state, classes)
        const endArea = isHovering && endMedia

        return (
          <Layout
            as={as}
            alignItems="center"
            gap={rem(0.8)}
            className={classes.root}
            debug={debug}
            reducing
            start={startArea}
            main={mainArea}
            end={endArea}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...rest}
          />
        )
      },
    )
  }
}

export default ListItem