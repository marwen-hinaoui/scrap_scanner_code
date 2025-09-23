import React from "react";
import Barcode from "react-barcode";
import styled from "styled-components";

const PageBreakWrapper = styled.div`
  /* This CSS ensures each barcode prints on a new page */
  @media print {
    page-break-after: always;
  }
`;

const BarcodeWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const PrintableBarcode = React.forwardRef(({ value }, ref) => (
  <div ref={ref}>
    <BarcodeWrapper>
      <Barcode value={value} />
      <p style={{ marginTop: "10px" }}>{value}</p>
    </BarcodeWrapper>
    <PageBreakWrapper />
  </div>
));

export default PrintableBarcode;
