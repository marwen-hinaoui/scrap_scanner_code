import React, { useState, useRef } from "react";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { send_pn_api } from "../api/send_pn_api";
import { Button, Input, InputNumber, List } from "antd";
import { useReactToPrint } from "react-to-print";
import "./scanner.css";
import Barcode from "react-barcode";
export default function ScannerInput() {
  const [code, setCode] = useState("");
  const [qte, setQte] = useState(0);
  const [data, setData] = useState([]);

  const printRef = useRef(null);
  const targetRef = useRef(null);

  const send_pn = async (pn) => {
    const res = await send_pn_api(pn, qte);
    console.log("API response:", res);
    setData(res?.resData?.data || []);
  };

  const handleScan = (scannedCode) => {
    console.log("Scanned:", scannedCode);
    setCode(scannedCode);
    if (scannedCode.length > 14 && qte > 0) {
      send_pn(scannedCode);
    } else {
      setCode("");
    }
  };

  useSymbologyScanner(handleScan, {
    target: targetRef,
    minLength: 15,
    avgTimeByChar: 30,
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
    @media print {
      @page {
        size: 60mm 20mm; 
        margin: 0;
      }
      body {
        margin: 0;
      }
      .barcode-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 1mm;
        box-sizing: border-box;
      }
      .barcode {
        transform: scale(0.8); /* Adjust the scale factor to fit the barcode within the ticket */
      }
      .text {
        font-size: 8px; /* Adjust the font size to fit the text within the ticket */
      }
    }
  `,
  });

  const onPrintButtonClick = () => {
    if (printRef.current && data.length > 0) {
      handlePrint();
    } else {
      alert("There is nothing to print");
    }
  };

  return (
    <div ref={targetRef} tabIndex={0}>
      <div>
        QTE:
        <InputNumber
          onChange={(value) => setQte(Number(value))}
          style={{ height: "38px", fontSize: "16px", width: "250px" }}
        />
      </div>

      <div>
        PN:
        <Input
          type="text"
          value={code}
          style={{ height: "38px", fontSize: "16px", width: "250px" }}
          readOnly
        />
      </div>
      <h3>List</h3>

      <div
        ref={printRef}
        style={{
          margin: "10px",
          padding: "10px",
        }}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="page-break no-break">
              <Barcode value={[item]} />
            </div>
          ))
        ) : (
          <div>No data loaded</div>
        )}
      </div>

      <Button
        onClick={onPrintButtonClick}
        style={{ float: "right", marginTop: "10px" }}
        type="primary"
      >
        Impression
      </Button>
    </div>
  );
}
