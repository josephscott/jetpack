/**
 * External dependencies
 */
var React = require( 'react' ),
	PureRenderMixin = require( 'react-pure-render/mixin' );

var createReactClass = require('create-react-class');

/**
 * Internal dependencies
 */
var Count = require( 'components/count' );

module.exports = createReactClass({
	displayName: 'Count',

	mixins: [ PureRenderMixin ],

	render: function() {
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/design/count">Count</a>
				</h2>
				<div>
					<Count count={ 65365 } />
				</div>
			</div>
		);
	}
});
