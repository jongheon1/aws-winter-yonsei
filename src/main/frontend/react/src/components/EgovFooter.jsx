import React from 'react';
import { Link } from 'react-router-dom';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                <div className="info">
                    <p>
                        대표문의메일 : yheewon@yonsei.ac.kr  <span className="m_hide">|</span><br className="m_show" />  대표전화 : 010-3367-8230<br />
                    </p>
                    <p className="copy">Copyright © 2024 All Rights Reserved.</p>
                </div>
                <div className="right_col">
                    <Link to="https://open.assembly.go.kr/portal/mainPage.do">
                        <img className="w" src="/assets/images/logo.png" />
                        <img className="m" src="/assets/images/logo.png" />
                    </Link>
                    <Link to="https://open.assembly.go.kr/portal/openapi/main.do">
                        <img className="w" src="/assets/images/logo_openapi.png" />
                        <img className="m" src="/assets/images/logo_openapi.png" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;