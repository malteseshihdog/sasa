import React from "react";
import { LiquidityPoolSection, StakingSection } from "./components";

interface Props {

}

const ProductScroll: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <LiquidityPoolSection />
      <StakingSection />
      {/* <InsuranceSection /> */}
    </React.Fragment>
  );
};

export default ProductScroll;
