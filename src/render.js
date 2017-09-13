import mainTemplate from './src/templates/main.html!text'
import rp from "request-promise"
import cheerio from 'cheerio'
import prepmaps from './prepmaps.js'

export async function render() {
    var maphtml = await prepmaps();
    var html = mainTemplate;
    return html;
}
