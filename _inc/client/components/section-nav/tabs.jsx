/** @ssr-ready **/

/**
 * External Dependencies
 */
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import React from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
var SelectDropdown = require( 'components/select-dropdown' ),
	DropdownItem = require( 'components/select-dropdown/item' ),
	viewport = require( 'lib/viewport' );

/**
 * Internal Variables
 */
var MOBILE_PANEL_THRESHOLD = 480;

/**
 * Main
 */
var NavTabs = React.createClass( {

	propTypes: {
		selectedText: PropTypes.string,
		selectedCount: PropTypes.number,
		label: PropTypes.string,
		hasSiblingControls: PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			hasSiblingControls: false
		};
	},

	getInitialState: function() {
		return {
			isDropdown: false
		};
	},

	componentDidMount: function() {
		this.setDropdown();
		this.debouncedAfterResize = debounce( this.setDropdown, 300 );

		window.addEventListener( 'resize', this.debouncedAfterResize );
	},

	componentWillReceiveProps: function() {
		this.setDropdown();
	},

	componentWillUnmount: function() {
		window.removeEventListener( 'resize', this.debouncedAfterResize );
	},

	render: function() {
		var tabs = React.Children.map( this.props.children, function( child, index ) {
			return child && React.cloneElement( child, { ref: 'tab-' + index } );
		} );

		var tabsClassName = classNames( {
			'dops-section-nav-tabs': true,
			'is-dropdown': this.state.isDropdown,
			'is-open': this.state.isDropdownOpen,
			'has-siblings': this.props.hasSiblingControls
		} );

		var innerWidth = viewport.getWindowInnerWidth();

		return (
			<div className="dops-section-nav-group" ref="navGroup">
				<div className={ tabsClassName }>
					{ this.props.label &&
						<h6 className="dops-section-nav-group__label">
							{ this.props.label }
						</h6>
					}
					<ul
						className="dops-section-nav-tabs__list"
						role="menu"
						onKeyDown={ this.keyHandler }
					>
						{ tabs }
					</ul>

					{
						this.state.isDropdown &&
						innerWidth > MOBILE_PANEL_THRESHOLD &&
						this.getDropdown()
					}
				</div>
			</div>
		);
	},

	getTabWidths: function() {
		var totalWidth = 0;

		React.Children.forEach( this.props.children, function( child, index ) {
			if ( ! child ) {
				return;
			}
			let tabWidth = ReactDom.findDOMNode( this.refs[ 'tab-' + index ] ).offsetWidth;
			totalWidth += tabWidth;
		}.bind( this ) );

		this.tabsWidth = totalWidth;
	},

	getDropdown: function() {
		var dropdownOptions = React.Children.map(
		this.props.children, function( child, index ) {
			if ( ! child ) {
				return null;
			}
			return (
				<DropdownItem {...child.props} key={ 'navTabsDropdown-' + index }>
					{ child.props.children }
				</DropdownItem>
			);
		} );

		return (
			<SelectDropdown
				className="dops-section-nav-tabs__dropdown"
				selectedText={ this.props.selectedText }
				selectedCount={ this.props.selectedCount }
			>
				{ dropdownOptions }
			</SelectDropdown>
		);
	},

	setDropdown: function() {
		var navGroupWidth;

		if ( window.innerWidth > MOBILE_PANEL_THRESHOLD ) {
			if ( ! this.refs.navGroup ) {
				return;
			}

			navGroupWidth = this.refs.navGroup.offsetWidth;

			if ( ! this.tabsWidth ) {
				this.getTabWidths();
			}

			if ( navGroupWidth <= this.tabsWidth && ! this.state.isDropdown ) {
				this.setState( {
					isDropdown: true
				} );
			} else if ( navGroupWidth > this.tabsWidth && this.state.isDropdown ) {
				this.setState( {
					isDropdown: false
				} );
			}
		} else if ( window.innerWidth <= MOBILE_PANEL_THRESHOLD && this.state.isDropdown ) {
			this.setState( {
				isDropdown: false
			} );
		}
	},

	keyHandler: function( event ) {
		switch ( event.keyCode ) {
			case 32: // space
			case 13: // enter
				event.preventDefault();
				document.activeElement.click();
				break;
		}
	}
} );

module.exports = NavTabs;
