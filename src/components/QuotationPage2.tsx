import { QuotationData } from "@/types/quotation";

interface Props {
  data: QuotationData;
}

const QuotationPage2 = ({ data }: Props) => {
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
      <div style={{ background: "hsl(35, 85%, 50%)", color: "#fff", padding: "6px 12px", fontWeight: 600, fontSize: "12px", marginBottom: "0" }}>
        {data.galleryTitle}
      </div>

      {/* Gallery Images */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "20px", border: "1px solid #ddd" }}>
        {data.galleryImages.map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: "280px", objectFit: "cover" }} />
        ))}
      </div>

      {/* Banking Details */}
      <div style={{ background: "hsl(35, 90%, 55%)", color: "#fff", textAlign: "center", padding: "8px", fontWeight: 700, fontSize: "16px", borderRadius: "4px 4px 0 0" }}>
        Banking Details
      </div>
      <div style={{ border: "1px solid #ddd", borderTop: "none", padding: "20px", display: "flex", gap: "24px" }}>
        {/* Left - Pay to + QR */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <img src={data.bankLogo} alt="Bank" style={{ height: "40px", objectFit: "contain" }} />
          <div style={{ fontSize: "11px", color: "#666" }}>Pay to</div>
          <div style={{ fontWeight: 700, fontSize: "16px" }}>{data.payTo}</div>
          <img src={data.qrCodeUrl} alt="QR Code" style={{ width: "120px", height: "120px" }} />
          <div style={{ fontSize: "10px", color: "#666" }}>UPI ID - {data.upiId}</div>
        </div>

        {/* Right - Details */}
        <div style={{ flex: 1, lineHeight: "2" }}>
          <div style={{ fontWeight: 700, fontSize: "14px" }}>{data.bankName}</div>
          <div>M/s - {data.payTo}</div>
          <div>A/c - {data.accountNo}</div>
          <div>IFSC - {data.ifsc}</div>
          <div>Branch - {data.branch}</div>
          <div style={{ marginTop: "10px" }}>GST : {data.gst}</div>
          <div>PAN : {data.pan}</div>
        </div>
      </div>
    </div>
  );
};

export default QuotationPage2;
