
export interface IUrlShortenerOptions {
  metaTags: {
    title: string
    imageURL: string
    desc: string
  }
}
export interface IUrlShortener {
  generate(url: string, options?: IUrlShortenerOptions): Promise<string>
}