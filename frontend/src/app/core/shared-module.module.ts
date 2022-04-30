import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageResolverPipe } from './pipes/image-resolver.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const materialModules = [MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule];

@NgModule({
    declarations: [ImageResolverPipe],
    imports: [CommonModule, ...materialModules],
    exports: [ImageResolverPipe, ...materialModules],
})
export class SharedModule {}
