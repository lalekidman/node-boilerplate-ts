import http from 'axios'
import { GOOGLE_FIREBASE_DYNAMIC_LINK_API_KEY } from '../../constants'
// import * as http from 'request'
import {
  IUrlShortenerOptions
} from './interfaces'
export default class ShortURL {
  private DOMAIN : string
  constructor (domain: string) {
    this.DOMAIN = domain
  }
  public generate = (url: string, data: IUrlShortenerOptions) => {
    const {metaTags} =data
    return http({
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${GOOGLE_FIREBASE_DYNAMIC_LINK_API_KEY}`,
      method: 'POST',
      // "Content-Type": 'application/json',
      data: {
        dynamicLinkInfo: Object.assign({
          domainUriPrefix: "https://kyoo.page.link",
          link: this.DOMAIN.concat(url),
          androidInfo: {
            androidPackageName: "com.leisue.kyoo_customer.activity.splash.SplashActivity"
          },
          iosInfo: {
            iosBundleId: "com.leisue.kyoo-customer-app-ios",
            iosIpadBundleId: "com.leisue.kyoo-customer-app-ios"
          }
        }, 
          metaTags ? {
            socialMetaTagInfo: {
              socialTitle: metaTags.title,
              socialDescription: metaTags.desc,
              socialImageLink: metaTags.imageURL
            }
          } : {}
        )
      }
    })
    .then((response: any) => {
      const {shortLink: url, error} = <any> response.data
      return (url)
    })
  }
}