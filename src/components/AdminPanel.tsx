import { useState } from "react";
import { QuotationData, ProductItem, AddOnItem } from "@/types/quotation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";

interface Props {
  data: QuotationData;
  onChange: (data: QuotationData) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: "16px" }}>
    <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="h-8 text-sm" />
  </div>
);

const AdminPanel = ({ data, onChange }: Props) => {
  const update = (partial: Partial<QuotationData>) => onChange({ ...data, ...partial });

  const handleImageUpload = (field: keyof QuotationData) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => update({ [field]: reader.result as string });
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleGalleryImageUpload = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imgs = [...data.galleryImages];
          imgs[index] = reader.result as string;
          update({ galleryImages: imgs });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const updateProduct = (index: number, field: keyof ProductItem, value: string | number) => {
    const products = [...data.products];
    products[index] = { ...products[index], [field]: value };
    if (field === "ratePerUnit" || field === "qty") {
      products[index].amount = products[index].ratePerUnit * products[index].qty;
    }
    update({ products });
  };

  const addProduct = () => {
    update({ products: [...data.products, { srNo: data.products.length + 1, description: "", ratePerUnit: 0, qty: 0, amount: 0 }] });
  };

  const removeProduct = (i: number) => {
    update({ products: data.products.filter((_, idx) => idx !== i) });
  };

  const updateSpec = (i: number, v: string) => {
    const specs = [...data.specifications];
    specs[i] = v;
    update({ specifications: specs });
  };

  const addSpec = () => update({ specifications: [...data.specifications, ""] });
  const removeSpec = (i: number) => update({ specifications: data.specifications.filter((_, idx) => idx !== i) });

  const updateNote = (i: number, v: string) => {
    const notes = [...data.specialNotes];
    notes[i] = v;
    update({ specialNotes: notes });
  };

  const addNote = () => update({ specialNotes: [...data.specialNotes, ""] });
  const removeNote = (i: number) => update({ specialNotes: data.specialNotes.filter((_, idx) => idx !== i) });

  const updateAddOn = (i: number, field: keyof AddOnItem, value: string | boolean | number) => {
    const addOns = [...data.addOns];
    addOns[i] = { ...addOns[i], [field]: value };
    update({ addOns });
  };

  return (
    <div className="h-full overflow-y-auto bg-card p-4" style={{ maxHeight: "100vh" }}>
      <h2 className="text-lg font-bold mb-4 text-foreground">Admin Panel</h2>

      <Tabs defaultValue="company">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="company" className="text-xs">Company</TabsTrigger>
          <TabsTrigger value="quotation" className="text-xs">Quotation</TabsTrigger>
          <TabsTrigger value="products" className="text-xs">Products</TabsTrigger>
          <TabsTrigger value="page2" className="text-xs">Page 2</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-3">
          <Section title="Company Info">
            <Field label="Company Name" value={data.companyName} onChange={(v) => update({ companyName: v })} />
            <Field label="Address" value={data.companyAddress} onChange={(v) => update({ companyAddress: v })} />
            <Field label="Phone" value={data.companyPhone} onChange={(v) => update({ companyPhone: v })} />
            <Field label="Email" value={data.companyEmail} onChange={(v) => update({ companyEmail: v })} />
            <Field label="Website" value={data.companyWeb} onChange={(v) => update({ companyWeb: v })} />
            <div>
              <Label className="text-xs text-muted-foreground">Logo</Label>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleImageUpload("logoUrl")}>
                Upload Logo
              </Button>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="quotation" className="space-y-3">
          <Section title="Reference">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Ref No" value={data.refNo} onChange={(v) => update({ refNo: v })} />
              <Field label="Date" value={data.date} onChange={(v) => update({ date: v })} />
            </div>
            <Field label="Customer Name" value={data.customerName} onChange={(v) => update({ customerName: v })} />
            <Field label="Customer State" value={data.customerState} onChange={(v) => update({ customerState: v })} />
          </Section>

          <Section title="Product Header">
            <Field label="Product Title" value={data.productTitle} onChange={(v) => update({ productTitle: v })} />
            <div>
              <Label className="text-xs text-muted-foreground">Product Image</Label>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleImageUpload("productImageUrl")}>
                Upload Product Image
              </Button>
            </div>
          </Section>

          <Section title="Specifications">
            {data.specifications.map((s, i) => (
              <div key={i} className="flex gap-1 items-center">
                <Input value={s} onChange={(e) => updateSpec(i, e.target.value)} className="h-7 text-xs flex-1" />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeSpec(i)}><Trash2 size={12} /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={addSpec}><Plus size={12} className="mr-1" />Add Spec</Button>
          </Section>

          <Section title="Special Notes">
            {data.specialNotes.map((n, i) => (
              <div key={i} className="flex gap-1 items-center">
                <Input value={n} onChange={(e) => updateNote(i, e.target.value)} className="h-7 text-xs flex-1" />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeNote(i)}><Trash2 size={12} /></Button>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={addNote}><Plus size={12} className="mr-1" />Add Note</Button>
          </Section>

          <Section title="Amount">
            <Field label="Amount in Words" value={data.amountInWords} onChange={(v) => update({ amountInWords: v })} />
            <Field label="GST %" value={String(data.gstPercent)} onChange={(v) => update({ gstPercent: Number(v) || 0 })} />
          </Section>
        </TabsContent>

        <TabsContent value="products" className="space-y-3">
          <Section title="Product Items">
            {data.products.map((p, i) => (
              <div key={i} className="border border-border rounded p-2 space-y-2 bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Item {i + 1}</span>
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => removeProduct(i)}><Trash2 size={12} /></Button>
                </div>
                <Field label="Description" value={p.description} onChange={(v) => updateProduct(i, "description", v)} />
                <div className="grid grid-cols-3 gap-2">
                  <Field label="Rate" value={String(p.ratePerUnit)} onChange={(v) => updateProduct(i, "ratePerUnit", Number(v) || 0)} />
                  <Field label="Qty" value={String(p.qty)} onChange={(v) => updateProduct(i, "qty", Number(v) || 0)} />
                  <div>
                    <Label className="text-xs text-muted-foreground">Amount</Label>
                    <Input value={p.amount.toFixed(2)} disabled className="h-8 text-sm bg-muted" />
                  </div>
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={addProduct}><Plus size={12} className="mr-1" />Add Product</Button>
          </Section>

          <Section title="Extra Add-Ons">
            {data.addOns.map((a, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={a.name} onChange={(e) => updateAddOn(i, "name", e.target.value)} className="h-7 text-xs flex-1" />
                <Input value={a.price} onChange={(e) => updateAddOn(i, "price", e.target.value)} className="h-7 text-xs w-24" />
              </div>
            ))}
          </Section>
        </TabsContent>

        <TabsContent value="page2" className="space-y-3">
          <Section title="Gallery">
            <Field label="Gallery Title" value={data.galleryTitle} onChange={(v) => update({ galleryTitle: v })} />
            {data.galleryImages.map((_, i) => (
              <Button key={i} size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleGalleryImageUpload(i)}>
                Upload Gallery Image {i + 1}
              </Button>
            ))}
          </Section>

          <Section title="Banking Details">
            <Field label="Bank Name" value={data.bankName} onChange={(v) => update({ bankName: v })} />
            <Field label="Pay To" value={data.payTo} onChange={(v) => update({ payTo: v })} />
            <Field label="Account No" value={data.accountNo} onChange={(v) => update({ accountNo: v })} />
            <Field label="IFSC" value={data.ifsc} onChange={(v) => update({ ifsc: v })} />
            <Field label="Branch" value={data.branch} onChange={(v) => update({ branch: v })} />
            <Field label="GST" value={data.gst} onChange={(v) => update({ gst: v })} />
            <Field label="PAN" value={data.pan} onChange={(v) => update({ pan: v })} />
            <Field label="UPI ID" value={data.upiId} onChange={(v) => update({ upiId: v })} />
            <div>
              <Label className="text-xs text-muted-foreground">Bank Logo</Label>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleImageUpload("bankLogo")}>Upload Bank Logo</Button>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">QR Code</Label>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleImageUpload("qrCodeUrl")}>Upload QR Code</Button>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
