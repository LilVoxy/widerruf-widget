// Hard bundle-size gate. We also report the gzip transfer size.
// Limit raised from 5 KB → 6 KB to accommodate the Art. 13 DSGVO notice
// (privacy + legal-basis text) that must be shown in the widget form.
// The gzip transfer size remains well under 3 KB.
import { statSync, readFileSync } from "fs";
import { gzipSync } from "zlib";

const RAW_MAX = 6144; // 6 KB hard ceiling (raw)
const file = "widget/dist/widget.min.js";

const raw = statSync(file).size;
const gz = gzipSync(readFileSync(file)).length;

console.log(`raw: ${raw} B | gzip: ${gz} B`);

if (raw > RAW_MAX) {
  console.error(`✗ raw ${raw} B > ${RAW_MAX} B`);
  process.exit(1);
}
console.log("✓ size OK");
