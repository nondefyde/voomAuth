import React, { Component } from 'react';
import './Footer.scss';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions';

class FooterComponent extends Component {

	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		const {logout} = this.props;
		logout();
	}

	render() {
		return (
			<footer>
				<div className="container">
					<div className="footer_inwrap">
						<div className="row footer-inner-group">
							<div className="col-md-5 d-none d-sm-block">
								<div className="footer-logo d-flex align-items-start">
									<img src={'/assets/img/logo.png'} className="app-login-logo" alt={'logo'}/>
								</div>
							</div>
							<div className="col-md-7">
								<div className="row">
									<div className="col-md-4">
										<h4>className</h4>
										<ul>
											<li>
												<a href="">My account</a>
											</li>
											<li>
												<a href="#">Find Jobs</a>
											</li>
										</ul>
									</div>
									<div className="col-md-4">
										<h4>Transport Company</h4>
										<ul>
											<li>
												<a href="#">Company Press</a>
											</li>
											<li>
												<a href="#">Freelancers</a>
											</li>
										</ul>
									</div>
									<div className="col-md-4">
										<h4>Support</h4>
										<ul>
											<li>
												<a href="#">My account</a>
											</li>
											<li>
												<a href="#">Find Jobs</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="row d-none d-lg-block d-md-block copyright-group">
							<div className="copyright col-12" style={{textAlign: 'left'}}>
								© 2018 Voomsway. All rights reserved
								<span>
									<ul className="socila-link-footer" style={{textAlign: 'right'}}>
                        <li>
                            <a href="#">
                                <i className="fa fa-facebook-square" aria-hidden="true"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-twitter" aria-hidden="true"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-instagram" aria-hidden="true"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-linkedin" aria-hidden="true"/>
                            </a>
                        </li>
                    </ul>
								</span>
							</div>
						</div>
						<div className="row d-block d-sm-none">
							<div className="footer-logo d-flex align-items-center">
								<img src={'/assets/img/logo.png'} className="app-login-logo" alt={'logo'}/>
							</div>
							<p className="copyright copyright-2">© 2018 Voomsway. All rights reserved</p>
							<ul className="socila-link-footer">
								<li>
									<a href="">
										<i className="fa fa-facebook-square" aria-hidden="true"/>
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-twitter" aria-hidden="true"/>
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-instagram" aria-hidden="true"/>
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-linkedin" aria-hidden="true"/>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

const stateProps = (state) => ({
	user: state.auth.user
});
const dispatchProps = {
	logout,
};
export default connect(stateProps, dispatchProps)(FooterComponent);
