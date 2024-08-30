import React, { Suspense } from 'react';

// Lazy load components
const Herosection = React.lazy(() => import("../Components/Herosection"));
const Deals = React.lazy(() => import("../Components/Deals"));
const Prescription = React.lazy(() => import("../Components/Prescription"));
const BabyFood = React.lazy(() => import("../Components/BabyFood"));
const Extras = React.lazy(() => import("../Components/Extras"));
const Ccfooter = React.lazy(() => import("../Components/footer/Ccfooter"));


function Homepage() {
  return (
    <div >
      <suspense fallback={<div>Loading...</div>}
      >
      <Herosection />
      <Deals />
      <Prescription />
      <BabyFood />
      <Extras />
      <Ccfooter/>
      </suspense>
    </div>
  );
}
export default Homepage;
