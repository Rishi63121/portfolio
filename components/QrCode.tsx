import QRCode from "qrcode";

/** Real, scannable QR rendered to inline SVG at build time (dark modules on a cream tile). */
export default async function QrCode({ url, label }: { url: string; label: string }) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#140a0a", light: "#f1e6d3" },
  });

  return (
    <figure className="m-0 w-full max-w-[150px]">
      <div
        role="img"
        aria-label={`QR code that opens ${label}`}
        className="overflow-hidden rounded-md border border-line-strong bg-[#f1e6d3] p-1.5 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.22em] text-faint">{label}</figcaption>
    </figure>
  );
}
