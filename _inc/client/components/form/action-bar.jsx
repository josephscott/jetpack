/** External Dependencies **/
var PropTypes = require( 'prop-types' );
var React = require( 'react' );

module.exports = class extends React.Component {
    static displayName = 'ActionBar';

    static propTypes = {
		style: PropTypes.object
	};

    render() {
		return (
			<div className="dops-form-actionbar" style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
};
