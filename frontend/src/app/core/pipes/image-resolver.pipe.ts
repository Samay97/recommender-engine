import { Pipe, PipeTransform } from '@angular/core';

export enum ImageSize {
    XBIG = 'xbig',
    BIG = 'big',
    NORMAL = 'normal',
    SMALL = 'small',
    XSMALL = 'xsmall',
}

@Pipe({
    name: 'imageResolver',
})
export class ImageResolverPipe implements PipeTransform {
    transform(value: string | undefined, imageSize: ImageSize | string = ImageSize.NORMAL): string {
        if (value == undefined) return '';

        let size = 350;

        switch (imageSize) {
            case ImageSize.XBIG:
                size = 640;
                break;
            case ImageSize.BIG:
                size = 340;
                break;
            case ImageSize.SMALL:
                size = 210;
                break;
            case ImageSize.XSMALL:
                size = 180;
                break;
        }

        const regHeight = /(odnHeight=)(\d{3})/;
        const regWidth = /(odnWidth=)(\d{3})/;

        const replacedHeight = value.replace(regHeight, `odnHeight=${size}`);
        return replacedHeight.replace(regWidth, `odnWidth=${size}`);
    }
}
