import { Component } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent {

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log()
  }
}
