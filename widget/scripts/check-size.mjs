// Hard bundle-size gate. The § 356a widget must compile to ≤ 5 KB (raw file
// size, per the spec's literal wording). We also report the gzip transfer size.
import { statSync, readFileSync } from "fs";
import { gzipSync } from "zlib";

const RAW_MAX = 5120; // 5 KB hard ceiling (raw)
const file = "widget/dist/widget.min.js";

const raw = statSync(file).size;
const gz = gzipSync(readFileSync(file)).length;

console.log(`raw: ${raw} B | gzip: ${gz} B`);

if (raw > RAW_MAX) {
  console.error(`✗ raw ${raw} B > ${RAW_MAX} B`);
  process.exit(1);
}
console.log("✓ size OK");
