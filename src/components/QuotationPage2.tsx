import { QuotationData } from "@/types/quotation";

interface Props {
  data: QuotationData;
}

const QuotationPage2 = ({ data }: Props) => {
  const headerBg = "#b71c1c";
  const borderColor = "#ccc";

  const fullWidthHeader = {
    background: headerBg,
    color: "#fff",
    textAlign: "center" as const,
    padding: "0 8px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "1.2",
    border: `1px solid ${borderColor}`,
    width: "100%",
    boxSizing: "border-box" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "36px",
  };

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "12mm 15mm",
        background: "#fff",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        fontSize: "11px",
        color: "#222",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <img src={data.logoUrl} alt="Logo" style={{ height: "60px", objectFit: "contain" }} />
        <div style={{ textAlign: "right", fontSize: "11px", lineHeight: "1.5" }}>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>{data.companyName}</div>
          <div>{data.companyAddress}</div>
          <div><b>Call:</b> {data.companyPhone}</div>
          <div><b>Email:</b> {data.companyEmail}</div>
          <div><b>Web:</b> {data.companyWeb}</div>
        </div>
      </div>

      {/* Gallery Title */}
      <div style={{ ...fullWidthHeader, fontSize: "12px", fontWeight: 600 }}>
        {data.galleryTitle}
      </div>

      {/* Gallery Images */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "20px", border: `1px solid ${borderColor}` }}>
        {data.galleryImages.map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: "280px", objectFit: "cover", borderRight: i % 2 === 0 ? `1px solid ${borderColor}` : "none" }} />
        ))}
      </div>

      {/* Banking Details */}
      <div style={fullWidthHeader}>
        Banking Details
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", border: `1px solid ${borderColor}`, borderTop: "none" }}>
        <tbody>
          <tr>
            {/* Left - Bank Details Table */}
            <td style={{ width: "50%", padding: "0", verticalAlign: "middle", borderRight: `1px solid ${borderColor}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5", width: "35%" }}>Bank</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.bankName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5" }}>M/s</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.payTo}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5" }}>A/c</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.accountNo}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5" }}>IFSC</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.ifsc}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5" }}>Branch</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.branch}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, borderBottom: `1px solid ${borderColor}`, background: "#f5f5f5" }}>GST</td>
                    <td style={{ padding: "8px 12px", borderBottom: `1px solid ${borderColor}` }}>{data.gst}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", fontWeight: 700, background: "#f5f5f5" }}>PAN</td>
                    <td style={{ padding: "8px 12px" }}>{data.pan}</td>
                  </tr>
                </tbody>
              </table>
            </td>

            {/* Right - QR Code */}
            <td style={{ width: "50%", padding: "20px", textAlign: "center", verticalAlign: "middle" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{data.qrHeading}</div>
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>{data.payTo}</div>
              <div style={{ marginBottom: "8px" }}>
                <img src={data.qrCodeUrl} alt="QR Code" style={{ width: "140px", height: "140px", margin: "0 auto", border: `1px solid ${borderColor}`, padding: "4px" }} />
              </div>
              <div style={{ fontSize: "10px", color: "#666" }}>UPI ID - {data.upiId}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuotationPage2;
