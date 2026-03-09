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

    const [{ jsPDF }, html2canvasModule] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);
    const html2canvas = html2canvasModule.default;

    const pageElements = Array.from(
      printRef.current.querySelectorAll<HTMLElement>(".pdf-page")
    );
    if (!pageElements.length) return;

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    for (let i = 0; i < pageElements.length; i++) {
      const canvas = await html2canvas(pageElements[i], {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.98);
      if (i > 0) pdf.addPage();
      pdf.addImage(imageData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }

    pdf.save(`Quotation_${data.refNo}.pdf`);
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
            <div className="pdf-page">
              <QuotationPage1 data={data} />
            </div>
            <div className="pdf-page pdf-page-break-before">
              <QuotationPage2 data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
