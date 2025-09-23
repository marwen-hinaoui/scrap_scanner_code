// // import React from "react";
// // import { List } from "antd";

// // const PrintList = React.forwardRef(({ data }, ref) => {
// //   const contentRef = useRef < HTMLDivElement > null;
// //   const reactToPrintFn = useReactToPrint({ contentRef });
// //   return (
// //     <div ref={ref}>
// //       {data.map((item, index) => (
// //         <div
// //           key={index}
// //           style={{
// //             pageBreakAfter: "always",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //           }}
// //         >
// //           <List
// //             size="small"
// //             bordered
// //             dataSource={[item]}
// //             renderItem={(i) => <List.Item>{i}</List.Item>}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // });

// // export default PrintList;

// import { useReactToPrint } from "react-to-print";
// import { useRef } from "react";
// const PrintList = () => {
//   const contentRef = useRef(null);
//   const reactToPrintFn = useReactToPrint({ contentRef });

//   return (
//     <div>
//       <button onClick={reactToPrintFn}>Print</button>
//       <div ref={contentRef}>Content to print</div>
//     </div>
//   );
// };
// export default PrintList;
