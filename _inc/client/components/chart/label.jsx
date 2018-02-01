/**
 * External dependencies
 */
var PropTypes = require( 'prop-types' );
var React = require( 'react' );

module.exports = class extends React.Component {
    static displayName = 'ModuleChartLabel';

    static propTypes = {
		width: PropTypes.number.isRequired,
		x: PropTypes.number.isRequired,
		label: PropTypes.string.isRequired
	};

    render() {
		var labelStyle,
			dir = 'left';

		labelStyle = {
			width: this.props.width + 'px'
		};

		labelStyle[ dir ] = this.props.x + 'px';

		return <div className="dops-chart__x-axis-label" style={ labelStyle }>{ this.props.label }</div>;
	}
};
