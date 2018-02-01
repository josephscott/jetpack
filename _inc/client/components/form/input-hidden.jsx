/** External Dependencies **/
var PropTypes = require( 'prop-types' );
var React = require( 'react' ),
	Formsy = require( 'formsy-react' );

var createReactClass = require('create-react-class');

module.exports = createReactClass({
	displayName: 'HiddenInput',

	mixins: [Formsy.Mixin],

	propTypes: {
		name: PropTypes.string.isRequired
	},

	render: function() {
		return (
			<input type="hidden" value={this.getValue()}/>
		);
	}
});
