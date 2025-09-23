import React, { useState, useRef } from "react";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { send_pn_api } from "../api/send_pn_api";
import { Button, Input, InputNumber } from "antd";
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

const generateZPL = (text) => `
^XA
^FO50,50^A0N,40,40^FD${text}^FS
^FO50,120^BCN,100,Y,N,N
^FD${text}^FS
^XZ
`;

export default function ScannerInput() {
  const [code, setCode] = useState("");
  const [qte, setQte] = useState(0);
  const [data, setData] = useState([]);
  const targetRef = useRef(null);
  const PRINTER_NAME = "ZDesigner ZD421-203dpi ZPL";

  // === Call API ===
  const send_pn = async (pn) => {
    try {
      const res = await send_pn_api(pn, qte);
      console.log("API response:", res);
      setData(res?.resData?.data || []);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  // === Scan Handler ===
  const handleScan = (scannedCode) => {
    console.log("Scanned:", scannedCode);
    setCode(scannedCode);
    if (scannedCode.length > 14 && qte > 0) {
      send_pn(scannedCode);
    } else {
      setCode("");
    }
  };

  // === Attach Scanner ===
  useSymbologyScanner(handleScan, {
    target: targetRef,
    minLength: 15,
    avgTimeByChar: 30,
  });

  // === Print Function ===
  const handlePrint = async () => {
    if (data.length === 0) {
      alert("No data to print");
      return;
    }

    try {
      const browserPrint = new ZebraBrowserPrintWrapper();
      const availablePrinters = await browserPrint.getAvailablePrinters();
      console.log("availablePrinters-----------------");
      console.log(availablePrinters);

      const printer = availablePrinters.find((p) => p.name === PRINTER_NAME);

      if (!printer) {
        alert(
          `Printer "${PRINTER_NAME}" not found. Please ensure it is connected via USB and set up in Zebra Browser Print.`
        );
        return;
      }

      browserPrint.setPrinter(printer);

      for (const item of data) {
        const zpl = generateZPL(item);
        await browserPrint.print(zpl);
        console.log(`Printed label for: ${item}`);
      }
      alert("Print job sent successfully!");
    } catch (err) {
      console.error("Print error:", err);
      alert("Print error: " + err.message);
    }
  };

  // const handlePrint = async () => {
  //   if (data.length === 0) {
  //     alert("No data to print");
  //     return;
  //   }

  //   try {
  //     const zplData = data.map(generateZPL).join("");

  //     const res = await fetch("http://10.50.66.246:3002/print-label", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ zplData }),
  //     });

  //     if (res.ok) {
  //       alert("Print job sent successfully to local proxy!");
  //       console.log("Local proxy received print job.");
  //     } else {
  //       const errorText = await res.text();
  //       alert(`Print error: ${errorText}`);
  //       console.error("Local proxy error:", errorText);
  //     }
  //   } catch (err) {
  //     console.error("Connection error:", err);
  //     alert(
  //       "Print error: Could not connect to local print proxy. Is the agent running?"
  //     );
  //   }
  // };
  return (
    <div ref={targetRef} tabIndex={0} style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        QTE:
        <InputNumber
          onChange={(value) => setQte(Number(value))}
          style={{
            height: "38px",
            fontSize: "16px",
            width: "250px",
            marginLeft: "10px",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        PN:
        <Input
          type="text"
          value={code}
          style={{
            height: "38px",
            fontSize: "16px",
            width: "250px",
            marginLeft: "10px",
          }}
          readOnly
        />
      </div>

      <h3>List:</h3>
      <div style={{ marginBottom: "10px" }}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "5px",
                marginBottom: "5px",
              }}
            >
              {item}
            </div>
          ))
        ) : (
          <div>No data loaded</div>
        )}
      </div>

      <Button
        onClick={handlePrint}
        type="primary"
        style={{ float: "right", marginTop: "10px" }}
      >
        Print to Zebra
      </Button>
    </div>
  );
}
