import { useState, useRef } from "react";
import { QuotationData, defaultQuotationData } from "@/types/quotation";
import QuotationPage1 from "@/components/QuotationPage1";
import QuotationPage2 from "@/components/QuotationPage2";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Download, Eye, Settings } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<QuotationData>(defaultQuotationData);
  const [showAdmin, setShowAdmin] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 0,
      filename: `Quotation_${data.refNo}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      pagebreak: { mode: ["css", "legacy"] as string[] },
    };
    html2pdf().set(opt).from(printRef.current).save();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Admin Panel */}
      {showAdmin && (
        <div className="w-[360px] border-r border-border flex-shrink-0 overflow-hidden">
          <AdminPanel data={data} onChange={setData} />
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAdmin(!showAdmin)}
            className="gap-2"
          >
            <Settings size={14} />
            {showAdmin ? "Hide Panel" : "Show Panel"}
          </Button>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2" onClick={() => window.print()}>
              <Eye size={14} /> Preview
            </Button>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleDownloadPDF}>
              <Download size={14} /> Download PDF
            </Button>
          </div>
        </div>

        {/* Quotation Preview */}
        <div className="flex-1 overflow-auto p-6 flex flex-col items-center gap-6 bg-muted/50">
          <div ref={printRef}>
            <div style={{ marginBottom: "0" }}>
              <QuotationPage1 data={data} />
            </div>
            <div className="html2pdf__page-break" />
            <QuotationPage2 data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
