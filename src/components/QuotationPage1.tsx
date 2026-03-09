import { QuotationData, AddOnItem } from "@/types/quotation";

interface Props {
  data: QuotationData;
}

const QuotationPage1 = ({ data }: Props) => {
  const subTotal = data.products.reduce((sum, p) => sum + p.amount, 0);
  const gstAmount = (subTotal * data.gstPercent) / 100;
  const total = subTotal + gstAmount;

  const headerBg = "#b71c1c";
  const tableHeaderBg = "#0d2137";
  const borderColor = "#ccc";

  const fullWidthHeader = {
    background: headerBg,
    color: "#fff",
    textAlign: "center" as const,
    padding: "8px",
    fontWeight: 700,
    fontSize: "14px",
    border: `1px solid ${borderColor}`,
    width: "100%",
    boxSizing: "border-box" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "36px",
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

      {/* Ref & Date */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <div><b>Ref No :</b> {data.refNo}</div>
        <div><b>Date:</b> {data.date}</div>
      </div>
      <div style={{ marginBottom: "2px" }}><b>Name :</b> {data.customerName}</div>
      <div style={{ marginBottom: "12px" }}><b>State :</b> {data.customerState}</div>

      {/* Product Title */}
      <div style={fullWidthHeader}>
        {data.productTitle}
      </div>

      {/* Specs + Image */}
      <div
        style={{
          border: `1px solid ${borderColor}`,
          borderTop: "none",
          display: "flex",
          gap: "12px",
          padding: "10px",
          marginBottom: "12px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: "6px" }}>Bespoke Premium Indoor Stairlift Specification:</div>
          {data.specifications.map((s, i) => (
            <div key={i} style={{ marginBottom: "3px" }}>✔ {s}</div>
          ))}
        </div>
        <img
          src={data.productImageUrl}
          alt="Product"
          style={{ width: "180px", height: "160px", objectFit: "cover", borderRadius: "6px" }}
        />
      </div>

      {/* Product Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "11px", border: `1px solid ${borderColor}` }}>
        <thead>
          <tr style={{ background: tableHeaderBg, color: "#fff" }}>
            <th style={{ padding: "6px 8px", textAlign: "left", width: "50px", border: `1px solid ${borderColor}` }}>Sr No</th>
            <th style={{ padding: "6px 8px", textAlign: "left", border: `1px solid ${borderColor}` }}>Product Description</th>
            <th style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>Rate Per Unit</th>
            <th style={{ padding: "6px 8px", textAlign: "center", border: `1px solid ${borderColor}` }}>Qty in Units</th>
            <th style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((p, i) => (
            <tr key={i}>
              <td style={{ padding: "6px 8px", textAlign: "center", border: `1px solid ${borderColor}` }}>{p.srNo || ""}</td>
              <td style={{ padding: "6px 8px", fontWeight: i === 0 ? 700 : 400, border: `1px solid ${borderColor}` }}>{p.description}</td>
              <td style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>{p.ratePerUnit.toFixed(2)}</td>
              <td style={{ padding: "6px 8px", textAlign: "center", border: `1px solid ${borderColor}` }}>{p.qty}</td>
              <td style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>{p.amount.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ padding: "6px 8px", border: `1px solid ${borderColor}` }}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700, border: `1px solid ${borderColor}` }}>Freight Charge As Per Actual</td>
            <td colSpan={2} style={{ padding: "6px 8px", textAlign: "center", border: `1px solid ${borderColor}` }}>As per actual</td>
            <td style={{ padding: "6px 8px", border: `1px solid ${borderColor}` }}></td>
          </tr>
          <tr>
            <td colSpan={3} style={{ border: `1px solid ${borderColor}` }}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700, border: `1px solid ${borderColor}` }}>Sub Total</td>
            <td style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>{subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} style={{ border: `1px solid ${borderColor}` }}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700, border: `1px solid ${borderColor}` }}>Gst {data.gstPercent}%</td>
            <td style={{ padding: "6px 8px", textAlign: "right", border: `1px solid ${borderColor}` }}>{gstAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} style={{ border: `1px solid ${borderColor}` }}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700, fontSize: "13px", border: `1px solid ${borderColor}` }}>Total</td>
            <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700, fontSize: "13px", border: `1px solid ${borderColor}` }}>{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Add-On */}
      <div style={{ border: `1px solid ${borderColor}`, marginBottom: "12px" }}>
        <div style={{ ...fullWidthHeader, fontSize: "12px", fontWeight: 600, border: "none", minHeight: "30px" }}>
          Extra Add-On (Optional)
        </div>
        {data.addOns.map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 10px", borderTop: `1px solid ${borderColor}` }}>
            <span>{a.srNo}. {a.name}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "14px", height: "14px", border: "1px solid #999", borderRadius: "2px", background: a.checked ? headerBg : "#fff" }}></span>
              {a.price}
            </span>
          </div>
        ))}
      </div>

      {/* Amount in words */}
      <div style={{ marginBottom: "10px" }}>
        <b>Amount in Word :-</b> {data.amountInWords}
      </div>

      {/* Special Notes */}
      <div style={{ border: `1px solid ${borderColor}`, borderRadius: "4px", padding: "10px", background: "#fdf5f5" }}>
        <div style={{ background: tableHeaderBg, color: "#fff", padding: "6px 10px", fontWeight: 700, marginBottom: "8px", borderRadius: "3px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "28px" }}>
          Special Notes
        </div>
        {data.specialNotes.map((n, i) => (
          <div key={i} style={{ marginBottom: "4px", fontWeight: i === 3 ? 700 : 400, display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#2e7d32", fontWeight: 700, fontSize: "13px" }}>✔</span> {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotationPage1;
