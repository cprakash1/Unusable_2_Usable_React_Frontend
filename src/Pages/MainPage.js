import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main className="px-3">
          <h1>Unusable2Usable</h1>
          <p className="lead mx-3">
            Welcome Users! <br />
            <br /> Welcome to Unusable2Usable, where unusable items find new
            purpose! Sell your unwanted belongings and give others the chance to
            transform them into treasures. Discover a wide array of unique,
            repurposable items from our vibrant community. Our user-friendly
            interface ensures a seamless experience, with secure transactions
            and buyer/seller protection. Join us in promoting sustainability by
            reducing waste and embracing creativity. Unleash your imagination as
            you explore limitless possibilities. Find hidden gems and breathe
            new life into forgotten objects. Together, we can make a difference,
            one upcycled creation at a time. Join Unusable2Usable today and be
            part of a community that celebrates the power of transformation
          </p>
          <br />
          <Link
            to="/items"
            className="btn btn-lg btn-secondary font-weight-bold border-white"
          >
            View Items
          </Link>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
