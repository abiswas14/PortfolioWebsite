# Asset sources

All sprite and background assets in this folder are **original, generated for
this site** by the deterministic Python/Pillow script at
`scripts/gen_sprites.py` (run `python3 scripts/gen_sprites.py` from the repo
root to regenerate). No third-party art, asset packs, or game sprites were
used. Palette is locked to the CSS design tokens in `src/index.css`.

| File | Purpose |
| --- | --- |
| `tile-memory.png` | 16×16 seamless memory-board tile (canvas pattern fill) |
| `heap-towers.png` | Horizon skyline of memory-bank towers (tileable strip) |
| `module-cpu.png` | Compiler core — CPU package sprite |
| `module-pay.png` | PAY station — payment router sprite |
| `module-ml.png` | ML station — accelerator card sprite |
| `module-qnt.png` | QNT station — ticker tower sprite (canvas animates screen) |
| `module-sys.png` | SYS station — server rack sprite (canvas animates LEDs) |
| `sprite-packet.png` | 4-frame packet sheet, one frame per channel color |
| `sprite-avatar.png` | 2-frame walking engineer avatar |
| `cartridge-pay.png` / `cartridge-qnt.png` / `cartridge-sys.png` | Project-card cartridge icons |

License: same as the repository (author's own work).
