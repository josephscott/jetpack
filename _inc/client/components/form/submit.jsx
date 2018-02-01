/** External Dependencies **/
var React = require( 'react' );

/** Internal Dependencies **/
var Button = require( '../button' );

module.exports = class extends React.Component {
    static displayName = 'Submit';

    render() {
		var { ...other } = this.props;

		return (
			<Button {...other} type="submit">{this.props.children}</Button>
		);
	}
};
