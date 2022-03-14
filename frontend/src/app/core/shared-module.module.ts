import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResolverPipe } from './pipes/image-resolver.pipe';

@NgModule({
    declarations: [ImageResolverPipe],
    imports: [CommonModule],
    exports: [ImageResolverPipe],
})
export class SharedModule {}
