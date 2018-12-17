export class Font {
  id: number;
  name: string;
  size: any;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }
  getFontName(): string {
    return this.name;
  }
}

export class FontsController {
  public fontsMetaData: Font[] = [];
  constructor() {}

  async fetchFontsData() {
    try {
      if (this.fontsMetaData.length > 0) {
        return this.fontsMetaData;
      }
      const rsp = await fetch("/assets/fonts.json");
      const info = await rsp.json();
      this.fontsMetaData = info.fonts
        .map(font => new Font(font))
        .filter(font => {
          return font.enable == true;
        });
      return this.fontsMetaData;
    } catch (e) {
      return [];
    }
  }
  async getFontsDataById(id: number = 0) {
    if (id <= 0) {
      return null;
    }
    const fontsMetaData = await this.fetchFontsData();
    const fonts = fontsMetaData.map(font => new Font(font)).filter(font => {
      return font.id == id;
    });
    return fonts[0];
  }
}

export const FontsProvider = new FontsController();
