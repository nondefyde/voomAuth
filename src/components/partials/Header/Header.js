import React, { Component } from 'react';
import { TopNav } from '../index'
import './Header.scss';
import { connect } from 'react-redux';
import { logout, navigateTo } from '../../../redux/actions';

class HeaderComponent extends Component {

	constructor(props) {
		super(props);
		this.navigate = this.navigate.bind(this);
	}

	navigate(e, link) {
		e.preventDefault();
		const {navigateTo, logout} = this.props;
		if (link === '/logout') {
			logout();
		} else {
			navigateTo(link);
		}
	}

	render() {
		const {user} = this.props;
		return (
			<header className="sticky-top">
				<nav className="navbar navbar-expand-lg navbar-light main_header d-flex align-items-center">
					<div className="voom-logo">
						<a href=""> <img src={'/assets/img/logo.png'} alt=""/></a>
					</div>
					<button className="navbar-toggler float-right"
					        type="button" data-toggle="collapse"
					        data-target="#main_menu"
					        aria-controls="main_menu"
					        aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<div className="collapse navbar-collapse" id="main_menu">
						<div className="header-trips-form">
							<form>
								<div className="row">
									<div className="col-md-10">
										<div className="row">
											<div className="col-md-4">

											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div className="btn-group account_setting">
							<TopNav
								user={user}
								navigate={this.navigate}
							/>
						</div>
					</div>
				</nav>
			</header>
		);
	}
}

const stateProps = (state) => ({
	user: state.auth.user
});
const dispatchProps = {
	logout,
	navigateTo
};
export default connect(stateProps, dispatchProps)(HeaderComponent);
