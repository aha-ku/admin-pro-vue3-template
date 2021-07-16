import client from 'webpack-theme-color-replacer/client'
import { generate } from '@ant-design/colors/dist/index.esm'

export default {
    primaryColor: '#1890ff',
    getAntdSerials(color, opts = {}) {
        const lightens = new Array(9).fill().map((t, i) => {
            return client.varyColor.lighten(color, i / 10)
        });
        const colorPalettes = generate(color, opts);
        const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
        return lightens.concat(colorPalettes).concat(rgb)
    },
    changeColor(newColor, opts) {
        let lastColor = this.lastColor || this.primaryColor;
        const options = {
            newColors: this.getAntdSerials(newColor, opts),
            cssUrl: '/css/theme-colors.css',
            oldColors: this.getAntdSerials(lastColor, opts)
        }
        const promise = client.changer.changeColor(options)
        this.lastColor = lastColor;
        return promise
    }
}