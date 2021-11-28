import React, { useEffect } from 'react';
import Footer from '../components/Footer';

export default function Landing() {
  useEffect(() => {
    document.title = 'Landing – BotTrition';
  });

  return (
    <div>
      <div className="container content">
        <div className="row">
          <div className="col-sm-3 talk">
            <h1>Take Charge</h1>
            <h1>Of Your Health</h1>
            <h1>With BotTrition</h1>

            <br />
            <h6 className="bold-four">
              Imagine an app that can improve your overall health through lifestyle recommendations.
              And can not only show detailed food nutritional information through an interactive
              food search, but also track body physicals to maintain proper health fitness from
              B.M.I. calculation.

            </h6>
            <br />
            <h6><a className="btn btn-dark start start-two" href="/registration">Register</a></h6>
          </div>
        </div>
      </div>

      <section className="features-icons bg-light text-center det-ails">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-screen-desktop m-auto text-primary icon-ails" />
                </div>
                <h5>Motivation</h5>
                <p className="lead mb-0">To be able to change and maintain overall health through better choices</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-layers m-auto text-primary icon-ails" />
                </div>
                <h5>Why This Matters</h5>
                <p className="lead mb-0">Health plays an essential part in how we function as an individual. If proper health is not maintained we could be at risk for life shortening ailments that could hamper our quality of life.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-check m-auto text-primary icon-ails" />
                </div>
                <h5>Creators</h5>
                <p className="lead mb-0"> Sourav Dhar, Drew Hartman, Omar Muhammad, and Brandon Dwyer</p>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
