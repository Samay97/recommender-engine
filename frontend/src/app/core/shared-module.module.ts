import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResolverPipe } from './pipes/image-resolver.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [MatIconModule, MatButtonModule];

@NgModule({
    declarations: [ImageResolverPipe],
    imports: [CommonModule, ...materialModules],
    exports: [ImageResolverPipe, ...materialModules],
})
export class SharedModule {}
