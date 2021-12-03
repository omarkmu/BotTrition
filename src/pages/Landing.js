import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Landing() {
  useEffect(() => {
    document.title = 'BotTrition';
  });

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Take Charge Of Your Health With BotTrition</h1>
        <p>
          Imagine an app that can improve your overall health through lifestyle recommendations.
          And can not only show detailed food nutritional information through an interactive
          food search, but also track body physicals to maintain proper health fitness from
          B.M.I. calculation.

        </p>

        <h3>Motivation</h3>
        <p>To be able to change and maintain overall health through better choices</p>

        <h3>Why This Matters</h3>
        <p>
          Health plays an essential part in how we function as individuals.
          If proper health is not maintained we could be at risk for life
          shortening ailments that could hamper our quality of life.
        </p>

      </div>
      <Footer />
    </div>
  );
}
