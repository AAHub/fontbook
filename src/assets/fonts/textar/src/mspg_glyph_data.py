#!/usr/bin/env fontforge -script

import sys, os
import pickle
import fontforge


MSPG_FONT = "MSPgothic.ttf"
MSPG_BDF = "MSPgothic-bdf.bdf"
MSPG_BDF_16 = "MSPgothic-bdf-16.bdf"
MSPG_SFD = "MSPgothic-bdf-16.sfd" 
OUTPUT_FILE = "mspg_glyph_data.pickle"

# generate a sfd file, derived from a 16px bitmap font.
font = fontforge.open(MSPG_FONT)
font.generate(MSPG_BDF, bitmap_type="bdf")
font = fontforge.open(MSPG_BDF_16)
font.save(MSPG_SFD)

os.chdir(os.path.dirname(sys.argv[0]) or '.')

for path in os.listdir(os.getcwdu()):
    if path.endswith(".bdf"):
        os.remove(os.path.join(os.getcwdu(), path))

# read glyph data
glyph_data = {}
d = {"width": 500,
     "bbox": (0, 0, 0, 0)}
glyph_data[160] = d
f = open(MSPG_SFD, "rb")

for line in f:
    if line.startswith("BDFChar: "):
        values = line.split(" ")
        encoding = int(values[2])
        width = int(values[3]) * 100
        bbox = [int(i) * 100 for i in values[4:8]]
        xmin, xmax, ymin, ymax = bbox
        xmax += 100
        ymax += 100
        d = {"width": width,
             "bbox": (xmin, ymin, xmax, ymax)}
        glyph_data[encoding] = d

f.close()

# pickle it
f = open(OUTPUT_FILE, "wb")
pickle.dump(glyph_data, f)
f.close()
print "Created " + OUTPUT_FILE + "."

