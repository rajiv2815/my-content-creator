import { useState, useRef, useEffect } from "react";
import { QuotationData, defaultQuotationData } from "@/types/quotation";
import QuotationPage1 from "@/components/QuotationPage1";
import QuotationPage2 from "@/components/QuotationPage2";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Download, Eye, Settings } from "lucide-react";
import { numberToWords } from "@/lib/numberToWords";

const Index = () => {
  const [data, setData] = useState<QuotationData>(defaultQuotationData);
  const [showAdmin, setShowAdmin] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  // Auto-calculate amount in words
  useEffect(() => {
    const subTotal = data.products.reduce((sum, p) => sum + p.amount, 0);
    const gstAmount = (subTotal * data.gstPercent) / 100;
    const total = subTotal + gstAmount;
    const words = numberToWords(total);
    if (words !== data.amountInWords) {
      setData(prev => ({ ...prev, amountInWords: words }));
    }
  }, [data.products, data.gstPercent]);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;
    const opt = {
      margin: 0,
      filename: `Quotation_${data.refNo}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      pagebreak: {
        mode: ["css", "avoid-all"],
        before: ".pdf-page-break-before",
      },
    };

    html2pdf().set(opt).from(printRef.current).save();
  };

  return (
    <div className="flex h-screen bg-background">
      {showAdmin && (
        <div className="w-[360px] border-r border-border flex-shrink-0 overflow-hidden">
          <AdminPanel data={data} onChange={setData} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <Button size="sm" variant="outline" onClick={() => setShowAdmin(!showAdmin)} className="gap-2">
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

        <div className="flex-1 overflow-auto p-6 flex flex-col items-center gap-0 bg-muted/50">
          <div ref={printRef}>
            <QuotationPage1 data={data} />
            <div className="html2pdf__page-break" style={{ margin: 0, padding: 0 }} />
            <QuotationPage2 data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
