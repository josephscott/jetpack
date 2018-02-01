/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	omit = require( 'lodash/omit' );

/**
 * Internal dependencies
 */
var Toggle = require( 'components/form/form-toggle' );

module.exports = class extends React.Component {
    static displayName = 'CompactFormToggle';

    render() {
		return (
			<Toggle
				{ ...omit( this.props, 'className' ) }
				className={ classNames( this.props.className, 'is-compact' ) }
			>
				{ this.props.children }
			</Toggle>
		);
	}
};
