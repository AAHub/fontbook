#!/usr/bin/env fontforge -script

import pickle

import fontforge
import psMat


IPA_FONT = "ipagp.ttf"
PATCH_FONT = "textar-patch.otf"
MSPG_GLYPH_DATA = "mspg_glyph_data.pickle"
OUTPUT_FILE = "textar.sfd"

def scale(glyph, scalex, scaley):
    glyph.transform(psMat.scale(scalex, scaley))

def move(glyph, x, y):
    glyph.transform(psMat.translate(x, y))

def copy_from_patch_font(font, patch_font, encodings):    
    font.selection.none()
    patch_font.selection.none()
    
    for encoding in encodings:
        font.selection.select(("more", None), encoding)
        patch_font.selection.select(("more", None), encoding)
        
    patch_font.copy()
    font.paste()
    font.selection.none()
    patch_font.selection.none()

def fix_bbox(width, bbox, ascent, descent):
    xmin, ymin, xmax, ymax = bbox
    ascent_scale = 1408.0 / 1400
    descent_scale = 192.0 / 200
        
    if xmax - xmin == 100:
        if width - xmax > xmin:
            xmax += 40
        else:
            xmin -= 40
            
    if ymax - ymin == 100:
        if 1400 - ymax > ymin + 200:
            ymax += 40
        else:
            ymin -= 40
            
    if ymin > 0:
        ymin *= ascent_scale
    else:
        ymin *= descent_scale
        
    if ymax > 0:
        ymax *= ascent_scale
    else:
        ymax *= descent_scale

    return (xmin, ymin, xmax, ymax)

glyphs_ignore_scalex = {
    int(0x49): "center", # I
    int(0x4a): "right", # J
    int(0x66): "left", # f
    int(0x72): "left", # r
    int(0x399): "center", # greek capital letter iota
    int(0x2160): "center", # roman numberal one
    int(0x2161): "center", # roman numberal two
    int(0xff29): "center", # fullwidth latin capital letter I
}

f = open(MSPG_GLYPH_DATA, "rb")
mspg_glyph_data = pickle.load(f)
f.close()
font = fontforge.open(IPA_FONT)
font.em = 1600
font.selection.all()
font.selection.select(("more", None), 32)

for glyph in font.selection.byGlyphs:
    d = mspg_glyph_data.get(glyph.encoding)
    
    if d and glyph.isWorthOutputting():
        mspg_width = d["width"]
        mspg_bbox = fix_bbox(mspg_width, d["bbox"], font.ascent, font.descent)
        mspg_lbearing = mspg_bbox[0]
        width = glyph.width
        bbox = glyph.boundingBox()
        mspg_boxw = mspg_bbox[2] - mspg_bbox[0]
        mspg_boxh = mspg_bbox[3] - mspg_bbox[1]
        boxw = bbox[2] - bbox[0]
        boxh = bbox[3] - bbox[1]
        
        if boxw:
            scalex = mspg_boxw / boxw
        else:
            scalex = 1

        if boxh:
            scaley = mspg_boxh / boxh
        else:
            scaley = 1
        
        bearing_type = glyphs_ignore_scalex.get(glyph.encoding)
        
        if bearing_type:
            scale(glyph, 1, scaley)
            
            if bearing_type == "right":
                mspg_lbearing += mspg_boxw - boxw
            elif bearing_type == "center":
                mspg_lbearing += (mspg_boxw - boxw) / 2                
            
        else:
            scale(glyph, scalex, scaley)
        
        move(glyph, 0, mspg_bbox[1] - glyph.boundingBox()[1])
        glyph.left_side_bearing = mspg_lbearing
        glyph.width = mspg_width
            
patch_font = fontforge.open(PATCH_FONT)
encodings = [
    int(0x22), int(0x27), int(0x2002), int(0x2003), int(0x2009),
    int(0x2016), int(0x2211), int(0x2212), int(0x30FC), int(0xff70), int(65536),
]
copy_from_patch_font(font, patch_font, encodings)
font.save(OUTPUT_FILE)
print "Saved a SFD file. Run the 'gen2.pe' script."
