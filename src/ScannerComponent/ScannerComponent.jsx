import React, { useState, useRef, useEffect } from "react";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { send_pn_api } from "../api/send_pn_api";
import { Button, Form, Input, InputNumber, List } from "antd";
import Barcode from "react-barcode";
import { AiFillPrinter } from "react-icons/ai";

export default function ScannerInput() {
  const [code, setCode] = useState("");
  const [qte, setQte] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const printRef = useRef(null);
  const targetRef = useRef(null);
  const serverHostname = window.location.hostname;

  const send_pn = async (pn) => {
    setIsLoading(true);
    try {
      console.log(pn);
      const res = await send_pn_api(pn, qte);
      console.log("API response:", res);
      setData(res?.resData?.data || []);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleScan = (scannedCode) => {
    console.log("Scanned:", scannedCode);
    if (scannedCode.length > 14) {
      setCode(scannedCode);
    } else {
      setCode("");
    }
  };

  useSymbologyScanner(handleScan, {
    target: targetRef,
    minLength: 15,
    avgTimeByChar: 30,
  });

  const handlePrint = () => {
    console.log(code);
    console.log("-----------------serverHostname----------------");
    console.log(serverHostname);

    send_pn(code);
  };

  return (
    <div style={{ padding: "20px", paddingTop: "80px" }}>
      <Form onFinish={handlePrint}>
        <div style={{ width: "340px" }}>
          <Form.Item name="pn" required={false}>
            <p>Leather PN:</p>
            <div ref={targetRef} tabIndex={0}>
              <Input
                placeholder="Scan Leather Part number"
                type="text"
                value={code}
                readOnly
                style={{
                  height: "34px",
                  fontSize: "14px",
                  width: "250px",
                }}
              />
            </div>
          </Form.Item>
          <Form.Item
            required={false}
            name="qte"
            // rules={[{ required: true, message: "Qte vide!" }]}
          >
            <p>Qte:</p>
            <InputNumber
              placeholder="Saisie Quantité"
              min={1}
              onChange={(value) => setQte(Number(value))}
              style={{
                height: "34px",
                fontSize: "14px",
                width: "250px",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              style={{
                height: "34px",
                fontSize: "14px",
              }}
              htmlType="submit"
              icon={<AiFillPrinter />}
              type="primary"
            >
              Imprimer
            </Button>
          </Form.Item>
        </div>
        <Form.Item>
          <div>
            <div ref={printRef}>
              {/* {data.map((item, index) => (
            <div className="barcode-ticket" key={index}> */}
              <List
                style={{
                  borderRadius: "4px",
                }}
                size="small"
                header={<h3 style={{ margin: "0" }}>Serial Numbers</h3>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item style={{ textAlign: "center" }}>
                    {" "}
                    <Barcode
                      value={item}
                      displayValue={false}
                      height={40}
                      width={2}
                      margin={0}
                    />
                    <div>{item.split(" ")[0]}</div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
