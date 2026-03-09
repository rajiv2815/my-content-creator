import { QuotationData } from "@/types/quotation";

interface Props {
  data: QuotationData;
}

const QuotationPage1 = ({ data }: Props) => {
  const subTotal = data.products.reduce((sum, p) => sum + p.amount, 0);
  const gstAmount = (subTotal * data.gstPercent) / 100;
  const total = subTotal + gstAmount;

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
      <div
        style={{
          background: "hsl(35, 90%, 55%)",
          color: "#fff",
          textAlign: "center",
          padding: "8px",
          fontWeight: 700,
          fontSize: "14px",
          borderRadius: "4px 4px 0 0",
        }}
      >
        {data.productTitle}
      </div>

      {/* Specs + Image */}
      <div
        style={{
          border: "1px solid #ddd",
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
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px", fontSize: "11px" }}>
        <thead>
          <tr style={{ background: "hsl(200, 60%, 30%)", color: "#fff" }}>
            <th style={{ padding: "6px 8px", textAlign: "left", width: "50px" }}>Sr No</th>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Product Description</th>
            <th style={{ padding: "6px 8px", textAlign: "right" }}>Rate Per Unit</th>
            <th style={{ padding: "6px 8px", textAlign: "center" }}>Qty in Units</th>
            <th style={{ padding: "6px 8px", textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((p, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "6px 8px", textAlign: "center" }}>{p.srNo || ""}</td>
              <td style={{ padding: "6px 8px", fontWeight: i === 0 ? 700 : 400 }}>{p.description}</td>
              <td style={{ padding: "6px 8px", textAlign: "right" }}>{p.ratePerUnit.toFixed(2)}</td>
              <td style={{ padding: "6px 8px", textAlign: "center" }}>{p.qty}</td>
              <td style={{ padding: "6px 8px", textAlign: "right" }}>{p.amount.toFixed(2)}</td>
            </tr>
          ))}
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "6px 8px" }}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700 }}>Freight Charge As Per Actual</td>
            <td colSpan={2} style={{ padding: "6px 8px", textAlign: "center" }}>As per actual</td>
            <td style={{ padding: "6px 8px" }}></td>
          </tr>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td colSpan={3}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700 }}>Sub Total</td>
            <td style={{ padding: "6px 8px", textAlign: "right" }}>{subTotal.toFixed(2)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td colSpan={3}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700 }}>Gst {data.gstPercent}%</td>
            <td style={{ padding: "6px 8px", textAlign: "right" }}>{gstAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td style={{ padding: "6px 8px", fontWeight: 700, fontSize: "13px" }}>Total</td>
            <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700, fontSize: "13px" }}>{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Add-On */}
      <div style={{ border: "1px solid #ddd", marginBottom: "12px" }}>
        <div style={{ background: "hsl(35, 85%, 50%)", color: "#fff", textAlign: "center", padding: "6px", fontWeight: 600, fontSize: "12px" }}>
          Extra Add-On (Optional)
        </div>
        {data.addOns.map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 10px", borderBottom: i < data.addOns.length - 1 ? "1px solid #eee" : "none" }}>
            <span>{a.srNo}. {a.name}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "14px", height: "14px", border: "1px solid #999", borderRadius: "2px", background: a.checked ? "hsl(35,90%,55%)" : "#fff" }}></span>
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
      <div style={{ background: "hsl(45, 80%, 95%)", border: "1px solid #e8d9a0", borderRadius: "4px", padding: "10px" }}>
        <div style={{ background: "hsl(200, 60%, 30%)", color: "#fff", padding: "6px 10px", fontWeight: 700, marginBottom: "8px", borderRadius: "3px", fontSize: "12px" }}>
          Special Notes
        </div>
        {data.specialNotes.map((n, i) => (
          <div key={i} style={{ marginBottom: "4px", fontWeight: i === 3 ? 700 : 400 }}>✔ {n}</div>
        ))}
      </div>
    </div>
  );
};

export default QuotationPage1;
