import { ConfigProvider, Empty } from "antd";
import ScannerComponent from "./ScannerComponent/ScannerComponent";
import "@fontsource/inter";
import LearLogo from "./assets/logo.png";

function App() {
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty description="Data vide!" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      theme={{
        components: {
          Button: {
            borderRadius: "4px",
          },
          Input: {
            borderRadius: "4px",
          },
          InputNumber: {
            borderRadius: "4px",
          },
        },
        token: {
          fontFamily: "Inter, sans-serif",
          colorPrimary: "#EE3124",
          colorInfo: "#EE3124",
          colorError: "#EE3124",
          colorLink: "#EE3124",
        },
      }}
    >
      <div className="header">
        <img src={LearLogo} alt="Logo" style={{ width: 170 }} />{" "}
        <h4>
          Leather Serial Number Generator
          {/* <p style={{ fontWeight: "normal", fontSize: "12px" }}>
            Développé par le département CI de LTB - V1.0{" "}
          </p> */}
        </h4>
      </div>
      <ScannerComponent />
    </ConfigProvider>
  );
}

export default App;
