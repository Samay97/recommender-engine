import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResolverPipe } from './pipes/image-resolver.pipe';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatIconModule];

@NgModule({
    declarations: [ImageResolverPipe],
    imports: [CommonModule, ...materialModules],
    exports: [ImageResolverPipe, ...materialModules],
})
export class SharedModule {}
